"use client";

import { Zap } from "lucide-react";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="min-h-[48px] flex-1 rounded-xl border-2 border-zinc-700 bg-zinc-900 px-4 font-mono text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-green-500"
      />
      <button
        type="submit"
        className="glow-pulse inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-500 px-6 font-heading text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-green-400"
      >
        <Zap className="h-4 w-4" />
        Subscribe
      </button>
    </form>
  );
}
