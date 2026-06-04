"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Download, ShieldCheck, Cpu, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const releases = [
  {
    title: "DayVault",
    version: "v1.0.2-stable",
    description: "Secure, encrypted journal with biometric authentication. Built with Flutter and ObjectBox.",
    downloadPath: "/apks/DayVault.apk",
    stats: "22.7 MB // AES-256",
    features: ["Biometric Lock", "Offline First", "AES Encryption"]
  },
  {
    title: "FastBeat",
    version: "v1.1.0-release",
    description: "High-performance, ad-free media player. Built with Jetpack Compose and Media3 ExoPlayer.",
    downloadPath: "https://github.com/ajay99511/FastBeat/releases/latest/download/FastBeat.apk",
    stats: "28.4 MB // 60 FPS",
    features: ["Ad-Free", "Media3 Stack", "Material You"],
    privacyUrl: "/privacy/fastbeat"
  }
];

export default function AppReleases() {
  return (
    <section className="space-y-16 pt-20 border-t border-brand-neon/10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] uppercase">Handheld Nodes</h2>
          <p className="font-mono text-brand-neon uppercase tracking-[0.3em] text-sm flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Official Mobile Deployments
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-[11px] sm:text-xs text-brand-purple uppercase p-2 border border-brand-purple/30 bg-brand-purple/5 flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Verified Stable Releases
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-brand-neon/50 uppercase tracking-widest text-right">
            * Optimized for Android Environments Only
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {releases.map((app, i) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="interactive group relative border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 overflow-hidden cursor-none"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl group-hover:bg-brand-neon/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full gap-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] sm:text-xs text-brand-neon uppercase tracking-tighter bg-brand-neon/10 px-2 py-0.5 border border-brand-neon/20">
                    {app.version}
                  </span>
                  <h3 className="text-3xl font-light text-white uppercase mt-2 group-hover:text-brand-neon transition-colors">
                    {app.title}
                  </h3>
                </div>
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-white/5 rounded-full group-hover:border-brand-neon/40 group-hover:shadow-[0_0_15px_#00f0ff20] transition-all">
                   <Cpu className="w-5 h-5 text-brand-purple group-hover:text-brand-neon" />
                </div>
              </div>

              <p className="text-sm text-blue-200/60 font-light leading-relaxed">
                {app.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {app.features.map(f => (
                  <span key={f} className="text-[10px] sm:text-[11px] font-mono text-white/40 uppercase border border-white/5 px-2 py-1">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="font-mono text-[11px] sm:text-xs text-blue-200/40 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 text-brand-neon" />
                  {app.stats}
                </div>
                
                <a 
                  href={app.downloadPath}
                  download
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-brand-neon text-black font-mono text-xs uppercase font-bold hover:bg-white transition-all shadow-[0_0_20px_#00f0ff40] hover:shadow-[0_0_30px_#fff]"
                >
                  <Download className="w-4 h-4" />
                  Download_APK
                </a>
                {app.privacyUrl && (
                  <Link
                    href={app.privacyUrl}
                    target="_blank"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider border border-white/10 hover:border-brand-neon/40 text-blue-200/60 hover:text-brand-neon transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Privacy_Policy
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Link>
                )}
              </div>
            </div>

            {/* Aesthetic Corner Polish */}
            <div className="absolute bottom-0 left-0 w-1 h-12 bg-gradient-to-t from-brand-neon to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 h-1 w-12 bg-gradient-to-r from-brand-neon to-transparent opacity-30" />
          </motion.div>
        ))}
      </div>
      
      {/* Platform Disclaimer Banner */}
      <div className="bg-brand-neon/5 border border-brand-neon/20 p-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <div className="w-10 h-10 rounded-full bg-brand-neon/10 flex items-center justify-center border border-brand-neon/30">
          <Smartphone className="w-5 h-5 text-brand-neon" />
        </div>
        <div className="space-y-1">
          <p className="font-mono text-[11px] sm:text-xs text-white uppercase tracking-wider">Environment Compatibility Protocol</p>
          <p className="text-[10px] sm:text-[11px] text-blue-200/50 uppercase tracking-[0.2em]">These binaries are compiled specifically for Android systems. Sideloading requires &quot;Install from Unknown Sources&quot; permission.</p>
        </div>
      </div>
    </section>
  );
}
