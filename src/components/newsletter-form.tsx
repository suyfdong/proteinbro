"use client";

import { useState } from "react";
import { Zap, Check, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Enter your email to subscribe");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    setStatus("loading");

    // Open Beehiiv subscribe form with email pre-filled in a new tab
    const beehiivUrl = `https://subscribe-forms.beehiiv.com/4471e49d-5852-4780-816b-3c0a9c625521`;
    window.open(beehiivUrl, "_blank", "noopener,noreferrer");

    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <div className="flex-1">
        <input
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="your@email.com"
          className={`min-h-[48px] w-full rounded-xl border-2 ${error ? "border-red-500" : "border-zinc-700"} bg-zinc-900 px-4 font-mono text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-green-500`}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="glow-pulse inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-500 px-6 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400 disabled:opacity-50"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : status === "success" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Zap className="h-4 w-4" />
        )}
        {status === "success" ? "Complete signup →" : "Subscribe"}
      </button>
    </form>
  );
}
