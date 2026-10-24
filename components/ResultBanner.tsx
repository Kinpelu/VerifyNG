"use client";

import { Check, AlertCircle, Clock } from "./Icons";

/* Section 7.3 Result banner:
   16px radius, 16px padding, status tint fill, 1px status border,
   28px status icon, status name in Title style, one line Caption explanation. */

type Status = "registered" | "not-found" | "expired";

type ResultBannerProps = {
  status: Status;
  className?: string;
};

const STATUS: Record<
  Status,
  { label: string; tint: string; border: string; color: string; Icon: React.ElementType; explanation: string }
> = {
  registered: {
    label: "Registered",
    tint: "tint-registered",
    border: "border-registered",
    color: "text-registered",
    Icon: Check,
    explanation: "This product's NAFDAC registration number appears in the Greenbook.",
  },
  "not-found": {
    label: "Not found in Greenbook",
    tint: "tint-not-found",
    border: "border-not-found",
    color: "text-not-found",
    Icon: AlertCircle,
    explanation:
      "This could mean the product isn't registered, or our data hasn't caught up yet.",
  },
  expired: {
    label: "Expired / inactive",
    tint: "tint-expired",
    border: "border-expired",
    color: "text-expired",
    Icon: Clock,
    explanation: "The registration shown in the Greenbook is no longer active.",
  },
};

export function ResultBanner({ status, className }: ResultBannerProps) {
  const info = STATUS[status];
  const Icon = info.Icon;
  return (
    <section
      className={[
        "rounded-[16px] p-4 border border-solid",
        info.tint,
        info.border,
        className,
      ].filter(Boolean).join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-[var(--color-surface)]">
          <Icon size={28} className="text-[28px] leading-none" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-title text-text leading-[28px]">{info.label}</p>
          <p className="text-caption text-muted mt-1">{info.explanation}</p>
        </div>
      </div>
    </section>
  );
}
