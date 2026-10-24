"use client";

import { useCallback, useState } from "react";

/* Section 9.2 Search by NAFDAC number (input field):
   Label above in micro style: "NAFDAC REG. NO.".
   Field: 48px raised style. Input text in mono 18px.
   Placeholder: "e.g. A4-0000".
   Auto-uppercase, letters/digits/hyphen, trims spaces, pastes cleanly.
   Helper: "Find it on the pack, near the barcode or ingredients."
   Primary "Check number" disabled until at least 4 characters.
   Validation error in Report color under the field. */

type NumberFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onCheck: (value: string) => void;
  disabled?: boolean;
};

const NAFDAC_PATTERN = /^[A-Z0-9][A-Z0-9-]{3,}$/;

export function NumberField({
  value,
  onChange,
  onCheck,
  disabled = false,
}: NumberFieldProps) {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const normalized = value.toUpperCase().replace(/\s+/g, "");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "").replace(/\s+/g, "");
      onChange(v);
      setTouched(true);
      setError("");
    },
    [onChange],
  );
  const handleBlur = useCallback(() => {
    setTouched(true);
    if (normalized.length > 0 && !NAFDAC_PATTERN.test(normalized)) {
      setError(
        "That doesn't look like a NAFDAC number. Check and try again.",
      );
    }
  }, [normalized]);
  const handleCheck = useCallback(() => {
    setTouched(true);
    if (!NAFDAC_PATTERN.test(normalized)) {
      setError(
        "That doesn't look like a NAFDAC number. Check and try again.",
      );
      return;
    }
    onCheck(normalized);
  }, [normalized, onCheck]);

  const invalid = touched && normalized.length > 0 && !NAFDAC_PATTERN.test(normalized);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-micro text-muted block">
        NAFADAC REG. NO.
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={20}
          value={normalized}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="e.g. A4-0000"
          className={[
            "min-h-[48px] w-full rounded-[12px] border border-solid",
            "bg-raised text-text font-mono text-[18px] leading-[22px]",
            "outline-none pl-4 pr-4 transition-colors",
            invalid ? "border-[2px] border-report" : "border-line",
            disabled ? "opacity-50 pointer-events-none" : "",
          ].join(" ")}
        />
      </div>
      {invalid && (
        <p className="text-caption text-report">{error}</p>
      )}
      <p className="text-caption text-muted">
        Find it on the pack, near the barcode or ingredients.
      </p>
      <button
        type="button"
        onClick={handleCheck}
        disabled={disabled || normalized.length < 4 || invalid}
        className="mt-2 w-full"
      >
        Check number
      </button>
    </div>
  );
}
