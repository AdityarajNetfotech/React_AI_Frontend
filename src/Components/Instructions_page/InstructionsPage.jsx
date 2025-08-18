// --- IMPROVED COMPONENT: InstructionsPage ---
// import { useState } from "react";
 
// const InstructionsPage = ({ onComplete }) => {
//   const [agreements, setAgreements] = useState({
//     readInstructions: false,
//     noCheating: false,
//     noAI: false,
//     voiceAssistant: true, // ✅ voice assistant checkbox (default checked)
//   });
 
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [timerRunning, setTimerRunning] = useState(false);
//   const [timerFinished, setTimerFinished] = useState(false);
//   const [canReadAgain, setCanReadAgain] = useState(false); // ✅ new state
 
//   const handleCheckbox = (e) => {
//     const { name, checked } = e.target;
//     setAgreements((prev) => ({ ...prev, [name]: checked }));
//   };
 
//   const allAgreed =
//     agreements.noCheating && agreements.noAI && agreements.readInstructions;
 
//   const startCountdown = (seconds) => {
//     setTimeLeft(seconds);
//     setTimerRunning(true);
 
//     const countdown = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdown);
//           setTimerFinished(true); // ✅ mark timer finished
//           setTimerRunning(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };
 
//   const readInstructions = () => {
//     const message = `
//       Exam Instructions.
//       Keep your camera on throughout the exam.
//       Ensure your face is clearly visible under proper lighting.
//       Do NOT switch tabs, minimize the window, or open other applications.
//       Do NOT copy or attempt to extract any exam content.
//       Stay active; prolonged inactivity may trigger warnings.
//       Maintain a stable internet connection for the entire duration.
//       Violations of these rules may lead to disqualification.
//     `;
 
//     const utterance = new SpeechSynthesisUtterance(message);
 
//     const setVoiceAndSpeak = () => {
//       const voices = speechSynthesis.getVoices();
//       const voice =
// voices.find((v) => v.name === "Microsoft Rachael - English (USA)") ||
//         voices.find(
//           (v) =>
//             v.lang.toLowerCase() === "en-us" &&
// v.name.toLowerCase().includes("female")
//         ) ||
//         voices[0];
 
//       if (voice) utterance.voice = voice;
 
//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => {
//         setIsSpeaking(false);
//         setCanReadAgain(true); // ✅ allow re-reading
//         if (!timerRunning && !timerFinished) {
//           startCountdown(30); // start only first time
//         }
//       };
 
//       speechSynthesis.speak(utterance);
//     };
 
//     if (speechSynthesis.getVoices().length > 0) {
//       setVoiceAndSpeak();
//     } else {
//       speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
//     }
//   };
 
//   const handleStartExam = () => {
//     if (!allAgreed || isSpeaking || !timerFinished) return;
//     onComplete?.(); // ✅ switch to exam page
//   };
 
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };
 
//   return (
//     <div className="min-h-screen p-6 bg-gray-100 text-gray-900 flex items-center justify-center">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
//         <h2 className="text-2xl font-bold text-center text-green-600">
//           📘 Exam Instructions
//         </h2>
 
//         <ul className="list-disc pl-5 space-y-2 text-gray-700">
//           <li>Keep your camera ON throughout the exam.</li>
//           <li>Ensure your face is clearly visible under proper lighting.</li>
//           <li>Do NOT switch tabs, minimize the window, or open other applications.</li>
//           <li>Do NOT copy or attempt to extract any exam content.</li>
//           <li>Stay active; prolonged inactivity may trigger warnings.</li>
//           <li>Maintain a stable internet connection for the entire duration.</li>
//         </ul>
 
//         <p className="text-red-600 font-semibold">
//           ⚠️ Violations of these rules may lead to disqualification.
//         </p>
 
//         {/* ✅ Agreement checkboxes */}
//         <div className="space-y-3 mt-4">
//           {["noCheating", "noAI", "readInstructions", "voiceAssistant"].map(
//             (item) => (
//               <label key={item} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name={item}
//                   checked={agreements[item]}
//                   onChange={handleCheckbox}
//                   className="accent-blue-600 w-5 h-5"
//                 />
//                 <span>
//                   {item === "noCheating" &&
//                     "I agree not to engage in any unfair practices during the exam."}
//                   {item === "noAI" &&
//                     "I agree not to use any AI-based tools or external assistance."}
//                   {item === "readInstructions" &&
//                     "I have read and understood the instructions."}
//                   {item === "voiceAssistant" &&
//                     "Enable voice assistant to read instructions aloud."}
//                 </span>
//               </label>
//             )
//           )}
//         </div>
 
//         {/* ✅ Buttons */}
//         <div className="text-center mt-6 space-x-4">
//           {agreements.voiceAssistant && (
//             <button
//               onClick={readInstructions}
//               disabled={isSpeaking}
//               className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
//                 isSpeaking ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
//               }`}
//             >
//               {isSpeaking ? "🔊 Reading..." : "Read Instructions"}
//             </button>
//           )}
 
//           {canReadAgain && agreements.voiceAssistant && (
//             <button
//               onClick={readInstructions}
//               disabled={isSpeaking}
//               className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
//                 isSpeaking ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               🔁 Read Again
//             </button>
//           )}
//         </div>
 
//         {/* ✅ Countdown */}
//         {timerRunning && (
//           <p className="text-center text-lg font-medium mt-4 text-gray-700">
//             Exam will begin in: <b>{formatTime(timeLeft)}</b>
//           </p>
//         )}
 
//         {/* ✅ Timer finished message */}
//         {timerFinished && (
//           <p className="text-center text-green-600 font-semibold mt-4">
//             ✅ Your exam has already started. Click Start Exam to continue.
//           </p>
//         )}
 
//         {/* ✅ Start Exam button */}
//         <div className="text-center mt-6">
//           <button
//             onClick={handleStartExam}
//             disabled={!allAgreed || isSpeaking || !timerFinished}
//             className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
//               !allAgreed || isSpeaking || !timerFinished
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             Start Exam
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default InstructionsPage;






import { useState } from "react";
 
const InstructionsPage = ({ onComplete }) => {
  const [agreements, setAgreements] = useState({
    readInstructions: false,
    noCheating: false,
    noAI: false,
  });
 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
 
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };
 
  const allAgreed = Object.values(agreements).every(Boolean);
 
  const startCountdown = (seconds) => {
    setTimeLeft(seconds);
    setTimerRunning(true);
 
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          onComplete?.(); // ✅ switch to exam page
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
 
  const handleStartExam = () => {
    if (!allAgreed || isSpeaking) return;
 
    const message = `
      Exam Instructions.
      Keep your camera on throughout the exam.
      Ensure your face is clearly visible under proper lighting.
      Do NOT switch tabs, minimize the window, or open other applications.
      Do NOT copy or attempt to extract any exam content.
      Stay active; prolonged inactivity may trigger warnings.
      Maintain a stable internet connection for the entire duration.
      Violations of these rules may lead to disqualification.
    `;
 
    const utterance = new SpeechSynthesisUtterance(message);
 
    const setVoiceAndSpeak = () => {
      const voices = speechSynthesis.getVoices();
      const voice =
voices.find((v) => v.name === "Microsoft Rachael - English (USA)") ||
        voices.find(
          (v) =>
            v.lang.toLowerCase() === "en-us" &&
v.name.toLowerCase().includes("female")
        ) ||
        voices[0];
 
      if (voice) utterance.voice = voice;
 
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        startCountdown(30); // ⏳ 30s countdown after reading
      };
 
      speechSynthesis.speak(utterance);
    };
 
    if (speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    }
  };
 
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
 
  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-600">
          📘 Exam Instructions
        </h2>
 
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Keep your camera ON throughout the exam.</li>
          <li>Ensure your face is clearly visible under proper lighting.</li>
          <li>
            Do NOT switch tabs, minimize the window, or open other applications.
          </li>
          <li>Do NOT copy or attempt to extract any exam content.</li>
          <li>Stay active; prolonged inactivity may trigger warnings.</li>
          <li>Maintain a stable internet connection for the entire duration.</li>
        </ul>
 
        <p className="text-red-600 font-semibold">
          ⚠️ Violations of these rules may lead to disqualification.
        </p>
 
        <div className="space-y-3 mt-4">
          {["noCheating", "noAI", "readInstructions"].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={item}
                checked={agreements[item]}
                onChange={handleCheckbox}
                className="accent-blue-600 w-5 h-5"
              />
              <span>
                {item === "noCheating" &&
                  "I agree not to engage in any unfair practices during the exam."}
                {item === "noAI" &&
                  "I agree not to use any AI-based tools or external assistance."}
                {item === "readInstructions" &&
                  "I have read and understood the instructions."}
              </span>
            </label>
          ))}
        </div>
 
        <div className="text-center mt-6">
          <button
            onClick={handleStartExam}
            disabled={!allAgreed || isSpeaking}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
              !allAgreed || isSpeaking
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSpeaking ? "🔊 Reading Instructions..." : "Start Exam"}
          </button>
        </div>
 
        {timerRunning && (
          <p className="text-center text-lg font-medium mt-4 text-gray-700">
            Exam will begin in: <b>{formatTime(timeLeft)}</b>
          </p>
        )}
      </div>
    </div>
  );
};
 
export default InstructionsPage;