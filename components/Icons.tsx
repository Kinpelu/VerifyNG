/* VerifyNG core icon set (spec section 6).
   Outline icons, 2px stroke, round caps/joins, 24px grid. */

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  "aria-label"?: string;
};

export function Scan({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Scan"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

export function Gallery({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Gallery"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function History({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "History"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M12 2v20" />
      <path d="M5 12h14" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function Search({ size = 20, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Search"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function Check({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Check"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function AlertCircle({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Alert"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function Clock({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Clock"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function Flag({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Flag"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M4 15s1-1 4-3 5 2 8 2 4-1 4-5V3" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

export function CameraOff({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Camera off"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M9 20h6" />
      <path d="M3 3v18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
      <circle cx="12" cy="7" r="3" />
    </svg>
  );
}

export function Flash({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Torch"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function Close({ size = 24, color, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <svg
      aria-label={ariaLabel ?? "Close"}
      aria-hidden={!ariaLabel}
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Chevron({ size = 20, color, className, dir = "right" }: IconProps & { dir?: "right" | "left" }) {
  return (
    <svg
      aria-hidden
      fill="none"
      stroke={color || "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {dir === "right" ? (
        <>
          <line x1="5" y1="5" x2="19" y2="12" />
          <line x1="5" y1="19" x2="19" y2="12" />
        </>
      ) : (
        <>
          <line x1="19" y1="5" x2="5" y2="12" />
          <line x1="19" y1="19" x2="5" y2="12" />
        </>
      )}
    </svg>
  );
}
