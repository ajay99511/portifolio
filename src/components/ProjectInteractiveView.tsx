"use client";

import Link from 'next/link';
import { ChevronLeft, GitBranch, Terminal, ExternalLink, Hexagon } from 'lucide-react';
import WalkthroughViewer from '@/components/walkthrough/WalkthroughViewer';
import CustomCursor from '@/components/CustomCursor';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ProjectInteractiveViewProps {
  project: any;
}

export default function ProjectInteractiveView({ project }: ProjectInteractiveViewProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!project) return null;

  const mixBlend = mounted && theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen';

  return (
    <div className="relative max-w-[1600px] mx-auto px-6 min-h-screen flex flex-col py-6 bg-surface-bg text-blue-100 font-sans overflow-hidden transition-colors duration-300">
      <CustomCursor />
      
      {/* Background Orbs — overflow-hidden is intentional: prevents absolutely-positioned orbs from causing horizontal overflow (Requirement 9.2) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute rounded-full ${mixBlend} opacity-20 w-[500px] h-[500px] top-[-10%] left-[-10%]`} style={{ background: 'radial-gradient(circle, #7000ff 0%, transparent 70%)', boxShadow: '0 0 100px #7000ff' }} />
        <div className={`absolute rounded-full ${mixBlend} opacity-20 w-[400px] h-[400px] bottom-[-10%] right-[-10%]`} style={{ background: 'radial-gradient(circle, #00f0ff 0%, transparent 70%)', boxShadow: '0 0 100px #00f0ff' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Dynamic Header */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between pb-8 gap-6 shrink-0 border-b border-brand-neon/10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Link href="/" className="interactive w-10 h-10 rounded-sm bg-brand-neon/5 border border-brand-neon/30 flex items-center justify-center hover:bg-brand-neon/20 hover:shadow-[0_0_15px_#00f0ff] transition-all cursor-none">
               <ChevronLeft className="w-5 h-5 text-brand-neon" />
             </Link>
             <div className="h-6 w-px bg-brand-neon/30" />
             <div className="flex items-center gap-2 px-3 py-1 bg-brand-purple/10 border border-brand-purple/30 rounded-full shadow-[0_0_10px_rgba(112,0,255,0.2)]">
                <Hexagon className="w-4 h-4 text-brand-purple" />
                <span className="font-mono text-[11px] sm:text-xs font-bold text-brand-purple uppercase tracking-widest">Sandbox Protocol_Active</span>
             </div>
          </div>
          
          <div className="space-y-1">
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white uppercase tracking-tight leading-none text-shadow-sm drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
               {project.title} <span className="text-neon-muted text-2xl font-mono">/ BATCH_0{project.index}</span>
             </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="interactive flex items-center gap-2 px-4 py-2 border border-brand-neon/30 rounded-sm text-[11px] sm:text-xs font-bold text-brand-neon uppercase tracking-widest hover:bg-brand-neon/20 hover:shadow-[0_0_15px_#00f0ff] transition-all cursor-none"
          >
            <GitBranch className="h-3.5 w-3.5" />
            Repository
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="interactive flex items-center gap-2 px-4 py-2 bg-brand-neon/10 border border-brand-neon text-brand-neon rounded-sm text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-brand-neon hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-none"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Output
            </a>
          )}
        </div>
      </header>

      {/* Main Split View: Technical Docs + Interactive Canvas */}
      <section className="relative z-10 flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 gap-8 pt-8">
         {/* Sidebar: Technical Briefing */}
         <aside className="lg:col-span-3 space-y-12 overflow-y-auto pr-4 hide-scrollbar">
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-brand-neon/60 uppercase tracking-widest font-bold">Protocol_Brief</h3>
              {project.contextBanner && (
                 <div className="bg-brand-purple/10 border-l-2 border-brand-purple p-3 mb-6">
                    <p className="text-xs text-brand-purple font-mono uppercase tracking-widest mb-1 shadow-[0_0_10px_rgba(112,0,255,0.1)]">Challenge</p>
                    <p className="text-sm text-blue-200/80 italic leading-relaxed mb-4">{project.contextBanner.challenge}</p>
                    <p className="text-xs text-brand-neon font-mono uppercase tracking-widest mb-1 shadow-[0_0_10px_rgba(0,240,255,0.1)]">Solution</p>
                    <p className="text-sm text-blue-200/80 leading-relaxed">{project.contextBanner.solution}</p>
                 </div>
              )}
              <p className="text-sm font-light text-blue-200/70 leading-relaxed italic">
                "{project.fullDescription}"
              </p>
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-6 space-y-2 text-sm text-muted font-light marker:text-neon-muted">
                  {project.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="pl-1 leading-relaxed">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>

            {project.previewPanels && project.previewPanels.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[11px] sm:text-xs font-mono text-brand-neon/60 uppercase tracking-widest font-bold">Key_Modules</h3>
                <div className="flex flex-wrap gap-2">
                  {project.previewPanels.map((panel: any) => (
                    <span key={panel.label} className="px-3 py-1.5 bg-brand-neon/5 border border-brand-neon/20 rounded-sm text-xs font-mono text-brand-neon uppercase tracking-widest flex items-center justify-center text-center">
                      {panel.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-[11px] sm:text-xs font-mono text-brand-neon/60 uppercase tracking-widest font-bold">Loadout_Specs</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-brand-purple/5 border border-brand-purple/20 rounded-sm text-[11px] sm:text-xs font-mono text-brand-purple uppercase tracking-widest shadow-[0_0_10px_rgba(112,0,255,0.1)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface-raised border border-brand-neon/20 rounded-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-brand-neon animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs text-brand-neon uppercase font-bold tracking-widest">Sys_Diagnostics</span>
              </div>
              <div className="space-y-3 text-[11px] sm:text-xs font-mono text-brand-neon/60 uppercase tracking-widest">
                <div className="flex justify-between"><span>Node_Count:</span><span className="text-brand-neon">{project.stats?.nodes || project.steps?.length || project.demoState?.nodes || 0}</span></div>
                <div className="flex justify-between"><span>Fidelity:</span><span className="text-brand-purple">{project.stats?.complexity || 'Quantum'}</span></div>
                <div className="flex justify-between"><span>Matrix_State:</span><span className="text-green-400">STABLE</span></div>
              </div>
            </div>
         </aside>

         {/* Main stage: Walkthrough Canvas */}
         <main className="lg:col-span-9 flex flex-col h-full bg-black/40 backdrop-blur-xl border border-brand-neon/20 rounded-md overflow-hidden relative shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <WalkthroughViewer project={project} />
         </main>
      </section>
    </div>
  );
}
