"use client";

import { useEffect, useState } from "react";
import { Check, Close } from "./Icons";

/* Section 7.7 Toasts:
   Pill, raised fill, bottom-centre above the bar, auto-dismiss after 3 seconds.
   For "Saved to history" and "Report sent". */

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function Toast({ open, message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(t);
    }
    setVisible(open);
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-[calc(80px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full raised-2 border border-line px-4 py-2.5 text-caption text-text shadow-lg animate-fade-up"
    >
      <Check size={16} color="var(--color-glow)" />
      {message}
      <button
        type="button"
        onClick={onClose}
        className="ml-2 p-1 text-muted hover:text-text"
        aria-label="Dismiss"
      >
        <Close size={16} />
      </button>
    </div>
  );
}
