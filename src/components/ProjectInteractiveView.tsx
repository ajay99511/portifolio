"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowLeft, ArrowRight, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types";
import ChronosPlannerDemo from "@/components/demos/ChronosPlannerDemo";
import DayVaultDemo from "@/components/demos/DayVaultDemo";
import FastBeatDemo from "@/components/demos/FastBeatDemo";
import PersonalAssistDemo from "@/components/demos/PersonalAssistDemo";
import DLAlgorithmsDemo from "@/components/demos/DLAlgorithmsDemo";
import RepoPulseDemo from "@/components/demos/RepoPulseDemo";
import ICMFraudDetectionDemo from "@/components/demos/ICMFraudDetectionDemo";
import DbPredDemo from "@/components/demos/DbPredDemo";
import SMPredDemo from "@/components/demos/SMPredDemo";
import GitScripeDemo from "@/components/demos/GitScripeDemo";
import MdExplorerDemo from "@/components/demos/MdExplorerDemo";
import SocialNetworkDemo from "@/components/demos/SocialNetworkDemo";

interface ProjectInteractiveViewProps {
  project: Project;
}

const DEMO_COMPONENTS: Record<string, React.ElementType> = {
  chronos: ChronosPlannerDemo,
  dayvault: DayVaultDemo,
  fastbeat: FastBeatDemo,
  "personal-assist": PersonalAssistDemo,
  "dl-algorithms": DLAlgorithmsDemo,
  "repo-pulse": RepoPulseDemo,
  "icm-fraud-detection": ICMFraudDetectionDemo,
  "db-pred": DbPredDemo,
  "sm-pred": SMPredDemo,
  gitscripe: GitScripeDemo,
  "md-explorer": MdExplorerDemo,
  "social-network": SocialNetworkDemo,
};

function renderDemo(project: Project) {
  const DemoComponent = DEMO_COMPONENTS[project.demoKind];
  
  if (DemoComponent) {
    return <DemoComponent />;
  }
  
  return (
    <div className="h-full border border-zinc-800 rounded-lg p-6 text-zinc-400 font-mono text-xs uppercase tracking-widest">
      No interactive demo configured for this project.
    </div>
  );
}

function ContextBanner({ challenge, solution }: { challenge: string; solution: string }) {
  return (
    <div
      className="mb-4 rounded-lg border border-orange-500/20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)",
      }}
    >
      <div className="px-3 sm:px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <Zap size={14} className="text-orange-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400 font-bold">
            Challenge
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-snug">{challenge}</p>

        <ArrowRight size={16} className="text-zinc-600 hidden md:block shrink-0 mx-2" />

        <div className="flex items-center gap-2 shrink-0 mt-2 md:mt-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400 font-bold">
            Solution
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-snug">{solution}</p>
      </div>
    </div>
  );
}

export default function ProjectInteractiveView({ project }: ProjectInteractiveViewProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20">
      <div className="grid lg:grid-cols-[340px_1fr] xl:grid-cols-[360px_1fr] min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        {/* ── Aside: collapsible on mobile, fixed sidebar on desktop ── */}
        <aside className="border-b lg:border-b-0 lg:border-r border-zinc-800 bg-[#080808]">
          {/* Back + title — always visible */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest py-1">
              <ArrowLeft size={14} /> Back_To_Projects
            </Link>

            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">
                {project.batchId} {" // "} #{project.index}
              </p>
              <h1
                className="font-bold uppercase tracking-tight"
                style={{ fontSize: "var(--text-3xl)" }}
              >
                {project.title}
              </h1>
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500">{project.subtitle}</p>
            </div>

            {/* Mobile toggle for details */}
            <button
              className="lg:hidden mt-4 w-full flex items-center justify-between py-2.5 px-3 border border-zinc-800 bg-zinc-900/40 rounded-md text-zinc-400 hover:text-white transition-colors"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest">
                {detailsOpen ? "Hide" : "Show"} Project Details
              </span>
              {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Collapsible details on mobile, always visible on desktop */}
          <div className={`${detailsOpen ? "block" : "hidden"} lg:block px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 space-y-6 sm:space-y-8`}>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{project.longDescription}</p>

            <div className="space-y-2">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Project Highlights</h2>
              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="text-xs sm:text-sm text-zinc-300 flex gap-2">
                    <span className="text-brand-orange shrink-0">[+]</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Tech Stack</h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-[9px] sm:text-[10px] font-mono uppercase border border-zinc-800 text-zinc-400">
                    #{tech}
                  </span>
                ))}
              </div>
            </div>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-300 hover:text-white transition-colors py-1"
              >
                <ExternalLink size={14} /> Open Source Repository
              </a>
            ) : null}
          </div>
        </aside>

        {/* ── Demo section ── */}
        <section className="p-3 sm:p-4 lg:p-8 overflow-y-auto">
          {/* Context Banner */}
          {project.contextBanner && (
            <ContextBanner
              challenge={project.contextBanner.challenge}
              solution={project.contextBanner.solution}
            />
          )}

          {/* Demo */}
          {renderDemo(project)}
        </section>
      </div>
    </div>
  );
}
