"use client";

import { Check, AlertCircle, Clock } from "./Icons";

/* Section 7.2 Status badges:
   Pill, 7px vertical / 12px horizontal padding, 13px weight 700, 16px icon, 6px gap.
   Tint fill + status-coloured text and icon — never colour alone. */

type Status = "registered" | "not-found" | "expired";

type BadgeProps = {
  status: Status;
  className?: string;
};

const STATUS: Record<
  Status,
  { label: string; tint: string; color: string; border: string; Icon: React.ElementType }
> = {
  registered: {
    label: "Registered",
    tint: "tint-registered",
    color: "text-registered",
    border: "border-registered",
    Icon: Check,
  },
  "not-found": {
    label: "Not found in Greenbook",
    tint: "tint-not-found",
    color: "text-not-found",
    border: "border-not-found",
    Icon: AlertCircle,
  },
  expired: {
    label: "Expired / inactive",
    tint: "tint-expired",
    color: "text-expired",
    border: "border-expired",
    Icon: Clock,
  },
};

export function Badge({ status, className }: BadgeProps) {
  const info = STATUS[status];
  const Icon = info.Icon;
  return (
    <span
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-full",
        "border border-solid px-3 py-1.5",
        "text-micro font-medium leading-[16px]",
        info.tint,
        info.border,
        info.color,
        className,
      ].filter(Boolean).join(" ")}
    >
      <Icon size={14} className="shrink-0" />
      {info.label}
    </span>
  );
}
