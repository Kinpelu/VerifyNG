"use client";

import { useCallback } from "react";
import { Gallery, Scan, History } from "./Icons";

type Tab = "gallery" | "scan" | "history";

type BottomBarProps = {
  active: Tab;
  onTabChange: (tab: Tab) => void;
};

const TAB_ICONS: Record<Tab, React.ElementType> = {
  gallery: Gallery,
  scan: Scan,
  history: History,
};
const TAB_LABELS: Record<Tab, string> = {
  gallery: "Gallery",
  scan: "Scan",
  history: "History",
};

export function BottomBar({ active, onTabChange }: BottomBarProps) {
  const go = useCallback(
    (tab: Tab) => onTabChange(tab),
    [onTabChange],
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto w-full max-w-[500px] px-4"
        style={{ paddingBottom: `max(12px, env(safe-area-inset-bottom))` }}
      >
        {/* Pill bar (spec 7.5: surface fill, 24px radius) */}
        <div className="surface-1 border border-line rounded-[24px] px-4 py-2.5 flex items-center justify-between min-h-[72px] relative">
          <button
            onClick={() => go("gallery")}
            className={[
              "flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-[24px] p-2 transition-colors",
              active === "gallery"
                ? "bg-raised text-indigo border border-line"
                : "text-muted",
            ].join(" ")}
            aria-label={TAB_LABELS.gallery}
          >
            <TAB_ICONS.gallery size={20} className="shrink-0" />
            <span className="text-micro">{TAB_LABELS.gallery}</span>
          </button>

          <button
            onClick={() => go("scan")}
            className={[
              "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20",
              "flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-indigo",
              "shadow-[0_0_18px_rgba(75,73,242,0.5)]",
            ].join(" ")}
            aria-label="Scan"
          >
            <Scan size={26} color="white" className="shrink-0" />
          </button>

          <button
            onClick={() => go("history")}
            className={[
              "flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-[24px] p-2 transition-colors",
              active === "history"
                ? "bg-raised text-indigo border border-line"
                : "text-muted",
            ].join(" ")}
            aria-label={TAB_LABELS.history}
          >
            <TAB_ICONS.history size={20} className="shrink-0" />
            <span className="text-micro">{TAB_LABELS.history}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
