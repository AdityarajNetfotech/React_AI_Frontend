import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertCircle, CheckCircle, Code, Play, Loader, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
import { submitTest } from '../../../api';
import axios from 'axios';
import InstructionsPage from '../../../Components/Instructions_page/InstructionsPage';
import ActivityMonitor from '../../../Components/Instructions_page/ActivityMonitor';
import FaceDetection from '../../../Components/Instructions_page/FaceDetection';
import UserEmail from '../../../Components/Instructions_page/UserEmail';
import { emitViolation } from '../../../utils/socket';

// Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JUDGE0_API_KEY = import.meta.env.VITE_JUDGE0_API_KEY;
const JUDGE0_HOST = 'judge0-ce.p.rapidapi.com';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Programming language list (unchanged)
const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript (Node.js)', defaultCode: 'console.log("Hello, World!");', judgeId: 63 },
  { value: 'python', label: 'Python 3', defaultCode: 'print("Hello, World!")', judgeId: 71 },
  { value: 'java', label: 'Java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}', judgeId: 62 },
  { value: 'cpp', label: 'C++', defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}', judgeId: 54 },
  { value: 'c', label: 'C', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}', judgeId: 50 },
  { value: 'csharp', label: 'C#', defaultCode: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}', judgeId: 51 },
  { value: 'php', label: 'PHP', defaultCode: '<?php\necho "Hello, World!\\n";\n?>', judgeId: 68 },
  { value: 'ruby', label: 'Ruby', defaultCode: 'puts "Hello, World!"', judgeId: 72 },
  { value: 'go', label: 'Go', defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}', judgeId: 60 },
  { value: 'html', label: 'HTML', defaultCode: '<!-- HTML cannot be executed -->\n<h1>Hello, World!</h1>' },
  { value: 'css', label: 'CSS', defaultCode: '/* CSS cannot be executed */\nbody { color: blue; }' },
  { value: 'sql', label: 'SQL', defaultCode: '-- SQL execution requires database setup\nSELECT "Hello, World!" as message;', judgeId: 82 }
];

const GiveTest = ({ testQuestions, testDuration, questionSetId, jdId, onNavigate }) => {
  const [answers, setAnswers] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [outputs, setOutputs] = useState({});
  const [runningCode, setRunningCode] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [step, setStep] = useState('entry');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', id: '' });
  const faceEventRef = useRef(null);
  // Instead of showing all questions at once, we now show only one question at a time
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Keep only needed violations
  const [violations, setViolations] = useState({
    tab_switches: 0,
    inactivities: 0,
    face_not_visible: 0,
  });
  const violationsRef = useRef(violations);

  useEffect(() => {
    console.log('GiveTest violations state updated:', violations);
  }, [violations]);

  useEffect(() => {
    violationsRef.current = violations;
  }, [violations]);

  const questions = testQuestions || [];
  const error = null;

  const requestMedia = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaAllowed(true);
    } catch (err) {
      console.error('Media permissions denied:', err);
      setMediaAllowed(false);
      alert('Please allow camera and microphone access to continue the test.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Block PrintScreen, Ctrl+Shift+S (Snipping), Ctrl+P (Print)
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") ||
        (e.ctrlKey && e.key.toLowerCase() === "p")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); // Disable right-click
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Initialize timer when exam starts
  useEffect(() => {
    if (!testStarted) return;
    const duration = testDuration || 20;
    const timeInSeconds = duration * 60;
    setTimeLeft(timeInSeconds);
  }, [testDuration, testStarted]);

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleLanguageChange = (questionIndex, language) => {
    setSelectedLanguages(prev => ({ ...prev, [questionIndex]: language }));
    const selectedLang = PROGRAMMING_LANGUAGES.find(lang => lang.value === language);
    if (selectedLang) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: selectedLang.defaultCode
      }));
      setOutputs(prev => ({ ...prev, [questionIndex]: '' }));
    }
  };

  const handleRunCode = async (index) => {
    const langValue = selectedLanguages[index] || 'javascript';
    const sourceCode = answers[index] || '';
    const lang = PROGRAMMING_LANGUAGES.find(l => l.value === langValue);

    if (!lang || !lang.judgeId) {
      setOutputs(prev => ({
        ...prev,
        [index]: `⚠️ Code execution not supported for ${lang?.label || langValue}`
      }));
      return;
    }

    if (!sourceCode.trim()) {
      setOutputs(prev => ({ ...prev, [index]: '⚠️ Please write some code first' }));
      return;
    }

    setRunningCode(prev => ({ ...prev, [index]: true }));
    setOutputs(prev => ({ ...prev, [index]: '🔄 Running code...' }));

    try {
      const submissionResponse = await axios.post(
        `https://${JUDGE0_HOST}/submissions`,
        {
          language_id: lang.judgeId,
          source_code: btoa(sourceCode),
          stdin: btoa('')
        },
        {
          params: {
            base64_encoded: 'true',
            fields: 'token,status,stdout,stderr,compile_output,message,time,memory'
          },
          headers: {
            'X-RapidAPI-Key': JUDGE0_API_KEY,
            'X-RapidAPI-Host': JUDGE0_HOST,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      const { token } = submissionResponse.data;
      if (!token) throw new Error('No submission token received');

      let attempts = 0;
      const maxAttempts = 20;

      const pollResult = async () => {
        try {
          const resultResponse = await axios.get(
            `https://${JUDGE0_HOST}/submissions/${token}`,
            {
              params: {
                base64_encoded: 'true',
                fields: 'status,stdout,stderr,compile_output,message,time,memory'
              },
              headers: {
                'X-RapidAPI-Key': JUDGE0_API_KEY,
                'X-RapidAPI-Host': JUDGE0_HOST
              },
              timeout: 5000
            }
          );

          const data = resultResponse.data;
          const status = data.status?.id;

          if (status === 1 || status === 2) {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(pollResult, 500);
              return;
            } else {
              throw new Error('Code execution timeout - taking too long to complete');
            }
          }

          let output = '';
          let hasError = false;

          if (data.compile_output) {
            output += `📋 Compilation Output:\n${atob(data.compile_output)}\n\n`;
            hasError = true;
          }

          if (data.stderr) {
            output += `❌ Error:\n${atob(data.stderr)}\n\n`;
            hasError = true;
          }

          if (data.stdout) {
            output += `✅ Output:\n${atob(data.stdout)}`;
          } else if (!hasError) {
            output = '✅ Code executed successfully (no output)';
          }

          if (data.message) {
            output += `\n\n📝 Message: ${atob(data.message)}`;
          }

          if (data.time) {
            output += `\n⏱️ Execution time: ${data.time}s`;
          }

          if (data.memory) {
            output += `\n💾 Memory used: ${data.memory} KB`;
          }

          setOutputs(prev => ({ ...prev, [index]: output || '(No output)' }));
        } catch (pollError) {
          console.error('❌ Polling error:', pollError);
          throw pollError;
        }
      };

      await pollResult();
    } catch (err) {
      console.error('❌ Code execution error:', err);
      let errorMessage = '❌ Failed to execute code: ';
      if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timeout - please try again';
      } else if (err.response?.status === 429) {
        errorMessage += 'Rate limit exceeded - please wait and try again';
      } else if (err.response?.status === 401) {
        errorMessage += 'API authentication failed';
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else {
        errorMessage += err.message || 'Unknown error occurred';
      }

      setOutputs(prev => ({ ...prev, [index]: errorMessage }));
    } finally {
      setRunningCode(prev => ({ ...prev, [index]: false }));
    }
  };

  // These functions handle moving between questions one by one
  
  // Function to go to the next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to go to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to jump directly to any question (used by navigation pills)
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Check if current question is answered (for visual feedback)
  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestionIndex];
    return answer && answer.toString().trim() !== '';
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const score = testQuestions.reduce((total, question, index) => {
        if (question.options && question.options.length > 0) {
          return total + (answers[index] === question.answer ? 10 : 0);
        }
        return total + (answers[index] && answers[index].trim() ? 5 : 0);
      }, 0);

      // Only sending the kept violations
      const cleanViolations = {
        tab_switches: Number(violationsRef.current.tab_switches || 0),
        inactivities: Number(violationsRef.current.inactivities || 0),
        face_not_visible: Number(violationsRef.current.face_not_visible || 0),
      };

      const data = {
        exam_id: jdId,
        candidate_id: userInfo.id,
        candidate_name: userInfo.name,
        candidate_email: userInfo.email,
        question_set_id: questionSetId,
        score,
        questions: testQuestions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.answer
        })),
        answers: testQuestions.map((_, idx) => answers[idx] || ''),
        languages: testQuestions.map((_, idx) => selectedLanguages[idx] || 'javascript'),
        duration_used: (testDuration * 60) - timeLeft,

        // ✅ violations
        tab_switches: cleanViolations.tab_switches,
        inactivities: cleanViolations.inactivities,
        face_not_visible: cleanViolations.face_not_visible,
      };

      console.log('Sending final submission:', data);
      const result = await submitTest(data);

      console.log('API RESPONSE:', result);
      setResult(result?.saved||result);
      setSubmitted(true);
    } catch (err) {
      console.error('SUBMISSION ERROR:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (submitted || !testStarted || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  // Initialize languages and answers for coding questions
  useEffect(() => {
    const initialLanguages = {};
    const initialAnswers = {};
    questions.forEach((q, i) => {
      if (!q.options || q.options.length === 0) {
        initialLanguages[i] = 'javascript';
        if (!answers[i]) {
          initialAnswers[i] = PROGRAMMING_LANGUAGES[0].defaultCode;
        }
      }
    });
    setSelectedLanguages(prev => ({ ...prev, ...initialLanguages }));
    setAnswers(prev => ({ ...prev, ...initialAnswers }));
  }, [questions]);

  if (step === 'entry') {
    return (
      <UserEmail
        jdId={jdId}
        onContinue={(info) => {
          setUserInfo(info);
          setStep('instructions');
          requestMedia();
        }}
      />
    );
  }

  if (step === 'instructions') {
    if (instructionsVisible || !mediaAllowed) {
      return (
        <InstructionsPage
          onComplete={() => {
            setInstructionsVisible(false);
            setTestStarted(true);
            setStep('test');
          }}
          mediaAllowed={mediaAllowed}
        />
      );
    }
  }

  if (step === 'test' && (!testStarted || timeLeft === null)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    const totalDuration = testDuration || 20;
    const timeUsed = totalDuration - Math.floor(timeLeft / 60);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h1>
            <p className="text-gray-600 mb-4">Thank you for taking the test</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-lg font-bold text-blue-600 mb-2">Your Score</p>
                <p className="text-3xl font-bold text-gray-900">{result.score}/{result.max_score || (questions.length * 10)}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-lg font-bold text-purple-600 mb-2">Time Used</p>
                <p className="text-3xl font-bold text-gray-900">{timeUsed} min</p>
                <p className="text-sm text-gray-500">out of {totalDuration} minutes</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">Status: {result.status}</p>
            <button
              onClick={() => onNavigate('generate')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Timer color
  const getTimerColor = () => {
    const totalTime = (testDuration || 20) * 60;
    const percentLeft = (timeLeft / totalTime) * 100;
    if (percentLeft > 50) return 'text-green-600';
    if (percentLeft > 25) return 'text-yellow-600';
    if (percentLeft > 10) return 'text-orange-600';
    return 'text-red-600';
  };

  // Instead of showing all questions, we only show the current question
  const currentQuestion = questions[currentQuestionIndex];  // Get the current question to display
  const isLastQuestion = currentQuestionIndex === questions.length - 1;  // Check if this is the last question
  const isFirstQuestion = currentQuestionIndex === 0;  // Check if this is the first question

  return (
    <>
      {/* Hidden monitoring */}

      {/* Toast container */}
      <ToastContainer  position="top-center"  autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Activity Monitoring */}
      <ActivityMonitor
        examId={jdId}
        candidateName={userInfo.name}
        email={userInfo.email}
        faceEventRef={faceEventRef}
        testStarted={testStarted}
        submitted={submitted} // pass this to stop counting
        onViolation={(key, count = 1, flush = false) => {
          if (!['tab_switches', 'inactivities', 'face_not_visible'].includes(key)) return;
          if (submitted) return; // Prevent further updates after submission

          setViolations(prev => {
            const updated = flush
              ? { ...prev, [key]: count }             // overwrite on flush
              : { ...prev, [key]: (prev[key] || 0) + count }; // increment

            if (!submitted) {
              if (key === 'tab_switches') toast.warning('⚠️ Tab switch detected!');
              if (key === 'inactivities') toast.info('⌛ You have been inactive.');
              if (key === 'face_not_visible') toast.error('🚨 Face not visible!');
            }

            try {
              emitViolation({
                exam_id: jdId,
                candidate_email: userInfo.email,
                candidate_name: userInfo.name,
                question_set_id: questionSetId,
                [key]: flush ? Number(count) : 1
              });
            } catch (e) {
              console.warn('emitViolation failed', e);
            }

            return updated;
          });
        }}
      />

      {!submitted && <FaceDetection faceEventRef={faceEventRef} />}

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Test in Progress</h1>
              <p className="text-sm text-gray-600">
                Duration: {testDuration || 20} minutes | Questions: {questions.length}
              </p>
            </div>
            <div className={`flex items-center ${getTimerColor()}`}>
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* This section shows the progress through all questions and navigation pills */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>

            {/* Progress bar showing completion percentage */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            {/* Question Navigation Pills - click any number to jump to that question */}
            <div className="flex flex-wrap gap-2 mt-4">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}  // Jump to specific question
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'  // Current question - blue
                      : answers[index] && answers[index].toString().trim()
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'  // Answered - green
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'  // Not answered - gray
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Time warnings */}
          {timeLeft <= 300 && timeLeft > 60 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="text-yellow-700">
                Warning: Only {Math.floor(timeLeft / 60)} minutes remaining!
              </span>
            </div>
          )}

          {timeLeft <= 60 && timeLeft > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-red-700">Critical: Less than 1 minute remaining!</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* ================================================ */}
          {/* MODIFIED: Current Question Display - LINES 603-665 */}
          {/* ================================================ */}
          {/* Instead of mapping through all questions, we now only show the current question */}
          {currentQuestion && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Question {currentQuestionIndex + 1}: {currentQuestion.question}
              </h2>
  
              {currentQuestion.options && currentQuestion.options.length > 0 ? (
                <div className="space-y-4">
                  {currentQuestion.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <div className="mb-4 flex items-center space-x-3">
                    <Code className="w-5 h-5 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700">
                      Choose Programming Language:
                    </label>
                    <select
                      value={selectedLanguages[currentQuestionIndex] || 'javascript'}
                      onChange={(e) => handleLanguageChange(currentQuestionIndex, e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {PROGRAMMING_LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <MonacoEditor
                      height="400px"  /* Increased height from 300px for better coding experience */
                      language={selectedLanguages[currentQuestionIndex] || 'javascript'}
                      value={answers[currentQuestionIndex] || ''}
                      onChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
                      theme="vs-dark"
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: 'on',
                      }}
                    />
                  </div>
  
                  <div className="mt-4">
                    <button
                      onClick={() => handleRunCode(currentQuestionIndex)}
                      disabled={runningCode[currentQuestionIndex]}
                      className="flex items-center text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {runningCode[currentQuestionIndex] ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {runningCode[currentQuestionIndex] ? 'Running...' : 'Run Code'}
                    </button>
                
                    {outputs[currentQuestionIndex] && (
                      <div className="mt-3 p-3 bg-gray-900 text-green-400 rounded text-sm font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {outputs[currentQuestionIndex]}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
  
          {/* ================================================ */}
          {/* NEW: Navigation and Submit Buttons - LINES 700-740 */}
          {/* ================================================ */}
          {/* This section replaces the old single submit button with navigation controls */}
          <div className="flex justify-between items-center">
            {/* Previous Button - disabled on first question */}
            <button
              onClick={goToPreviousQuestion}
              disabled={isFirstQuestion}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-4">
              {!isLastQuestion ? (
                /* Next Button - shows on all questions except the last one */
                <button
                  onClick={goToNextQuestion}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                /* Submit Button - only shows on the last question */
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="!bg-green-600 hover:!bg-green-700 disabled:!bg-gray-400 !text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Test'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ===================================== */}
          {/* NEW: Early Submit Option - LINES 741-760 */}
          {/* ===================================== */}
          {/* Allow candidates to submit test early from any question */}
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="!bg-red-600 hover:!bg-red-700 disabled:!bg-gray-400 !text-white font-medium py-2 px-6 rounded-lg transition-colors text-sm"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Submitting...
                </>
              ) : (
                'Submit Test Early'
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2">You can submit the test anytime</p>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default GiveTest;
