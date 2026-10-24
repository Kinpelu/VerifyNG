"use client";

import { useCallback, useRef, useState } from "react";
import { Search, Close } from "./Icons";

/* Section 9.1 Search bar:
   Height 48px, raised fill, 1px line border, 12px radius.
   20px search icon in muted at 14px from the left edge; text starts 44px in.
   Placeholder muted: "Search product or brand".
   Focus: border becomes 2px glow; clear (x) button appears once text is entered. */

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search product or brand",
  disabled = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch?.(value);
      }
    },
    [value, onSearch],
  );
  const handleClear = useCallback(() => {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  }, [onChange, onClear]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        autoComplete="off"
        autoCapitalize="words"
        spellCheck={false}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        placeholder={placeholder}
        className={[
          "min-h-[48px] w-full pl-11 pr-10 rounded-[12px] border border-solid",
          "bg-raised text-text font-sans text-body",
          "outline-none transition-colors",
          focused ? "border-[2px] border-glow" : "border-line",
          disabled ? "opacity-50 pointer-events-none" : "",
        ].join(" ")}
        style={{
          paddingLeft: 44,
          paddingRight: value.length ? 44 : 12,
        }}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted shrink-0">
        <Search size={20} />
      </div>
      {value.length > 0 && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-text"
          aria-label="Clear"
        >
          <Close size={18} />
        </button>
      )}
    </div>
  );
}
