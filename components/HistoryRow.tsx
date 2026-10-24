"use client";

import { useCallback, useRef, useState } from "react";
import { Check, AlertCircle, Clock, Chevron } from "./Icons";

/* Section 7.4 History row:
   surface card, 44px square icon tile in status tint, product name (15px, 700),
   registration number in mono 12px with the date in muted. Swipe left to delete. */

type Status = "registered" | "not-found" | "expired";

export type HistoryEntry = {
  id: string;
  product: string;
  manufacturer: string;
  regNo: string;
  status: Status;
  scannedAt: string; // ISO
};

type HistoryRowProps = {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
};

const ICONS: Record<Status, React.ElementType> = {
  registered: Check,
  "not-found": AlertCircle,
  expired: Clock,
};
const COLORS: Record<Status, string> = {
  registered: "text-registered",
  "not-found": "text-not-found",
  expired: "text-expired",
};

export function HistoryRow({ entry, onDelete }: HistoryRowProps) {
  const Icon = ICONS[entry.status];
  const [x, setX] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const startRef = useRef(0);

  const getClientX = (e: MouseEvent | TouchEvent) =>
    e.type.startsWith("touch")
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;

  const onStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      startRef.current = getClientX(e.nativeEvent || e);
      setX(0);
      const move = (ev: MouseEvent | TouchEvent) => {
        const dx = Math.min(0, getClientX(ev) - startRef.current);
        setX(dx);
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", up);
        if (x < -70) {
          setDeleted(true);
          setTimeout(() => onDelete(entry.id), 220);
        } else {
          setX(0);
        }
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchmove", move, { passive: true });
      window.addEventListener("touchend", up);
    },
    [x, entry.id, onDelete],
  );

  const dateLabel = new Date(entry.scannedAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className="surface-1 p-3 flex items-center gap-3 overflow-hidden relative"
      style={{ transform: `translateX(${x}px)` }}
      onTouchStart={onStart}
      onMouseDown={onStart}
    >
      <div
        className="flex shrink-0 items-center justify-center w-[44px] h-[44px] rounded-[12px]"
        style={{
          backgroundColor: `color-mix(in srgb, var(--color-${entry.status.replace(
            /-/g,
            "-"
          )}) 14%, transparent)`,
        }}
      >
        <Icon size={20} className={`shrink-0 ${COLORS[entry.status]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-label leading-[20px] text-text truncate">{entry.product}</p>
        <p className="text-[12px] font-mono text-muted truncate leading-[16px]">
          {entry.regNo}
        </p>
        <p className="text-caption text-muted">{dateLabel}</p>
      </div>
      <Chevron size={16} color="var(--color-muted)" />
      {deleted && (
        <button
          onClick={() => {
            setDeleted(false);
            setX(0);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-caption text-report"
          aria-label="Undo delete"
        >
          Undo
        </button>
      )}
    </article>
  );
}
