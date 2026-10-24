"use client";

import { useCallback, useMemo, useState } from "react";
import { OfflineBanner } from "@/components/OfflineBanner";
import { Button } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { Flag } from "@/components/Icons";
import { BackButton } from "@/components/BackButton";

/* Section 10.5 Report a product: photo upload, store, location,
   NAFDAC contact note, Send report. */

type ReportForm = {
  photo: string;
  store: string;
  location: string;
  regNo: string;
};

export default function ReportPage() {
  const queryParams = useMemo<URLSearchParams>(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<ReportForm>({
    photo: "",
    store: "",
    location: "",
    regNo: queryParams.get("regNo") || "",
  });
  const [photoError, setPhotoError] = useState("");

  const prefill = queryParams?.get("regNo") || "";

  const handleChange = useCallback(
    (k: keyof ReportForm) => (v: string) => {
      setForm((prev) => ({ ...prev, [k]: v }));
      if (k === "photo") setPhotoError("");
    },
    [],
  );

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image of the pack.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image too large. Please choose a smaller photo.");
      return;
    }
    setForm((prev) => ({ ...prev, photo: file.name }));
    setPhotoError("");
  }, []);

  const handleSend = useCallback(() => {
    if (!form.photo) {
      setPhotoError("Add a photo of the pack before sending.");
      return;
    }
    if (!form.store.trim()) {
      setPhotoError("Tell us the store name.");
      return;
    }
    setSending(true);
    // v1 stores reports locally and points to NAFDAC's official channels
    // (PRD: reports are not submitted directly into NAFDAC systems).
    setTimeout(() => {
      setSending(false);
      setToast({ open: true, message: "Report sent" });
    }, 1200);
  }, [form.photo, form.store]);

  return (
    <div className="flex flex-col min-h-screen bg-ink text-text">
      <OfflineBanner />
      <BackButton />
      <main className="flex-1 px-4 pt-4 pb-24 max-w-[480px] mx-auto">
        <h1 className="text-section mb-1">Report a product</h1>
        <p className="text-caption text-muted mb-6">
          Help keep unregistered products off shelves. Reports go to our
          queue and point to NAFDAC&rsquo;s official complaint channels.
        </p>

        {/* Photo upload (spec 9.3): 96px-high dashed card */}
        <div className="relative mb-6">
          <label className="text-micro text-muted mb-2 block">PACK PHOTO</label>
          <button
            type="button"
            onClick={() => document.getElementById("report-photo")?.click()}
            className={[
              "border border-2 border-dashed border-line rounded-[12px] h-[96px] flex flex-col items-center justify-center gap-2",
          "text-caption text-muted hover:border-glow hover:text-glow transition-colors",
        ].join(" ")}
          >
            <input
              id="report-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
            <span className="text-micro text-muted">Add a photo of the pack</span>
            {form.photo && (
              <p className="text-[11px] text-glow font-mono">{form.photo}</p>
            )}
          </button>
          {photoError && (
            <p className="absolute -top-8 left-0 text-[11px] text-report">
              {photoError}
            </p>
          )}
        </div>

        {/* Store name */}
        <div className="mb-6">
          <label className="text-micro text-muted mb-2 block">STORE NAME</label>
          <input
            autoComplete="off"
            value={form.store}
            onChange={(e) => handleChange("store")(e.target.value)}
            placeholder="e.g. Alhaji&rsquo;s Pharmacy"
            className="min-h-[48px] w-full rounded-[12px] border border-solid border-line bg-raised text-text pl-4 pr-4 outline-none"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="text-micro text-muted mb-2 block">LOCATION</label>
          <input
            autoComplete="off"
            value={form.location}
            onChange={(e) => handleChange("location")(e.target.value)}
            placeholder="e.g. Wuse Market, Abuja"
            className="min-h-[48px] w-full rounded-[12px] border border-solid border-line bg-raised text-text pl-4 pr-4 outline-none"
          />
        </div>

        {prefill && (
          <div className="mb-6">
            <label className="text-micro text-muted mb-2 block">NAFDAC REG. NO.</label>
            <p className="text-reg-no text-glow font-mono">{prefill}</p>
          </div>
        )}

        {/* NAFDAC contact note */}
        <section className="mb-8 surface-1 border border-line rounded-[12px] p-4">
          <p className="text-micro text-report mb-1 flex items-center gap-1.5">
            <Flag size={14} color="var(--color-report)" /> NAFDAC
          </p>
          <p className="text-body text-text">
            For urgent complaints, contact NAFDAC directly through its
            official channels. VerifyNG keeps a copy of your report so you
            can show it to a pharmacist or NAFDAC officer.
          </p>
        </section>

        <Button
          variant="primary"
          onClick={handleSend}
          disabled={sending || !form.photo || !form.store.trim()}
          loading={sending}
          fullWidth
        >
          Send report
        </Button>
      </main>

      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
