"use client";

/* Section 8.2 Scan line:
   3px tall, horizontal gradient transparent -> glow -> transparent, 18px glow.
   Sweeps top to bottom over 1.6s, looping while searching.
   Respects prefers-reduced-motion: static line instead of sweep. */

type ScanLineProps = {
  width: number;
  active?: boolean;
};

export function ScanLine({ width, active = true }: ScanLineProps) {
  return (
    <div
      className={[
        "absolute left-0 w-full h-[3px] pointer-events-none z-20",
        active ? "animate-sweep" : "sweep-static",
        "scan-glow",
      ].join(" ")}
      style={{
        height: 3,
        width,
        background: `linear-gradient(90deg, transparent, var(--color-glow), transparent)`,
        top: active ? "-120%" : "50%",
      }}
    />
  );
}
