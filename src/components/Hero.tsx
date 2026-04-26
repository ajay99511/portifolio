"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/profile";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden pt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-[128px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 font-mono text-xs uppercase tracking-tighter">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live_Availability: {profile.status.replaceAll(" ", "_").toUpperCase()}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 font-mono text-xs uppercase tracking-tighter">
            <MapPin size={12} className="text-zinc-500" />
            {profile.location}
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
          {profile.name.toUpperCase()} <br />
          <span className="text-zinc-500">{profile.role.toUpperCase()}</span>
        </h1>

        <p className="max-w-2xl text-xl text-zinc-400 mb-10 leading-relaxed">
          {profile.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#archive"
            className="px-8 py-4 bg-brand-orange text-black font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors group"
          >
            View_Project_Archive <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="/Ajay_Resume.docx"
            download
            className="px-8 py-4 border border-zinc-800 font-mono text-sm flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors uppercase"
          >
            <Download size={18} /> Download_Resume
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-6 md:left-24 font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em] flex gap-12">
        <div>System_Status: OPTIMAL</div>
        <div>Engine_Ver: 4.2.0-STABLE</div>
        <div>Latency: 24MS</div>
      </div>
    </section>
  );
};

export default Hero;
