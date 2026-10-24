"use client";

/* Section 8.2 Viewfinder:
   210 x 130 px landscape rectangle. Four white corner brackets, 4px stroke,
   34px arms, 14px outer radius. Never a full border. */

type ViewfinderProps = {
  success?: boolean;
};

export function Viewfinder({ success = false }: ViewfinderProps) {
  const bracketColor = success ? "var(--color-glow)" : "var(--color-text)";
  const size = { w: 210, h: 130 };
  const arm = 34;
  const stroke = 4;

  const corner = (side: "tl" | "tr" | "bl" | "br") => {
    const styles: Record<string, React.CSSProperties> = {
      tl: { top: 0, left: 0 },
      tr: { top: 0, right: 0 },
      bl: { bottom: 0, left: 0 },
      br: { bottom: 0, right: 0 },
    };
    const horiz =
      side === "tl" || side === "tr"
        ? { width: arm, height: stroke, borderTop: `4px solid ${bracketColor}` }
        : { width: arm, height: stroke, borderBottom: `4px solid ${bracketColor}` };
    const vert =
      side === "tl" || side === "bl"
        ? { height: arm, width: stroke, borderLeft: `4px solid ${bracketColor}` }
        : { height: arm, width: stroke, borderRight: `4px solid ${bracketColor}` };
    return (
      <div
        key={side}
        className="absolute"
        style={{
          ...styles[side],
          ...horiz,
          ...vert,
          [side === "tl" || side === "tr" ? "top" : "bottom"]: -stroke / 2,
          [side === "tl" || side === "bl" ? "left" : "right"]: -stroke / 2,
        }}
      />
    );
  };

  return (
    <div
      className="relative mx-auto shrink-0"
      style={{ width: size.w, height: size.h }}
    >
      {(["tl", "tr", "bl", "br"] as const).map((side) => corner(side))}
      {/* Subtle frame face so the target area stays readable on busy packs */}
      <div
        className="absolute inset-0 rounded-[14px] pointer-events-none"
        style={{
          border: `1px solid rgba(255,255,255,0.35)`,
          background: "rgba(255,255,255,0.03)",
        }}
      />
    </div>
  );
}
