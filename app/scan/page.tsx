"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { OfflineBanner } from "@/components/OfflineBanner";
import { BottomBar } from "@/components/BottomBar";
import { ScanCamera } from "@/components/ScanCamera";

/* Section 8.2 / 1: Scan (home) — full-screen camera, viewfinder, scan line,
   header, torch toggle, bottom bar. The camera is home. */

export default function ScanPage() {
  const router = useRouter();

  const handleResult = useCallback(
    (result: {
      status: string;
      product: string;
      manufacturer: string;
      regNo: string;
    }) => {
      router.replace(
        `/result?status=${encodeURIComponent(result.status)}&product=${encodeURIComponent(
          result.product,
        )}&manufacturer=${encodeURIComponent(
          result.manufacturer,
        )}&regNo=${encodeURIComponent(result.regNo)}`,
      );
    },
    [router],
  );

  const handleCancel = useCallback(() => {
    router.replace("/enter-number");
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-ink overflow-hidden">
      <OfflineBanner />
      <ScanCamera onResult={handleResult} onCancel={handleCancel} />
      <BottomBar active="scan" onTabChange={(tab) => {
        if (tab === "gallery") router.replace("/history");
        if (tab === "history") router.replace("/history");
      }} />
    </div>
  );
}
