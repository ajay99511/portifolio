"use client";

import { motion } from "framer-motion";
import { timelineEntries } from "@/lib/profile";

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 px-6 md:px-24 bg-surface">
      <div className="mb-16">
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> Career_Timeline
        </h2>
        <h3 className="text-4xl font-bold uppercase tracking-tighter">Professional Journey</h3>
      </div>

      <div className="space-y-12">
        {timelineEntries.map((exp, idx) => (
          <motion.div 
            key={exp.title + exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l border-zinc-800"
          >
            <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-brand-orange rounded-full" />
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h4 className="text-2xl font-bold tracking-tight uppercase">{exp.title}</h4>
                <p className="font-mono text-brand-orange text-sm">{exp.company}</p>
              </div>
              <span className="font-mono text-zinc-500 text-sm mt-2 md:mt-0">{exp.period}</span>
            </div>

            <ul className="space-y-3">
              {exp.highlights.map((h, i) => (
                <li key={i} className="text-zinc-400 text-sm leading-relaxed max-w-3xl flex gap-3">
                  <span className="text-zinc-700 font-mono">[{i+1}]</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
