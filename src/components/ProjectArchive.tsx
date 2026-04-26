"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { getPinnedProjects, projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const ProjectArchive = () => {
  const pinnedProjects = getPinnedProjects();
  const totalCount = projects.length;
  const hasPinned = pinnedProjects.length > 0;

  return (
    <section id="archive" className="py-24 px-6 md:px-24">
      <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[1px] bg-brand-orange" /> Pinned_Works
          </h2>
          <h3 className="text-4xl font-bold uppercase tracking-tighter">Featured Projects</h3>
          <p className="text-zinc-500 text-sm font-mono mt-2 uppercase tracking-wider">
            {pinnedProjects.length} of {totalCount} projects
          </p>
        </div>
      </div>

      {hasPinned ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pinnedProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      ) : (
        <div className="border border-zinc-800 bg-zinc-950/70 p-12 text-center">
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
        className="mt-12 flex justify-center"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 px-8 py-4 border border-zinc-800 bg-zinc-950/50 hover:border-brand-orange/40 hover:bg-zinc-900/60 transition-all duration-300"
        >
          <Layers size={16} className="text-zinc-500 group-hover:text-brand-orange transition-colors" />
          <span className="font-mono text-sm uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
            Explore All {totalCount} Projects
          </span>
          <ArrowRight size={16} className="text-zinc-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectArchive;
