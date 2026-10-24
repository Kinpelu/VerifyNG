/* Scan history persisted in localStorage. Users see only their own entries. */

import type { HistoryEntry } from "@/components/HistoryRow";

const STORAGE_KEY = "verifyng-history";

export type HistoryEvent = Omit<HistoryEntry, "id" | "scannedAt"> & {
  id?: string;
  scannedAt?: string;
};

function nowISO() {
  return new Date().toISOString();
}

export function loadHistory(): HistoryEntry[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota exceeded or private mode: silently drop
  }
}

export function addHistory(entry: HistoryEvent): HistoryEntry {
  const normalized: HistoryEntry = {
    id: entry.id || crypto.randomUUID?.() || String(Date.now()),
    scannedAt: entry.scannedAt ?? nowISO(),
    ...entry,
  };
  const entries = loadHistory();
  // Avoid exact duplicate reg-number scans within 5 minutes; keep it simple:
  // always prepend, cap at 200 entries.
  saveHistory([normalized, ...entries].slice(0, 200));
  return normalized;
}

export function removeHistory(id: string) {
  const entries = loadHistory().filter((e) => e.id !== id);
  saveHistory(entries);
}
