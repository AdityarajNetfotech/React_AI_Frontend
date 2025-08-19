import { io } from "socket.io-client";

// ✅ Connect to the Flask Socket.IO server on port 5001
const socket = io("https://cheating-7.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"], // optional but recommended for performance
});

socket.on("connect", () => {
  console.log("✅ Connected to backend with socket ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;
