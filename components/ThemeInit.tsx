"use client";

import { useEffect } from "react";

const STORAGE_KEY = "verifyng-theme";

function getStoredTheme(): "light" | "dark" | null {
  if (typeof localStorage === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

function getSystemTheme(): "light" | "dark" {
  return typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export default function ThemeInit() {
  useEffect(() => {
    const stored = getStoredTheme();
    const theme = stored ?? getSystemTheme();
    applyTheme(theme);

    // Follow the system preference unless the user has made a manual choice.
    if (!stored) {
      const mq = matchMedia("(prefers-color-scheme: light)");
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? "light" : "dark");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    // PWA service worker (offline-tolerant shell).
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" });
    }
  }, []);

  return null;
}

/**
 * Call from any client component to persist a manual theme choice.
 */
export function setTheme(theme: "light" | "dark") {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, theme);
  }
  applyTheme(theme);
}
