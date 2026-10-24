"use client";

import { useCallback } from "react";


type ButtonVariant = "primary" | "secondary" | "report" | "text";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled && !loading) onClick?.();
  }, [disabled, loading, onClick]);

  const base =
    "min-h-[48px] min-w-[48px] px-6 rounded-[12px] text-label font-sans border-solid outline-none disabled:opacity-40 disabled:pointer-events-none transition-colors active:opacity-90";
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo text-white border-0 shadow-none",
    secondary:
      "bg-raised text-text border line border-[1px]",
    report:
      "bg-transparent text-report border-[1px] border-report",
    text:
      "bg-transparent text-glow border-0",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`${base} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-[spin_1s_linear_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20M2 12h20" />
          </svg>
          <span className="text-caption text-muted">Working…</span>
        </span>
      ) : (
        <>
          {children}
          {typeof children === "string" && !ariaLabel ? null : null}
        </>
      )}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}

export function ReportButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="report" {...props} />;
}

export function TextButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="text" {...props} />;
}
