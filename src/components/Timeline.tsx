"use client";

import { motion } from "framer-motion";
import { timelineEntries } from "@/lib/profile";

const Timeline = () => {
  return (
    <section id="timeline" className="py-16 sm:py-20 lg:py-24 section-px bg-surface/65 border-t border-brand-neon/5">
      <div className="mb-10 sm:mb-16">
        <p className="accent-rule text-[10px] sm:text-xs mb-3">Data Logs</p>
        <h3 className="text-3xl sm:text-4xl font-semibold uppercase tracking-tight">Experience Timeline</h3>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-brand-neon/20 space-y-8 sm:space-y-10">
        {timelineEntries.map((exp, idx) => (
          <motion.article
            key={exp.title + exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing neon dot */}
            <div className="absolute -left-[calc(1.5rem+7px)] sm:-left-[calc(2rem+7px)] top-6 w-3 h-3 rounded-full bg-brand-neon shadow-[0_0_10px_#00f0ff,0_0_20px_rgba(0,240,255,0.3)]" />

            <div className="neo-panel rounded-xl p-5 sm:p-7">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h4 className="font-semibold uppercase leading-tight" style={{ fontSize: "var(--text-2xl)" }}>
                    {exp.title}
                  </h4>
                  <p className="font-mono text-brand-orange text-xs sm:text-sm mt-1">{exp.company}</p>
                </div>
                <span className="font-mono text-zinc-500 text-xs sm:text-sm shrink-0">{exp.period}</span>
              </div>

              <ul className="space-y-2.5 sm:space-y-3">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-4xl flex gap-2.5"
                  >
                    <span className="text-brand-neon font-mono shrink-0">[{i + 1}]</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
