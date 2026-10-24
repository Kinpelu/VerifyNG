"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OfflineBanner } from "@/components/OfflineBanner";
import { NumberField } from "@/components/NumberField";
import { ResultBanner } from "@/components/ResultBanner";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { lookupByRegNo } from "@/lib/greenbook";

type Status = "registered" | "not-found" | "expired";

/* Section 9.2: Screen title "Enter NAFDAC number". Fallback when scanning
   fails, and a first-class entry point. Disambiguation when one number
   matches several products. */

export default function EnterNumberPage() {
  const router = useRouter();
  const queryParams = useMemo<URLSearchParams>(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);
  const [query, setQuery] = useState(
    queryParams.get("regNo") || "",
  );
  const [matches, setMatches] = useState<{ regNo: string; product: string; manufacturer: string }[] | null>(null);
  const [lookupResult, setLookupResult] = useState<{
    status: Status;
    product: string;
    manufacturer: string;
    regNo: string;
  } | null>(null);

  const handleChange = useCallback((v: string) => {
    setQuery(v);
    setMatches(null);
    setLookupResult(null);
  }, []);

  const handleCheck = useCallback(
    (regNo: string) => {
      const results = lookupByRegNo(regNo);
      if (results.length === 0) {
        setLookupResult({ status: "not-found", product: regNo, manufacturer: "—", regNo });
        return;
      }
      if (results.length === 1) {
        const r = results[0];
        setLookupResult({ status: r.status as Status, product: r.product, manufacturer: r.manufacturer, regNo: r.regNo });
        return;
      }
      setMatches(
        results.map((r) => ({
          regNo: r.regNo,
          product: r.product,
          manufacturer: r.manufacturer,
        })),
      );
    },
    [],
  );

  const goResult = useCallback(
    (r: { status: Status; product: string; manufacturer: string; regNo: string }) => {
      router.replace(
        `/result?status=${encodeURIComponent(r.status)}&product=${encodeURIComponent(
          r.product,
        )}&manufacturer=${encodeURIComponent(r.manufacturer)}&regNo=${encodeURIComponent(
          r.regNo,
        )}`,
      );
    },
    [router],
  );

  const prefill = queryParams?.get("regNo") || "";

  return (
    <div className="flex flex-col min-h-screen bg-ink text-text">
      <OfflineBanner />
      <BackButton />
      <main className="flex-1 px-4 pt-4 pb-24 max-w-[480px] mx-auto">
        <h1 className="text-section mb-1">Enter NAFDAC number</h1>
        <p className="text-caption text-muted mb-6">
          Type the registration number printed on the pack.
        </p>

        <NumberField
          value={query}
          onChange={handleChange}
          onCheck={handleCheck}
        />

        {prefill && (
          <p className="text-caption text-muted mt-3">
            Pre-filled from your scan. You can edit it above.
          </p>
        )}

        {matches && matches.length > 0 && (
          <section className="mt-6 surface-1 p-4">
            <p className="text-caption text-muted mb-3">Which one is yours?</p>
            {matches.map((m) => (
              <button
                key={m.regNo}
                type="button"
                onClick={() =>
                  goResult({
                    status: "not-found",
                    product: m.product,
                    manufacturer: m.manufacturer,
                    regNo: m.regNo,
                  })
                }
                className="w-full surface-1 border border-line rounded-[12px] p-3 text-left hover:bg-raised transition-colors"
              >
                <p className="text-label text-text">{m.product}</p>
                <p className="text-caption text-muted">{m.manufacturer}</p>
                <p className="text-[12px] font-mono text-text mt-1">{m.regNo}</p>
              </button>
            ))}
          </section>
        )}

        {lookupResult && (
          <section className="mt-6 surface-1 p-4">
            <ResultBanner status={lookupResult.status} />
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="text-micro text-muted">REG. NO.</p>
                <p className="text-reg-no text-glow font-mono">
                  {lookupResult.regNo}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-micro text-muted">MANUFACTURER</p>
                <p className="text-body text-text">{lookupResult.manufacturer}</p>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted">
              “Registered” does not guarantee this exact unit is genuine.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={() => goResult(lookupResult)}
                fullWidth
              >
                View result
              </Button>
              <Button
                variant="text"
                onClick={() => router.replace("/scan")}
                fullWidth
              >
                Scan another
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
