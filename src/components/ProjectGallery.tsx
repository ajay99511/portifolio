"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { usePinnedProjects } from "@/hooks/usePinnedProjects";

export default function ProjectGallery() {
  const allProjects = projects;
  const { togglePin, isMounted, isPinned } = usePinnedProjects();

  return (
    <section className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 section-px">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/#archive"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest mb-8 sm:mb-12 py-2"
        >
          <ArrowLeft size={14} /> Back_To_Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 sm:mb-16"
      >
        <p className="accent-rule text-[10px] sm:text-xs mb-3">All Projects</p>
        <h1 className="font-semibold uppercase tracking-tight" style={{ fontSize: "var(--text-3xl)" }}>
          Complete Archive
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm font-mono mt-3 uppercase tracking-wider flex items-center gap-2">
          <Layers size={14} className="text-zinc-600" />
          {allProjects.length} {allProjects.length === 1 ? "project" : "projects"} in collection
        </p>
      </motion.div>

      {allProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {allProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isPinned={isMounted ? isPinned(project.id) : project.pinned}
              onTogglePin={() => togglePin(project.id)}
              isInteractivePin={true}
            />
          ))}
        </div>
      ) : (
        <div className="neo-panel p-10 sm:p-16 text-center rounded-xl">
          <Layers size={40} className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider mb-2">No projects yet</p>
          <p className="text-zinc-600 text-sm">Projects will appear here once added to the data configuration.</p>
        </div>
      )}
    </section>
  );
}
