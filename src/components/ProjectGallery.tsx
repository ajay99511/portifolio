"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectGallery() {
  const allProjects = getAllProjects();

  return (
    <section className="min-h-screen pt-24 pb-16 px-6 md:px-24">
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/#archive"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest mb-12"
        >
          <ArrowLeft size={14} /> Back_To_Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> All_Projects
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Complete Archive</h1>
        <p className="text-zinc-500 text-sm font-mono mt-3 uppercase tracking-wider flex items-center gap-2">
          <Layers size={14} className="text-zinc-600" />
          {allProjects.length} {allProjects.length === 1 ? "project" : "projects"} in collection
        </p>
      </motion.div>

      {/* Projects Grid */}
      {allProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {allProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              showPinnedBadge
            />
          ))}
        </div>
      ) : (
        <div className="border border-zinc-800 bg-zinc-950/70 p-16 text-center">
          <Layers size={40} className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider mb-2">
            No projects yet
          </p>
          <p className="text-zinc-600 text-sm">
            Projects will appear here once added to the data configuration.
          </p>
        </div>
      )}
    </section>
  );
}
