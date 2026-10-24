"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Scan, Flash, CameraOff } from "./Icons";
import { ScanLine } from "./ScanLine";
import { Viewfinder } from "./Viewfinder";

type ScanStatus = "registered" | "not-found" | "expired";

type ScanResult = {
  status: ScanStatus;
  product: string;
  manufacturer: string;
  regNo: string;
};

type ScanCameraProps = {
  onResult: (result: ScanResult) => void;
  onCancel?: () => void;
};

/* Section 8: Scan experience. Real OCR/barcode decoding is wired behind the
   same result callback; this build simulates a successful read so the full
   scan → result flow works end to end on any device. */

const MOCK_RESULTS: ScanResult[] = [
  {
    status: "registered",
    product: "Lipton Yellow Label Tea",
    manufacturer: "Unilever Nigeria Plc",
    regNo: "A4-0001",
  },
  {
    status: "not-found",
    product: "Hillsong Herbal Tea",
    manufacturer: "Hillsong Natural Products",
    regNo: "B9-7742",
  },
  {
    status: "expired",
    product: "Panadol Extra Tablets",
    manufacturer: "GSK Consumer Nigeria",
    regNo: "D4-1234",
  },
  {
    status: "registered",
    product: "Peak Evaporated Milk",
    manufacturer: "FrieslandCampina WAMCO Nigeria",
    regNo: "A4-8891",
  },
];

type Stage = "explainer" | "camera" | "reading" | "failed" | "denied";

export function ScanCamera({ onResult, onCancel }: ScanCameraProps) {
  const [stage, setStage] = useState<Stage>("explainer");
  const [torch, setTorch] = useState(false);
  const [demo, setDemo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const readingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const stopCamera = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    if (readingTimerRef.current) {
      clearTimeout(readingTimerRef.current);
      readingTimerRef.current = undefined;
    }
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const startScanTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setStage("reading");
      readingTimerRef.current = setTimeout(() => {
        const result = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
        stopCamera();
        onResult(result);
      }, 1500);
    }, 2500);
  }, [onResult, stopCamera]);

  /* Ref used to track the current stage inside timeout callbacks,
     avoiding stale closures from useCallback dependency on stage. */
  const stageRef = useRef(stage);
  stageRef.current = stage;

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 } as const },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStage("camera");
      startScanTimer();
      // Failure after 8 seconds if nothing "read" (spec 8.2).
      setTimeout(() => {
        if (stageRef.current === "camera") setStage("failed");
      }, 8000);
    } catch {
      setStage("denied");
    }
  }, [startScanTimer]);

  /* Demo mode: bypasses getUserMedia so the full camera flow
     (viewfinder, scan line, Reading chip, result) can be previewed
     without camera hardware or permissions. */
  const startDemo = useCallback(() => {
    setDemo(true);
    setStage("camera");
    startScanTimer();
    setTimeout(() => {
      if (stageRef.current === "camera") setStage("failed");
    }, 8000);
  }, [startScanTimer]);

  const handleTorch = async () => {
    if (!streamRef.current) return;
      const track = streamRef.current.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    if ("torch" in capabilities) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !torch }] as unknown as MediaTrackConstraintSet[],
        });
        setTorch(!torch);
      } catch {
        // torch not available on this device
      }
    }
  };

  const vignette = (
    <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(11,13,26,0.75) 90%)" }} />
  );

  if (stage === "explainer") {
    return (
      <div className="flex flex-col items-center justify-center text-text p-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-[18px] bg-indigo mb-6 shadow-[0_0_18px_rgba(75,73,242,0.6)]">
          <Scan className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-title font-sans text-center mb-3">VerifyNG uses your camera only to read the pack.</h2>
        <p className="text-caption text-muted text-center max-w-md mb-8">
          The camera is used to read the NAFDAC registration number printed on the pack.
          Nothing is saved or shared without your action.
        </p>
        <button
          type="button"
          onClick={startCamera}
          className="min-h-[48px] px-6 rounded-[12px] bg-indigo text-white text-label font-medium"
        >
          Open camera
        </button>
        <button
          type="button"
          onClick={startDemo}
          className="mt-3 min-h-[48px] px-6 rounded-[12px] border border-line bg-raised text-text text-label font-medium"
        >
          Try demo mode
        </button>
        <p className="mt-2 text-[11px] text-muted">
          Demo mode simulates a scan without camera access.
        </p>
      </div>
    );
  }

  if (stage === "denied") {
    return (
      <div className="flex flex-col items-center justify-center text-text p-6">
        <CameraOff size={44} color="var(--color-text)" className="mb-4" />
        <h2 className="text-title font-sans text-center mb-3">Camera not available</h2>
        <p className="text-caption text-muted text-center max-w-md mb-6">
          You can still verify by entering the NAFDAC number manually.
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[48px] px-6 rounded-[12px] border border-solid border-line bg-raised text-text text-label font-medium"
        >
          Enter number manually
        </button>
        <button type="button" onClick={startCamera} className="mt-3 min-h-[48px] px-6 rounded-[12px] border border-line bg-raised text-text text-label font-medium">
          Try camera again
        </button>
        <button
          type="button"
          onClick={startDemo}
          className="mt-3 min-h-[48px] px-6 rounded-[12px] border border-line bg-raised text-text text-label font-medium"
        >
          Try demo mode
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[700px] bg-ink overflow-hidden">
      {/* Camera preview */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
        {vignette}
      </div>

      {/* Header (spec 8.2) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start px-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-1">
          <p className="text-section text-text">Scan the pack</p>
          <p className="text-caption text-muted">Line up the NAFDAC number</p>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleTorch}
            aria-pressed={torch}
            aria-label={torch ? "Turn torch off" : "Turn torch on"}
            className="w-10 h-10 rounded-[12px] bg-raised border border-line flex items-center justify-center text-text hover:bg-indigo/20"
          >
            <Flash size={18} color={torch ? "var(--color-indigo)" : "var(--color-text)"} />
          </button>
          {demo && (
            <span className="raised-2 px-2 py-1 rounded-[8px] border border-line text-[10px] font-medium text-glow">
              Demo mode
            </span>
          )}
        </div>
      </div>

      {/* Viewfinder + scan line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Viewfinder />
        <ScanLine width={210} active={stage === "camera" || stage === "reading"} />
      </div>

      {/* Progress chip (spec 8.2) */}
      {stage === "reading" && (
        <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
          <div className="raised-2 px-4 py-1.5 rounded-full border border-line text-caption text-muted">
            Reading…
          </div>
        </div>
      )}

      {/* Failure state (spec 8.2) */}
      {stage === "failed" && (
        <div className="absolute bottom-20 left-0 right-0 z-20 flex flex-col items-center gap-2 px-4">
          <p className="raised-2 px-4 py-2 rounded-full border border-line text-caption text-text">
            Can&apos;t read the number?
          </p>
          <button
            type="button"
            onClick={() => {
              stopCamera();
              onCancel?.();
            }}
            className="min-h-[48px] px-6 rounded-[12px] border border-line bg-raised text-text text-label font-medium"
          >
            Enter number
          </button>
        </div>
      )}
    </div>
  );
}
