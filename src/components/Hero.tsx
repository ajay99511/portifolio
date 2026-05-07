"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, MapPin, Cpu, Sparkles, Radar } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/profile";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center section-px overflow-hidden pt-24 pb-16 sm:pb-20 grid-overlay">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[14%] -left-8 w-56 sm:w-80 h-56 sm:h-80 bg-brand-cyan/25 rounded-full blur-[110px] sm:blur-[140px] orb-drift" />
        <div className="absolute bottom-[8%] right-[6%] w-64 sm:w-96 h-64 sm:h-96 bg-brand-orange/28 rounded-full blur-[120px] sm:blur-[150px] orb-drift" />
      </div>

      <div className="relative z-10 w-full grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-8 xl:gap-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <span className="cyber-pill px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse shrink-0" />
              <span className="truncate">Live_Availability: {profile.status.replaceAll(" ", "_").toUpperCase()}</span>
            </span>
            <span className="cyber-pill px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
              <MapPin size={12} className="text-brand-cyan shrink-0" />
              <span className="truncate">{profile.location}</span>
            </span>
          </div>

          <h1
            className="font-semibold mb-4 sm:mb-6 leading-[0.98] tracking-tight text-balance"
            style={{ fontSize: "var(--text-hero)" }}
          >
            {profile.name.toUpperCase()}
            <br />
            <span className="text-zinc-300/85">{profile.role.toUpperCase()}</span>
          </h1>

          <p className="max-w-3xl text-zinc-300/90 mb-8 sm:mb-10 leading-relaxed" style={{ fontSize: "var(--text-lg)" }}>
            {profile.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/#archive"
              className="scanline px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-orange to-orange-400 text-black font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all group text-sm sm:text-base"
            >
              View_Project_Archive
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/Ajay_Resume.pdf"
              download
              className="px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-700 font-mono text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-zinc-900/60 transition-colors uppercase"
            >
              <Download size={18} /> Download_Resume
            </a>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <div className="neo-panel px-3 py-2.5 text-zinc-400">System_Status: OPTIMAL</div>
            <div className="neo-panel px-3 py-2.5 text-zinc-400">Experience_Level: ADVANCED</div>
            <div className="neo-panel px-3 py-2.5 text-zinc-400">Latency: 24MS</div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="neo-panel p-5 sm:p-6 lg:p-7 rounded-2xl scanline"
        >
          <p className="accent-rule text-[10px] mb-4">Live Telemetry</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-cyan/12 border border-brand-cyan/30 flex items-center justify-center shrink-0">
                <Cpu size={15} className="text-brand-cyan" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Core Focus</p>
                <p className="text-sm text-zinc-200">Scalable systems + AI-native product engineering</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/12 border border-brand-orange/30 flex items-center justify-center shrink-0">
                <Radar size={15} className="text-brand-orange" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Current Mission</p>
                <p className="text-sm text-zinc-200">Building tactile, high-performance software experiences</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-lime-300/12 border border-lime-300/30 flex items-center justify-center shrink-0">
                <Sparkles size={15} className="text-lime-300" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Design Lens</p>
                <p className="text-sm text-zinc-200">Readable, bold, and motion-aware UI architecture</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Hero;
