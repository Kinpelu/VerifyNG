"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OfflineBanner } from "@/components/OfflineBanner";
import { ResultBanner } from "@/components/ResultBanner";
import { Toast } from "@/components/Toast";
import { PrimaryButton } from "@/components/Button";
import { addHistory } from "@/lib/history";
import { GREENBOOK_UPDATED } from "@/lib/greenbook";
import { Flag } from "@/components/Icons";
import { BottomBar } from "@/components/BottomBar";
import { BackButton } from "@/components/BackButton";

type Status = "registered" | "not-found" | "expired";

type Query = {
  status?: Status;
  product?: string;
  manufacturer?: string;
  regNo?: string;
};

function getQuery(searchParams: URLSearchParams): Query {
  return {
    status: (searchParams.get("status") as Status) || undefined,
    product: searchParams.get("product") || undefined,
    manufacturer: searchParams.get("manufacturer") || undefined,
    regNo: searchParams.get("regNo") || undefined,
  };
}

/* Section 10.2 Result: status banner, details card, disclaimer,
   Scan another (primary), Report a problem. */

export default function ResultPage() {
  const router = useRouter();
  const queryParams = useMemo<URLSearchParams>(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const q = getQuery(queryParams);
  const status: Status =
    q.status === "registered" || q.status === "not-found" || q.status === "expired"
      ? q.status
      : "not-found";

  useEffect(() => {
    if (q.regNo && q.product) {
      addHistory({
        product: q.product,
        manufacturer: q.manufacturer ?? "—",
        regNo: q.regNo,
        status,
        scannedAt: new Date().toISOString(),
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToast({ open: true, message: "Saved to history" });
      setTimeout(() => setToast({ open: false, message: "" }), 3000);
    }
  }, [q.regNo, q.product, q.manufacturer, status]);

  return (
    <div className="flex flex-col min-h-screen bg-ink text-text">
      <OfflineBanner />
      <BackButton />
      <main className="flex-1 px-4 pt-4 pb-20 max-w-[480px] mx-auto">
        {/* Banner fades and rises 12px on arrival (spec 12 Motion) */}
        <ResultBanner status={status} className="animate-fade-up" />

        {/* Details card (spec 7.3) */}
        <section className="mt-6 surface-1 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="text-micro text-muted">PRODUCT</p>
              {q.product ? (
                <p className="text-body text-text font-mono">{q.product}</p>
              ) : (
                <p className="text-body text-muted">—</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-micro text-muted">MANUFACTURER</p>
              <p className="text-body text-text">{q.manufacturer || "—"}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-micro text-muted">REG. NO.</p>
              <p
                className="text-reg-no text-glow font-mono"
                title="Registration number — selectable and copyable"
              >
                {q.regNo || "—"}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-line">
              <p className="text-micro text-muted">DATA UPDATED</p>
              <p className="text-caption text-muted">
                {q.regNo ? `Greenbook · ${GREENBOOK_UPDATED}` : "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer — always visible under the card (spec 7.3, 13) */}
        <p className="mt-4 text-caption text-muted">
          “Registered” does not guarantee this exact unit is genuine.
        </p>
        <p className="mt-1 text-[11px] text-muted">
          Data from NAFDAC Greenbook. Updated {GREENBOOK_UPDATED}.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <PrimaryButton
            onClick={() => router.replace("/scan")}
            fullWidth
          >
            Scan another
          </PrimaryButton>
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams();
              if (q.regNo) params.set("regNo", q.regNo);
              if (q.product) params.set("product", q.product);
              if (q.manufacturer) params.set("manufacturer", q.manufacturer);
              if (status) params.set("status", status);
              router.replace(`/report?${params.toString()}`);
            }}
            className="min-h-[48px] w-full rounded-[12px] border border-solid border-report text-report text-label font-medium bg-transparent"
          >
            <Flag size={18} className="mr-2" /> Report a problem
          </button>
        </div>
      </main>

      <BottomBar active="history" onTabChange={() => {}} />
      <Toast open={toast.open} message={toast.message} onClose={() => setToast({ open: false, message: "" })} />
    </div>
  );
}
