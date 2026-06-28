import Link from "next/link";
import { Terminal, ArrowLeft, FolderOpen, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6">
      <div className="max-w-lg w-full glass-morphism rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Terminal icon */}
          <div className="w-20 h-20 bg-brand-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-neon/20">
            <Terminal className="text-brand-neon" size={36} />
          </div>

          {/* Error code */}
          <div className="font-mono text-6xl md:text-7xl font-bold text-white mb-2 tracking-tight">
            404
          </div>

          {/* Message */}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-neon/60 mb-4">
            ROUTE_NOT_FOUND
          </p>

          <p className="text-zinc-400 mb-8 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
            The requested resource does not exist in this system.
            It may have been moved, deleted, or never existed.
          </p>

          {/* Navigation options */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-brand-orange to-orange-400 text-black rounded-xl font-bold transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-orange/20 text-sm"
            >
              <ArrowLeft size={18} />
              Return_Home
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all text-xs uppercase tracking-wider"
              >
                <FolderOpen size={16} />
                Projects
              </Link>
              <Link
                href="/blogs"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all text-xs uppercase tracking-wider"
              >
                <BookOpen size={16} />
                Journals
              </Link>
            </div>
          </div>

          {/* Terminal-style footer */}
          <div className="mt-8 p-3 bg-black/40 rounded-xl border border-white/5 text-left">
            <p className="font-mono text-[10px] text-zinc-600">
              <span className="text-brand-neon/50">$</span> curl -s /unknown-route
            </p>
            <p className="font-mono text-[10px] text-zinc-500 mt-1">
              {"{"} &quot;status&quot;: 404, &quot;message&quot;: &quot;Not Found&quot; {"}"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
