import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";
import { useEffect, useRef } from "react";

const FaceDetection = ({ faceEventRef }) => {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let videoEl = null; // local variable to hold reference

    const loadModelAndStart = async () => {
      try {
        modelRef.current = await blazeface.load();
        await setupCamera();
        startDetectionLoop();
      } catch (err) {
        console.error("Error loading BlazeFace:", err);
      }
    };

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // no need for mic
      });
      if (videoRef.current) {
        videoEl = videoRef.current; // capture ref into local var
        videoEl.srcObject = stream;
        await new Promise((resolve) => {
          videoEl.onloadedmetadata = () => {
            videoEl.play();
            resolve();
          };
        });
      }
    };

    const startDetectionLoop = () => {
      intervalRef.current = setInterval(async () => {
        if (videoRef.current && modelRef.current) {
          const predictions = await modelRef.current.estimateFaces(videoRef.current, false);

          const faceNotVisible =
            !predictions.length ||
            (predictions[0].probability && predictions[0].probability < 0.15);

          if (faceNotVisible && faceEventRef?.current) {
            faceEventRef.current(); // increments once per second
          }
        }
      }, 1000); // run every 1 second
    };

    loadModelAndStart();

    return () => {
      // cleanup: stop detection + stop camera
      if (intervalRef.current) clearInterval(intervalRef.current);
      const stream = videoEl?.srcObject; // use captured ref
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [faceEventRef]);

  return (
    <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
  );
};

export default FaceDetection;
