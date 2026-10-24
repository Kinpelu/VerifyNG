"use client";

/* Section 7.6 Segmented toggle:
   surface track with 4px padding, 12px radius.
   Selected segment indigo with white text; the other muted. */

type SegmentedToggleProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function SegmentedToggle({
  value,
  options,
  onChange,
}: SegmentedToggleProps) {
  return (
    <div
      className="raised-2 inline-flex p-[4px] rounded-[12px] w-full"
      role="radiogroup"
      aria-label="Filter"
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={[
              "flex-1 py-2 rounded-[8px] text-micro font-medium transition-colors",
              selected
                ? "bg-indigo text-white"
                : "text-muted hover:text-text",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
