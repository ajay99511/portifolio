"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, experiences, skills } from '@/lib/projects.data';
import { projects } from '@/lib/projects';
import Link from 'next/link';
import { ArrowUpRight, Database, FileText, Globe, Hexagon, Terminal } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import { useTheme } from 'next-themes';
import AppReleases from '@/components/AppReleases';

function HolographicOrb({ delay, color, size, top, left }: { delay: number, color: string, size: number, top: string, left: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mixBlend = mounted && theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen';

  return (
    <motion.div
      className={`absolute rounded-full ${mixBlend} pointer-events-none`}
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        boxShadow: `0 0 ${size}px ${color}`
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
}

const SkillNode = ({ item, index }: { key?: React.Key, item: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.1, y: -5, zIndex: 10 }}
    className="interactive relative group cursor-none"
  >
    <div className="absolute inset-0 bg-brand-neon/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative border border-brand-neon/30 bg-surface-raised/80 backdrop-blur-md text-brand-neon px-4 py-2 rounded-full font-mono text-sm uppercase tracking-wider halo-glow glitch-hover flex items-center gap-2">
      <Hexagon className="w-3 h-3 text-brand-purple" />
      {item}
    </div>
  </motion.div>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-surface-bg text-blue-100 font-sans overflow-x-hidden">
      <CustomCursor />

      {/* Holographic Orbs Field */}
      {/* overflow-hidden is intentional: clips orbs positioned at left:80% and left:-10% to prevent horizontal overflow (Req 9.1) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <HolographicOrb delay={0} color="#00f0ff" size={400} top="-10%" left="80%" />
        <HolographicOrb delay={2} color="#7000ff" size={600} top="40%" left="-10%" />
        <HolographicOrb delay={4} color="#ff3300" size={300} top="80%" left="60%" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-32 space-y-16 md:space-y-28 lg:space-y-40">
        
        {/* HERO NEURAL INTERFACE */}
        <section className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div style={{ y: y1 }} className="space-y-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-4 border border-brand-neon/40 bg-brand-neon/5 px-4 py-2 rounded-none backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]" />
              <span className="font-mono text-xs sm:text-sm text-brand-neon uppercase tracking-[0.4em]">{profile.status} {" // "} {profile.location}</span>
              <span className="font-mono text-[11px] sm:text-[13px] text-brand-neon uppercase tracking-[0.4em]">{profile.status} {" // "} {profile.location}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[9rem] text-balance font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-gradient-mid to-brand-purple tracking-tighter leading-[0.8] uppercase"
            >
              {profile.name}
              <br />
              <span className="text-white font-display font-light italic opacity-90 drop-shadow-[0_0_30px_rgba(112,0,255,0.8)] hover:text-brand-neon transition-colors duration-300">{profile.role.split(' ').slice(0, 2).join(' ')}</span>
            </motion.h1>

            <motion.p 
              style={{ opacity: opacityText }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-2xl text-[15px] sm:text-[17px] md:text-xl text-blue-200/60 font-light leading-relaxed font-mono mb-8"
            >
               {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/preview/resume"
                className="interactive group relative px-8 py-4 bg-brand-neon/10 border border-brand-neon/40 hover:bg-brand-neon/20 hover:border-brand-neon transition-all duration-300 flex items-center gap-3 cursor-none"
              >
                <div className="absolute inset-0 bg-brand-neon/5 blur-xl group-hover:bg-brand-neon/10 transition-colors" />
                <FileText className="w-5 h-5 text-brand-neon" />
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-white group-hover:text-brand-neon">Preview_Resume</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Aesthetic HUD Overlay */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-40 font-mono text-xs sm:text-[13px] text-brand-neon tracking-widest text-right">
            <div className="border-r border-brand-neon pr-4">CAPACITY<br/>[99.9%]</div>
            <div className="border-r border-brand-neon pr-4">NEURAL_NET<br/>[SYNCED]</div>
            <div className="border-r border-brand-neon pr-4">FRAME_RATE<br/>[UNLIMITED]</div>
          </div>
        </section>

        {/* SKILLS CONSTELLATION */}
        <section className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-20"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Cognitive Loadout</h2>
              <p className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[13px]">Compiled Capabilities</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-4xl mx-auto">
              {skills.flatMap((s: any) => s.items).map((item: string, i: number) => (
                <SkillNode key={item} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* TIMELINE / PROTOCOLS */}
        <section className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
             <div className="space-y-2">
               <h2 className="text-4xl md:text-5xl font-light text-white">Execution Protocols</h2>
               <p className="font-mono text-brand-neon uppercase tracking-widest text-[11px] sm:text-xs">Temporal History</p>
             </div>
             <div className="space-y-16 border-l border-brand-purple/30 pl-4 sm:pl-8 relative">
               {experiences.map((exp: any, i: number) => (
                 <motion.div 
                   key={exp.company}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2 }}
                   className="relative group interactive cursor-none"
                 >
                   <div className="absolute -left-[calc(1rem+8px)] sm:-left-[calc(2rem+8px)] top-2 w-4 h-4 bg-surface-bg border-2 border-brand-purple rounded-full group-hover:bg-brand-neon group-hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300 z-10" />
                   <div className="space-y-4">
                     <span className="font-mono text-brand-neon text-[13px]">{exp.period}</span>
                     <div>
                       <h3 className="text-2xl font-medium text-white group-hover:text-brand-neon transition-colors duration-300">{exp.role}</h3>
                       <p className="text-brand-purple font-mono text-[13px] uppercase tracking-widest">{exp.company}</p>
                     </div>
                     {exp.description && <p className="text-blue-200/60 font-light">{exp.description}</p>}
                     {exp.highlights && exp.highlights.length > 0 && (
                       <ul className="list-disc list-outside ml-4 space-y-2 text-[13px] text-blue-200/60 font-light marker:text-brand-neon/50">
                         {exp.highlights.map((item: string, idx: number) => (
                           <li key={idx} className="pl-1 leading-relaxed">{item}</li>
                         ))}
                       </ul>
                     )}
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
          
          <div className="relative hidden lg:block">
            <motion.div style={{ y: y2 }} className="sticky top-40 h-[600px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-3xl p-8 overflow-hidden">
               <Terminal className="w-8 h-8 text-brand-purple mb-8 opacity-50" />
               <div className="font-mono text-[11px] sm:text-[13px] text-brand-neon/70 space-y-2">
                 <p className="opacity-50">{`> initializing sub-routines...`}</p>
                 <p className="opacity-50">{`> loading structural integrity...`}</p>
                 <motion.div
                   animate={{ opacity: [1, 0] }}
                   transition={{ repeat: Infinity, duration: 1 }}
                   className="w-2 h-4 bg-brand-neon inline-block mt-4"
                 />
               </div>
               
               {/* Decorative Abstract Graph */}
               <svg className="absolute bottom-0 right-0 w-full h-[50%] opacity-20 pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
                 <motion.path 
                   d="M0,50 L10,30 L20,40 L30,20 L40,35 L50,10 L60,25 L70,5 L80,15 L90,0 L100,20 L100,50 Z" 
                   fill="rgba(0, 240, 255, 0.2)"
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 2 }}
                 />
                 <motion.path 
                   d="M0,50 L10,30 L20,40 L30,20 L40,35 L50,10 L60,25 L70,5 L80,15 L90,0 L100,20" 
                   fill="none"
                   stroke="#00f0ff"
                   strokeWidth="0.5"
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 2 }}
                 />
               </svg>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS: SECURE VAULT */}
        <section className="space-y-16 pt-20 border-t border-brand-neon/10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
             <div className="space-y-2">
               <h2 className="text-4xl md:text-5xl font-light text-white drop-shadow-[0_0_15px_rgba(112,0,255,0.4)]">Data Artifacts</h2>
               <p className="font-mono text-brand-purple uppercase tracking-[0.3em] text-[13px]">Classified Archive</p>
             </div>
             <div className="font-mono text-[11px] sm:text-[13px] text-brand-neon uppercase p-2 border border-brand-neon/30 bg-brand-neon/5">
                Auth Level: Omega
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any, i: number) => (
              <Link 
                key={project.id}
                href={`/projects/${project.id}`}
                className="interactive group relative min-h-[320px] h-auto border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden flex flex-col p-8 transition-all hover:border-brand-neon/50 cursor-none"
              >
                 {/* Hover Glow */}
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/0 to-brand-purple/0 group-hover:from-brand-neon/10 group-hover:to-brand-purple/10 transition-colors duration-500" />
                 
                 <div className="relative z-10 flex-1 flex flex-col gap-8">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[11px] sm:text-xs text-brand-neon/60 group-hover:text-brand-neon transition-colors">ID_00{i + 1}</span>
                      <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-brand-neon group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:tracking-wider transition-all duration-500 uppercase leading-[0.9] text-shadow-sm">{project.title}</h3>
                      <p className="text-[14px] text-blue-200/60 font-light leading-relaxed line-clamp-3 group-hover:text-blue-100 transition-colors">{project.description}</p>
                    </div>
                 </div>

                 <div className="relative z-10 mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                       {project.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[11px] sm:text-[12px] font-mono uppercase tracking-widest text-brand-purple border border-brand-purple/30 bg-brand-purple/10 px-2 py-1 group-hover:border-brand-purple transition-colors shadow-[0_0_10px_rgba(112,0,255,0)] group-hover:shadow-[0_0_10px_rgba(112,0,255,0.4)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-brand-neon/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-3 h-3 text-brand-neon" />
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-neon/60">Node Integrity: 100%</span>
                      </div>
                      <Globe className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        </section>

        <AppReleases />

        <footer className="pt-20 md:pt-40 pb-10 border-t border-brand-neon/10 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px] sm:text-xs text-brand-neon/50 uppercase tracking-widest">
           <div>&copy; {new Date().getFullYear()} {profile.name} {" // "} {profile.role.replace(/ /g, '_')} {" // "} SYSTEM ONLINE</div>
           <div className="flex gap-4">
             <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors cursor-none interactive">GitHub</a>
             <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors cursor-none interactive">LinkedIn</a>
           </div>
        </footer>

      </div>
    </div>
  );
}
