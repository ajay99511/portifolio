"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";
import { expertiseGroups } from "@/lib/profile";

const icons = [Layout, Database, Terminal, Code2];

const Expertise = () => {
  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-24 section-px bg-surface">
      <div className="mb-10 sm:mb-16">
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> Expertise_Matrix
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold">TECHNICAL CORE</h3>
      </div>

      {/* Grid: 1-col mobile → 2-col tablet → 4-col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-px md:bg-zinc-800 md:border md:border-zinc-800">
        {expertiseGroups.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-black p-6 sm:p-8 group hover:bg-zinc-900 transition-colors border border-zinc-800 md:border-0"
          >
            <div className="mb-4 sm:mb-6"><Icon className="text-brand-orange" /></div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 uppercase font-mono tracking-tighter">{item.title}</h4>
            <ul className="space-y-2">
              {item.skills.map(skill => (
                <li key={skill} className="text-zinc-500 text-xs sm:text-sm font-mono flex items-center gap-2 group-hover:text-zinc-300 transition-colors">
                  <span className="w-1 h-1 bg-zinc-700 rounded-full shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        )})}
      </div>
    </section>
  );
};

export default Expertise;
