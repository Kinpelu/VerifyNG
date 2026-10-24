"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Chevron } from "./Icons";

/* Back button — returns the user to the scanner (home). */

type BackButtonProps = {
  onBack?: () => void;
  label?: string;
};

export function BackButton({ onBack, label = "Back" }: BackButtonProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    onBack?.();
    router.replace("/scan");
  }, [router, onBack]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-[12px] border border-solid border-line bg-raised px-3 py-2 text-text text-label font-medium hover:bg-indigo/20 transition-colors"
    >
      <Chevron size={18} dir="left" />
      {label}
    </button>
  );
}
