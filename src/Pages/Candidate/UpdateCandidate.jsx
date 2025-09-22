import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {       
  const location = useLocation();
  const candidateEmail = location.state?.email || "";
  
  const [candidateId, setCandidateId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  const API_BASE = "http://localhost:8000"; 

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add message to chat window
  const addMessage = (text, sender = "bot") => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  // Browser TTS fallback
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // normal speed
    window.speechSynthesis.speak(utterance);
  };

  // ------------------- API FUNCTIONS -------------------

  const startInterview = async () => {
    setIsInterviewStarted(true);
    addMessage("Welcome! Let's start your interview.", "bot");

    try {
      const res = await fetch(`${API_BASE}/start_interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: candidateEmail }),
      });

      if (!res.ok) throw new Error("Failed to start interview");

      const data = await res.json();
      setCandidateId(data.candidate_id);
      await loadQuestion(data.candidate_id);
    } catch (err) {
      console.error(err);
      addMessage("Could not start interview.", "bot");
      setIsInterviewStarted(false);
    }
  };

  const loadQuestion = async (cid = candidateId) => {
    try {
      const res = await fetch(`${API_BASE}/question/${cid}`);
      if (!res.ok) throw new Error("Failed to fetch question");

      const data = await res.json();

      if (data.done) {
        addMessage("Interview finished. Thank you!", "bot");
        speak("Interview finished. Thank you!");
        setIsFinished(true);
        return;
      }

      setCurrentQuestionIndex(data.question_index);
      addMessage(data.question, "bot");

      // Prefer Supabase audio, fallback to TTS
      if (data.audio_url) {
        const audio = new Audio(data.audio_url);
        audio.play().catch(() => speak(data.question));
      } else {
        speak(data.question);
      }
    } catch (err) {
      console.error(err);
      addMessage("Could not load the question.", "bot");
    }
  };

  const handleRecord = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const fd = new FormData();
        fd.append("file", blob, "answer.webm");

        try {
          const res = await fetch(`${API_BASE}/submit_answer/${candidateId}/${currentQuestionIndex}`, {
            method: "POST",
            body: fd,
          });
          const data = await res.json();

          if (data.status === "ok") {
            addMessage(data.answer_text, "user");
            await loadQuestion();
          } else {
            addMessage("Could not understand your answer. Please try again.", "bot");
          }
        } catch (err) {
          console.error(err);
          addMessage("Failed to send your answer.", "bot");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto stop after 12s
      setTimeout(() => {
        if (isRecording) {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 12000);

      mediaRecorderRef.current = mediaRecorder;
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    console.log("📤 Candidate clicked Submit. Navigating to dashboard...");
    navigate("/Candidate-Dashboard");
  };

  // ------------------- UI -------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-4 bg-blue-600 text-white text-xl font-bold rounded-t-xl">
          Voice Interview Bot
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-blue-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl break-words ${
                  msg.sender === "bot"
                    ? "bg-blue-200 text-blue-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="p-4 flex flex-col gap-2 items-center border-t border-blue-200">
          {!isInterviewStarted && !isFinished && (
            <button
              onClick={startInterview}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Start Interview
            </button>
          )}

          {isInterviewStarted && !isFinished && (
            <button
              onClick={handleRecord}
              className={`px-6 py-2 rounded-lg shadow-md text-white ${
                isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
              } transition`}
            >
              {isRecording ? "⏹ Stop Recording" : "🎤 Answer Question"}
            </button>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
