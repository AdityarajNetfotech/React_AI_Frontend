// ActivityMonitor.jsx - Debug Version
import { useEffect, useRef, useCallback } from "react";
import socket from "../../utils/socket";

const ActivityMonitor = ({ examId, candidateName, email, faceEventRef, onViolation }) => {
  const idleTimeout = useRef(null);
  const countsRef = useRef({
    tab_switches: 0,
    inactivities: 0,
    text_selections: 0,
    copies: 0,
    pastes: 0,
    right_clicks: 0,
    face_not_visible: 0,
  });
  const flushTimer = useRef(null);

  const flush = useCallback(() => {
    const payloadCounts = Object.fromEntries(
      Object.entries(countsRef.current).filter(([, v]) => v > 0)
    );
    if (Object.keys(payloadCounts).length > 0) {
      console.log("🔄 Flushing violations to WebSocket:", payloadCounts);
      
      socket.emit("suspicious_event", {
        question_set_id: examId,
        candidate_name: candidateName,
        candidate_email: email,
        ...payloadCounts,
        timestamp: new Date().toISOString(),
      });

      // Reset counts after sending
      for (const k of Object.keys(countsRef.current)) countsRef.current[k] = 0;
      console.log("✅ Counts reset after flush");
    }
    flushTimer.current = null;
  }, [examId, candidateName, email]);

  const bump = useCallback((key) => {
    console.log(`🚨 ActivityMonitor: ${key} violation detected`);
    
    // Increment internal counter for WebSocket batching
    countsRef.current[key] = (countsRef.current[key] || 0) + 1;
    console.log(`📊 Internal counts after bump:`, countsRef.current);
    
    // Immediately notify parent component
    if (onViolation) {
      console.log(`📢 Calling onViolation: ${key} = 1`);
      onViolation(key, 1);
    }
    
    // Start flush timer if not already running
    if (!flushTimer.current) {
      console.log("⏰ Starting flush timer (2000ms)");
      flushTimer.current = setTimeout(flush, 2000);
    }
  }, [flush, onViolation]);

  useEffect(() => {
    console.log("🔧 ActivityMonitor: Setting up event listeners");
    
    const onVisibility = () => {
      console.log("👁️ Visibility change - document.hidden:", document.hidden);
      if (document.hidden) bump("tab_switches");
    };

    const resetInactivity = () => {
      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        console.log("💤 Inactivity timeout reached (60s)");
        bump("inactivities");
      }, 60000);
    };

    const onSelectStart = (e) => {
      console.log("📝 Text selection detected");
      e.preventDefault();
      bump("text_selections");
    };

    const onCtx = (e) => {
      console.log("🖱️ Right click detected");
      e.preventDefault();
      bump("right_clicks");
    };

    const onCopy = () => {
      console.log("📋 Copy detected");
      bump("copies");
    };
    
    const onPaste = () => {
      console.log("📋 Paste detected");
      bump("pastes");
    };

    // Add event listeners
    window.addEventListener("mousemove", resetInactivity);
    window.addEventListener("keydown", resetInactivity);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    
    resetInactivity(); // Start inactivity timer
    console.log("✅ All event listeners added");

    return () => {
      console.log("🧹 ActivityMonitor: Cleaning up event listeners");
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("keydown", resetInactivity);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      clearTimeout(idleTimeout.current);
      if (flushTimer.current) clearTimeout(flushTimer.current);
    };
  }, [bump]);

  // Expose bump for face detection
  useEffect(() => {
    if (faceEventRef) {
      console.log("📷 Setting up face detection callback");
      faceEventRef.current = () => {
        console.log("👤 Face not visible detected");
        bump("face_not_visible");
      };
    }
  }, [faceEventRef, bump]);

  return null;
};

export default ActivityMonitor;
