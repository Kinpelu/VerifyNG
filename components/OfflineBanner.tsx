"use client";

import { useEffect, useState } from "react";

/* Section 7.7 Offline banner:
   Full-width strip under the status bar in amber tint:
   "You're offline. We'll check this when you reconnect." */

export function OfflineBanner() {
  const [offline, setOffline] = useState(typeof navigator !== "undefined" && !navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(true);
    const off = () => setOffline(false);
    window.addEventListener("offline", on);
    window.addEventListener("online", off);
    return () => {
      window.removeEventListener("offline", on);
      window.removeEventListener("online", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="tint-not-found border-b border-not-found text-text text-caption px-4 py-2.5">
      You&apos;re offline. We&apos;ll check this when you reconnect.
    </div>
  );
}
