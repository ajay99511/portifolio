"use client";

import { motion } from "framer-motion";
import { ChevronRight, FileText, MapPin, Cpu, Sparkles, Radar, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { FEATURES } from "@/lib/features";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center section-px overflow-hidden pt-24 pb-16 sm:pb-20 grid-overlay">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[14%] -left-8 w-56 sm:w-80 h-56 sm:h-80 bg-brand-neon/20 rounded-full blur-[110px] sm:blur-[140px] orb-drift" />
        <div className="absolute bottom-[8%] right-[6%] w-64 sm:w-96 h-64 sm:h-96 bg-brand-orange/28 rounded-full blur-[120px] sm:blur-[150px] orb-drift" />
        <div className="absolute top-[55%] right-[30%] w-48 sm:w-72 h-48 sm:h-72 bg-brand-purple/15 rounded-full blur-[100px] sm:blur-[130px] orb-drift" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Floating terminal label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute top-20 right-8 sm:right-16 hidden lg:block"
      >
        <span className="font-mono text-[10px] text-brand-neon/40 uppercase tracking-[0.2em]">
          {'// SYSTEM_READY'}
        </span>
      </motion.div>

      <div className="relative z-10 w-full grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] gap-8 xl:gap-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <span className="cyber-pill px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse shrink-0" />
              <span className="truncate">Live_Availability: {profile.status.replaceAll(" ", "_").toUpperCase()}</span>
            </span>
            <span className="cyber-pill px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-300">
              <MapPin size={12} className="text-brand-neon shrink-0" />
              <span className="truncate">{profile.location}</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glitch-hover font-semibold mb-4 sm:mb-6 leading-[0.98] tracking-tight text-balance"
            style={{ fontSize: "var(--text-hero)" }}
            data-text={`${profile.name.toUpperCase()} ${profile.role.toUpperCase()}`}
          >
            {profile.name.toUpperCase()}
            <br />
            <span className="text-zinc-300/85">{profile.role.toUpperCase()}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl text-zinc-300/90 mb-8 sm:mb-10 leading-relaxed"
            style={{ fontSize: "var(--text-lg)" }}
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/#archive"
              className="interactive scanline px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-orange to-orange-400 text-black font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all group text-sm sm:text-base"
            >
              View_Project_Archive
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            {FEATURES.enableResume && (
              <Link
                href="/preview/resume"
                className="interactive px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-700 font-mono text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-zinc-900/60 hover:border-brand-neon/30 transition-colors uppercase"
              >
                <FileText size={18} /> Preview_Resume
              </Link>
            )}
            <Link
              href="/certifications"
              className="interactive px-6 sm:px-8 py-3.5 sm:py-4 border border-brand-neon/35 text-brand-neon font-mono text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-brand-neon/10 transition-colors uppercase"
            >
              <BadgeCheck size={18} /> View_Certifications
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 font-mono text-[10px] uppercase tracking-[0.14em]"
          >
            <div className="neo-panel px-3 py-2.5 text-zinc-400">System_Status: OPTIMAL</div>
            <div className="neo-panel px-3 py-2.5 text-zinc-400">Experience_Level: ADVANCED</div>
            <div className="neo-panel px-3 py-2.5 text-zinc-400">Latency: 24MS</div>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="neo-panel p-5 sm:p-6 lg:p-7 rounded-2xl scanline"
        >
          <p className="accent-rule text-[10px] mb-4">Live Telemetry</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-neon/12 border border-brand-neon/30 flex items-center justify-center shrink-0">
                <Cpu size={15} className="text-brand-neon" />
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
              <div className="w-8 h-8 rounded-lg bg-brand-purple/12 border border-brand-purple/30 flex items-center justify-center shrink-0">
                <Sparkles size={15} className="text-brand-purple" />
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
