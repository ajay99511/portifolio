"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bolt,
  CalendarDays,
  FolderHeart,
  Lock,
  Play,
  PlayCircle,
  Music,
  MessageSquare,
  FolderKey,
  Cpu,
} from "lucide-react";
import { projects } from "@/lib/projects";
import type { PreviewPanel } from "@/types";

const iconMap: Record<string, typeof CalendarDays> = {
  CalendarDays,
  BarChart3,
  Bolt,
  Lock,
  FolderHeart,
  PlayCircle,
  Music,
  MessageSquare,
  FolderKey,
  Cpu,
};

function DemoPreviewStrip({ panels }: { panels: PreviewPanel[] }) {
  return (
    <div className="flex gap-2 mt-4">
      {panels.map((panel) => {
        const Icon = iconMap[panel.iconName] ?? CalendarDays;
        return (
          <div
            key={panel.label}
            className="flex-1 border border-zinc-800 bg-zinc-900/40 rounded-md p-3 flex flex-col items-center gap-2 group-hover:border-zinc-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
              <Icon size={14} className="text-zinc-500 group-hover:text-brand-orange transition-colors" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
              {panel.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const ProjectArchive = () => {
  return (
    <section id="archive" className="py-24 px-6 md:px-24">
      <div className="mb-16">
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> Master_Archive
        </h2>
        <h3 className="text-4xl font-bold uppercase tracking-tighter">Curated Artifacts</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="border border-zinc-800 bg-zinc-950/70 p-6 flex flex-col gap-6 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                {project.batchId} {" // "} #{project.index}
              </span>
              <ArrowUpRight className="text-zinc-500 group-hover:text-brand-orange transition-colors" size={18} />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold uppercase tracking-tight">{project.title}</h4>
              <p className="text-sm text-brand-orange font-mono uppercase tracking-wider">{project.subtitle}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Preview Strip */}
            {project.previewPanels && project.previewPanels.length > 0 && (
              <DemoPreviewStrip panels={project.previewPanels} />
            )}

            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 5).map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-zinc-500 uppercase border border-zinc-800 px-2 py-1">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 bg-brand-orange text-black font-bold uppercase text-xs tracking-widest px-4 py-3 hover:bg-orange-500 transition-colors"
              >
                <Play size={14} /> Try Now
              </Link>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Source
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectArchive;

