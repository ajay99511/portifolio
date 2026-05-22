"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";
import { expertiseGroups } from "@/lib/profile";

const icons = [Layout, Database, Terminal, Code2];

const Expertise = () => {
  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-24 section-px bg-surface/80 border-y border-brand-neon/5">
      <div className="mb-10 sm:mb-16">
        <p className="accent-rule text-[10px] sm:text-xs mb-3">Neural Pathways</p>
        <h3 className="text-3xl sm:text-4xl font-semibold uppercase">Skill Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {expertiseGroups.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="neo-panel rounded-xl p-6 sm:p-7 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-5 sm:mb-6 w-10 h-10 rounded-lg bg-brand-neon/8 border border-brand-neon/25 flex items-center justify-center group-hover:bg-brand-neon/15 transition-colors">
                <Icon className="text-brand-neon" size={18} />
              </div>
              <h4 className="font-semibold text-lg mb-4 uppercase tracking-tight">{item.title}</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 font-mono text-[10px] text-brand-neon bg-brand-neon/5 border border-brand-neon/20 rounded-sm uppercase tracking-widest hover:bg-brand-neon/10 hover:border-brand-neon/35 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Expertise;
