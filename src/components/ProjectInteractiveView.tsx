"use client";

import Link from "next/link";
import { ExternalLink, ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { Project } from "@/types";
import ChronosPlannerDemo from "@/components/demos/ChronosPlannerDemo";
import DayVaultDemo from "@/components/demos/DayVaultDemo";
import FastBeatDemo from "@/components/demos/FastBeatDemo";
import PersonalAssistDemo from "@/components/demos/PersonalAssistDemo";
import DLAlgorithmsDemo from "@/components/demos/DLAlgorithmsDemo";
import RepoPulseDemo from "@/components/demos/RepoPulseDemo";
import ICMFraudDetectionDemo from "@/components/demos/ICMFraudDetectionDemo";

interface ProjectInteractiveViewProps {
  project: Project;
}

function renderDemo(project: Project) {
  if (project.demoKind === "chronos") {
    return <ChronosPlannerDemo />;
  }
  if (project.demoKind === "dayvault") {
    return <DayVaultDemo />;
  }
  if (project.demoKind === "fastbeat") {
    return <FastBeatDemo />;
  }
  if (project.demoKind === "personal-assist") {
    return <PersonalAssistDemo />;
  }
  if (project.demoKind === "dl-algorithms") {
    return <DLAlgorithmsDemo />;
  }
  if (project.demoKind === "repo-pulse") {
    return <RepoPulseDemo />;
  }
  if (project.demoKind === "icm-fraud-detection") {
    return <ICMFraudDetectionDemo />;
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
      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <Zap size={14} className="text-orange-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400 font-bold">
            Challenge
          </span>
        </div>
        <p className="text-sm text-zinc-300 leading-snug">{challenge}</p>

        <ArrowRight size={16} className="text-zinc-600 hidden md:block shrink-0 mx-2" />

        <div className="flex items-center gap-2 shrink-0 mt-2 md:mt-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400 font-bold">
            Solution
          </span>
        </div>
        <p className="text-sm text-zinc-300 leading-snug">{solution}</p>
      </div>
    </div>
  );
}

export default function ProjectInteractiveView({ project }: ProjectInteractiveViewProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="grid lg:grid-cols-[360px_1fr] min-h-[calc(100vh-80px)]">
        <aside className="border-r border-zinc-800 p-6 lg:p-8 flex flex-col gap-8 bg-[#080808]">
          <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={14} /> Back_To_Projects
          </Link>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">
              {project.batchId} {" // "} #{project.index}
            </p>
            <h1 className="text-3xl font-bold uppercase tracking-tight">{project.title}</h1>
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">{project.subtitle}</p>
            <p className="text-sm text-zinc-400 leading-relaxed">{project.longDescription}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Project Highlights</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="text-sm text-zinc-300 flex gap-2">
                  <span className="text-brand-orange">[+]</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 text-[10px] font-mono uppercase border border-zinc-800 text-zinc-400">
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
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <ExternalLink size={14} /> Open Source Repository
            </a>
          ) : null}
        </aside>

        <section className="p-4 lg:p-8 overflow-y-auto">
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

