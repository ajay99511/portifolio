"use client";

import Link from "next/link";
import { ArrowUpRight, Database, Globe } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 text-blue-100">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
             <div className="space-y-2">
               <h2 className="text-4xl md:text-5xl font-light text-white drop-shadow-[0_0_15px_rgba(112,0,255,0.4)]">Data Artifacts</h2>
               <p className="font-mono text-brand-purple uppercase tracking-[0.3em] text-sm">Classified Archive</p>
             </div>
             <div className="font-mono text-xs text-brand-neon uppercase p-2 border border-brand-neon/30 bg-brand-neon/5">
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
                      <span className="font-mono text-xs text-neon-muted group-hover:text-brand-neon transition-colors">ID_00{i + 1}</span>
                      <ArrowUpRight className="w-6 h-6 text-faded group-hover:text-brand-neon group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:tracking-wider transition-all duration-500 uppercase leading-[0.9] text-shadow-sm">{project.title}</h3>
                      <p className="text-sm text-muted font-light leading-relaxed line-clamp-3 group-hover:text-blue-100 transition-colors">{project.description}</p>
                    </div>
                 </div>

                 <div className="relative z-10 mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                       {project.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-purple border border-brand-purple/30 bg-brand-purple/10 px-2 py-1 group-hover:border-brand-purple transition-colors shadow-[0_0_10px_rgba(112,0,255,0)] group-hover:shadow-[0_0_10px_rgba(112,0,255,0.4)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-brand-neon/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-3 h-3 text-brand-neon" />
                        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neon-muted">Node Integrity: 100%</span>
                      </div>
                      <Globe className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
