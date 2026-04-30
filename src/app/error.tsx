"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full glass-morphism rounded-3xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <AlertCircle className="text-red-500" size={40} />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Something went wrong
          </h2>
          
          <p className="text-zinc-400 mb-8 leading-relaxed text-sm md:text-base">
            An unexpected error occurred during execution. I&apos;ve logged the details, but you can try to recover or return home.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-orange/20"
            >
              <RefreshCcw size={18} />
              Try again
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-black/40 rounded-xl border border-white/5 text-left overflow-hidden">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Debug Info</p>
              <pre className="text-[11px] text-red-400 font-mono overflow-x-auto whitespace-pre-wrap">
                {error.message}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
