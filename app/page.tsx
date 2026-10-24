import { redirect } from "next/navigation";

/* Root route — the camera is home (spec §1: "The app opens on the scanner").
   Server-side redirect to /scan so the preview/entry always lands on the
   scanner explainer rather than the splash. */

export default function Page() {
  redirect("/scan");
}
