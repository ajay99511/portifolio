"use client";

import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Project } from "@/types";

interface ProjectInteractiveViewProps {
  project: Project;
}

function DemoBootScreen() {
  return (
    <div className="h-[480px] sm:h-[560px] border border-zinc-800 rounded-lg p-6 sm:p-8 flex flex-col justify-center items-center text-center gap-4 text-zinc-400">
      <div className="w-12 h-12 rounded-full border border-brand-orange/40 border-t-brand-orange animate-spin" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-orange mb-2">
          Booting Interactive Artifact
        </p>
        <p className="text-sm text-zinc-400">Loading the selected project runtime...</p>
      </div>
    </div>
  );
}

function NoDemoConfigured() {
  return (
    <div className="h-[420px] border border-zinc-800 rounded-lg p-6 sm:p-8 text-zinc-400 font-mono text-xs uppercase tracking-widest flex items-center justify-center text-center">
      No interactive demo is configured for this project yet.
    </div>
  );
}

const ChronosPlannerDemo = dynamic(() => import("@/components/demos/ChronosPlannerDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const DayVaultDemo = dynamic(() => import("@/components/demos/DayVaultDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const FastBeatDemo = dynamic(() => import("@/components/demos/FastBeatDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const PersonalAssistDemo = dynamic(() => import("@/components/demos/PersonalAssistDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const DLAlgorithmsDemo = dynamic(() => import("@/components/demos/DLAlgorithmsDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const RepoPulseDemo = dynamic(() => import("@/components/demos/RepoPulseDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const ICMFraudDetectionDemo = dynamic(() => import("@/components/demos/ICMFraudDetectionDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const DbPredDemo = dynamic(() => import("@/components/demos/DbPredDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const SMPredDemo = dynamic(() => import("@/components/demos/SMPredDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const GitScripeDemo = dynamic(() => import("@/components/demos/GitScripeDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const MdExplorerDemo = dynamic(() => import("@/components/demos/MdExplorerDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});
const SocialNetworkDemo = dynamic(() => import("@/components/demos/SocialNetworkDemo"), {
  ssr: false,
  loading: DemoBootScreen,
});

const DEMO_COMPONENTS: Record<Project["demoKind"], ComponentType> = {
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
  generic: NoDemoConfigured,
};

function renderDemo(project: Project) {
  const DemoComponent = DEMO_COMPONENTS[project.demoKind] ?? NoDemoConfigured;
  return <DemoComponent />;
}

function ContextBanner({
  challenge,
  solution,
}: {
  challenge: string;
  solution: string;
}) {
  return (
    <div className="mb-4 rounded-xl border border-orange-500/20 overflow-hidden scanline">
      <div
        className="px-3 sm:px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 122, 24, 0.09) 0%, rgba(2, 10, 18, 0.7) 100%)",
        }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <Zap size={14} className="text-orange-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400 font-bold">
            Challenge
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-snug">{challenge}</p>

        <ArrowRight size={16} className="text-zinc-600 hidden md:block shrink-0 mx-2" />

        <div className="flex items-center gap-2 shrink-0 mt-2 md:mt-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-cyan font-bold">
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
      <div className="grid lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        <aside className="neo-panel border-b lg:border-b-0 lg:border-r">
          <div className="p-4 sm:p-6 lg:p-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest py-1"
            >
              <ArrowLeft size={14} /> Back_To_Projects
            </Link>

            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">
                {project.batchId} {" // "} #{project.index}
              </p>
              <h1 className="font-semibold uppercase tracking-tight" style={{ fontSize: "var(--text-3xl)" }}>
                {project.title}
              </h1>
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500">
                {project.subtitle}
              </p>
            </div>

            <button
              className="lg:hidden mt-4 w-full flex items-center justify-between py-2.5 px-3 border border-zinc-800 bg-zinc-900/40 rounded-md text-zinc-400 hover:text-white transition-colors"
              onClick={() => setDetailsOpen(!detailsOpen)}
              aria-expanded={detailsOpen}
              aria-controls="project-details-panel"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest">
                {detailsOpen ? "Hide" : "Show"} Project Details
              </span>
              {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          <div
            id="project-details-panel"
            className={`${detailsOpen ? "block" : "hidden"} lg:block px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 space-y-6 sm:space-y-8`}
          >
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
                  <span
                    key={tech}
                    className="px-2 py-1 text-[9px] sm:text-[10px] font-mono uppercase border border-zinc-800 text-zinc-400"
                  >
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

        <section className="p-3 sm:p-4 lg:p-8 overflow-y-auto">
          {project.contextBanner && (
            <ContextBanner
              challenge={project.contextBanner.challenge}
              solution={project.contextBanner.solution}
            />
          )}

          <div className="rounded-xl border border-white/8 bg-[#03070d]/85 p-2 sm:p-3">
            <div className="overflow-x-auto overscroll-x-contain hide-scrollbar">
              <div className="min-w-[560px] md:min-w-[700px] lg:min-w-0">{renderDemo(project)}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
