"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "e-commerce-engine",
    batchId: "BATCH_01",
    index: "01",
    title: "E-Commerce Core",
    description: "High-performance headless commerce engine with real-time inventory synchronization.",
    tags: ["Next.js", "Redis", "PostgreSQL"],
  },
  {
    id: "analytics-dashboard",
    batchId: "BATCH_01",
    index: "02",
    title: "System Analytics",
    description: "Real-time telemetry and monitoring dashboard for distributed microservices.",
    tags: ["React", "D3.js", "WebSockets"],
  },
  {
    id: "blockchain-explorer",
    batchId: "BATCH_02",
    index: "03",
    title: "Chain Protocol",
    description: "Multi-chain block explorer with advanced smart contract analysis tools.",
    tags: ["TypeScript", "GraphQL", "Rust"],
  }
];

const ProjectArchive = () => {
  return (
    <section id="archive" className="py-24 px-6 md:px-24">
      <div className="mb-16">
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> Master_Archive
        </h2>
        <h3 className="text-4xl font-bold uppercase tracking-tighter">Curated Artifacts</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/projects/${project.id}`} className="group block">
              <div className="relative aspect-video bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between overflow-hidden group-hover:border-brand-orange/50 transition-colors">
                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                
                <div className="flex justify-between items-start z-10">
                  <span className="font-mono text-[10px] text-zinc-600 tracking-widest group-hover:text-brand-orange transition-colors">
                    {project.batchId} {" // "} #{project.index}
                  </span>
                  <ArrowUpRight className="text-zinc-600 group-hover:text-brand-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </div>

                <div className="z-10">
                  <h4 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{project.title}</h4>
                  <p className="text-zinc-400 text-sm line-clamp-2">{project.description}</p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] font-bold">
                    Interactive_Walkthrough_Ready
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] text-zinc-600 uppercase">#{tag}</span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectArchive;
