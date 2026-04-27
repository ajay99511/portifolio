"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  Bolt,
  CalendarDays,
  FolderHeart,
  Lock,
  Pin,
  Play,
  PlayCircle,
  Music,
  MessageSquare,
  FolderKey,
  Cpu,
  TerminalSquare,
  Code2,
  Network,
} from "lucide-react";
import type { PreviewPanel, Project } from "@/types";

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
  TerminalSquare,
  Code2,
  Network,
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

interface ProjectCardProps {
  project: Project;
  index: number;
  showPinnedBadge?: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
  isInteractivePin?: boolean;
}

export default function ProjectCard({ 
  project, 
  index, 
  showPinnedBadge = false,
  isPinned = false,
  onTogglePin,
  isInteractivePin = false
}: ProjectCardProps) {
  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-zinc-800 bg-zinc-950/70 p-6 flex flex-col gap-6 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
            {project.batchId} {" // "} #{project.index}
          </span>
          {isInteractivePin ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                onTogglePin?.();
              }}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-300",
                isPinned
                  ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange hover:bg-brand-orange/20"
                  : "bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              )}
              title={isPinned ? "Unpin project" : "Pin project (max 4)"}
            >
              <Pin size={10} className={isPinned ? "fill-brand-orange text-brand-orange" : ""} />
              <span className="font-mono text-[9px] uppercase tracking-wider">
                {isPinned ? "Pinned" : "Pin"}
              </span>
            </button>
          ) : showPinnedBadge && isPinned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
              <Pin size={10} className="text-brand-orange" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-orange">Pinned</span>
            </span>
          )}
        </div>
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
  );
}
