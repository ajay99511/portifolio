"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { usePinnedProjects } from "@/hooks/usePinnedProjects";

const ProjectArchive = () => {
  const { pinnedIds, togglePin, isMounted, isPinned } = usePinnedProjects();
  const totalCount = projects.length;
  
  // For SSR, respect the pinned flag. On client, use pinnedIds.
  const displayProjects = isMounted 
    ? projects.filter(p => pinnedIds.includes(p.id))
    : projects.some(p => p.pinned) 
      ? projects.filter(p => p.pinned).slice(0, 4)
      : projects.slice(0, 4);

  const hasPinned = displayProjects.length > 0;

  return (
    <section id="archive" className="py-16 sm:py-20 lg:py-24 section-px">
      <div className="mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[1px] bg-brand-orange" /> Pinned_Works
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter">Featured Projects</h3>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono mt-2 uppercase tracking-wider">
            {displayProjects.length} of {totalCount} projects
          </p>
        </div>
      </div>

      {hasPinned ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {displayProjects.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx} 
              isPinned={isMounted ? isPinned(project.id) : true}
              onTogglePin={() => togglePin(project.id)}
              isInteractivePin={true}
            />
          ))}
        </div>
      ) : (
        <div className="border border-zinc-800 bg-zinc-950/70 p-8 sm:p-12 text-center">
          <Layers size={32} className="text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider mb-2">
            No pinned projects yet
          </p>
          <p className="text-zinc-600 text-sm">
            Pin projects in the data configuration to feature them here.
          </p>
        </div>
      )}

      {/* Explore All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 sm:mt-12 flex justify-center"
      >
        <Link
          href="/projects"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-800 bg-zinc-950/50 hover:border-brand-orange/40 hover:bg-zinc-900/60 transition-all duration-300"
        >
          <Layers size={16} className="text-zinc-500 group-hover:text-brand-orange transition-colors" />
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
            Explore All {totalCount} Projects
          </span>
          <ArrowRight size={16} className="text-zinc-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectArchive;
