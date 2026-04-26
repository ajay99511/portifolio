"use client";

import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Project } from "@/types";
import ChronosPlannerDemo from "@/components/demos/ChronosPlannerDemo";
import DayVaultDemo from "@/components/demos/DayVaultDemo";

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
  return (
    <div className="h-full border border-zinc-800 rounded-lg p-6 text-zinc-400 font-mono text-xs uppercase tracking-widest">
      No interactive demo configured for this project.
    </div>
  );
}

export default function ProjectInteractiveView({ project }: ProjectInteractiveViewProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="grid lg:grid-cols-[360px_1fr] min-h-[calc(100vh-80px)]">
        <aside className="border-r border-zinc-800 p-6 lg:p-8 flex flex-col gap-8 bg-[#080808]">
          <Link href="/#archive" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={14} /> Back_To_Archive
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

        <section className="p-4 lg:p-8 overflow-y-auto">{renderDemo(project)}</section>
      </div>
    </div>
  );
}
