"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OfflineBanner } from "@/components/OfflineBanner";
import { SearchBar } from "@/components/SearchBar";
import { SegmentedToggle } from "@/components/SegmentedToggle";
import { HistoryRow, type HistoryEntry } from "@/components/HistoryRow";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { loadHistory, removeHistory } from "@/lib/history";
import { Toast } from "@/components/Toast";
import { Scan } from "@/components/Icons";

/* Section 10.4 History: search bar, Today / All toggle, rows, swipe to delete. */

type Scope = "today" | "all";

export default function HistoryPage() {
  const router = useRouter();
  const [raw, setRaw] = useState<HistoryEntry[]>(loadHistory());
  const [filter, setFilter] = useState<Scope>("all");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const entries = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return raw
      .filter((e) => {
        if (filter === "today") return new Date(e.scannedAt) >= today;
        return true;
      })
      .filter((e) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          e.product.toLowerCase().includes(q) ||
          e.regNo.toLowerCase().includes(q) ||
          e.manufacturer.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime());
  }, [raw, filter, query]);

  const handleDelete = useCallback(
    (id: string) => {
      removeHistory(id);
      setRaw(loadHistory());
      setToast({ open: true, message: "Deleted from history" });
      setTimeout(() => setToast({ open: false, message: "" }), 1000);
    },
    [],
  );

  const handleScan = () => router.replace("/scan");

  return (
    <div className="flex flex-col min-h-screen bg-ink text-text">
      <OfflineBanner />
      <BackButton />
      <main className="flex-1 px-4 pt-4 pb-24 max-w-[480px] mx-auto">
        <h1 className="text-section mb-3">Scan history</h1>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={setQuery}
          onClear={() => setQuery("")}
        />

        <div className="mt-4 mb-4">
          <SegmentedToggle
            value={filter}
            options={[
              { value: "today", label: "Today" },
              { value: "all", label: "All" },
            ]}
            onChange={(v) => setFilter(v as Scope)}
          />
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Scan size={48} color="var(--color-muted)" className="mb-3" />
            <p className="text-body text-muted mb-6">Nothing scanned yet</p>
            <Button variant="primary" onClick={handleScan} fullWidth>
              Scan a product
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <HistoryRow
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
