"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/profile";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center section-px overflow-hidden pt-20">
      {/* Background patterns — smaller on mobile to avoid overflow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-brand-orange/20 rounded-full blur-[100px] sm:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-zinc-800/30 rounded-full blur-[100px] sm:blur-[128px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        {/* Status badges — wrap on narrow screens */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 font-mono text-[10px] sm:text-xs uppercase tracking-tighter">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            <span className="truncate">Live_Availability: {profile.status.replaceAll(" ", "_").toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 font-mono text-[10px] sm:text-xs uppercase tracking-tighter">
            <MapPin size={12} className="text-zinc-500 shrink-0" />
            <span className="truncate">{profile.location}</span>
          </div>
        </div>

        {/* Hero heading — fluid typography */}
        <h1
          className="font-bold mb-4 sm:mb-6 tracking-tighter leading-[1.05]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          {profile.name.toUpperCase()} <br />
          <span className="text-zinc-500">{profile.role.toUpperCase()}</span>
        </h1>

        {/* Summary — fluid sizing */}
        <p
          className="max-w-2xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed"
          style={{ fontSize: "var(--text-lg)" }}
        >
          {profile.summary}
        </p>

        {/* CTA buttons — full-width on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/#archive"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-orange text-black font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors group text-sm sm:text-base"
          >
            View_Project_Archive <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="/Ajay_Resume.pdf"
            download
            className="px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-800 font-mono text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors uppercase"
          >
            <Download size={18} /> Download_Resume
          </a>
        </div>
      </motion.div>

      {/* Bottom status bar — stack on mobile */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 md:left-24 right-4 sm:right-auto font-mono text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-1">
        <div>System_Status: OPTIMAL</div>
        <div>Engine_Ver: 4.2.0-STABLE</div>
        <div>Latency: 24MS</div>
      </div>
    </section>
  );
};

export default Hero;
