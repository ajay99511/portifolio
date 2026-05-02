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
  Microscope,
  BrainCircuit,
  Server,
  Activity,
  ShieldCheck,
  Database,
  LayoutGrid,
  FolderPlus,
  Settings,
  Layout,
  Droplets,
  TrendingUp,
  Search,
  Folder,
  Book,
  Users,
  Shield,
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
  Microscope,
  BrainCircuit,
  Server,
  Activity,
  ShieldCheck,
  Database,
  LayoutGrid,
  FolderPlus,
  Settings,
  Layout,
  Droplets,
  TrendingUp,
  Search,
  Folder,
  Book,
  Users,
  Shield,
};

function DemoPreviewStrip({ panels }: { panels: PreviewPanel[] }) {
  return (
    <div className="grid grid-cols-2 sm:flex gap-2 mt-4">
      {panels.map((panel) => {
        const Icon = iconMap[panel.iconName] ?? CalendarDays;
        return (
          <div
            key={panel.label}
            className="sm:flex-1 border border-zinc-800 bg-zinc-900/40 rounded-md p-2.5 sm:p-3 flex flex-col items-center gap-1.5 sm:gap-2 group-hover:border-zinc-700 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-zinc-800/80 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
              <Icon size={13} className="text-zinc-500 group-hover:text-brand-orange transition-colors sm:[&]:w-[14px] sm:[&]:h-[14px]" />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors text-center leading-tight">
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
      className="border border-zinc-800 bg-zinc-950/70 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 tracking-widest uppercase truncate">
            {project.batchId} {" // "} #{project.index}
          </span>
          {isInteractivePin ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                onTogglePin?.();
              }}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-300 shrink-0",
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
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 shrink-0">
              <Pin size={10} className="text-brand-orange" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-orange">Pinned</span>
            </span>
          )}
        </div>
        <ArrowUpRight className="text-zinc-500 group-hover:text-brand-orange transition-colors shrink-0" size={18} />
      </div>

      <div className="space-y-2">
        <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">{project.title}</h4>
        <p className="text-xs sm:text-sm text-brand-orange font-mono uppercase tracking-wider">{project.subtitle}</p>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* Preview Strip */}
      {project.previewPanels && project.previewPanels.length > 0 && (
        <DemoPreviewStrip panels={project.previewPanels} />
      )}

      {/* Tech tags — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mb-1">
        {project.techStack.slice(0, 5).map((tag) => (
          <span key={tag} className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase border border-zinc-800 px-2 py-1 whitespace-nowrap shrink-0">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 bg-brand-orange text-black font-bold uppercase text-[11px] sm:text-xs tracking-widest px-4 py-2.5 sm:py-3 hover:bg-orange-500 transition-colors"
        >
          <Play size={14} /> Try Now
        </Link>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            Source
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
