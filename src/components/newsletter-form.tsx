"use client";

import { useState, useRef } from "react";
import { Zap, Check, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

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

    // Submit via hidden form POST to Beehiiv
    formRef.current?.submit();

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <>
      {/* Hidden form that POSTs directly to Beehiiv */}
      <form
        ref={formRef}
        action="https://subscribe-forms.beehiiv.com/api/submit"
        method="POST"
        target="beehiiv-hidden"
        className="hidden"
      >
        <input type="hidden" name="form_id" value="4471e49d-5852-4780-816b-3c0a9c625521" />
        <input type="hidden" name="form[email]" value={email} />
      </form>
      <iframe name="beehiiv-hidden" className="hidden" />

      {/* Visible form with our custom design */}
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
          {status === "success" ? "You're in! 🎉" : "Subscribe"}
        </button>
      </form>
    </>
  );
}
