"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";
import { expertiseGroups } from "@/lib/profile";

const icons = [Layout, Database, Terminal, Code2];

const Expertise = () => {
  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-24 section-px bg-surface/80 border-y border-white/5">
      <div className="mb-10 sm:mb-16">
        <p className="accent-rule text-[10px] sm:text-xs mb-3">Expertise Matrix</p>
        <h3 className="text-3xl sm:text-4xl font-semibold uppercase">Technical Core</h3>
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
              className="neo-panel rounded-xl p-6 sm:p-7 group hover:-translate-y-1 transition-transform"
            >
              <div className="mb-5 sm:mb-6 w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/25 flex items-center justify-center group-hover:bg-brand-orange/15 transition-colors">
                <Icon className="text-brand-orange" size={18} />
              </div>
              <h4 className="font-semibold text-lg mb-3 uppercase tracking-tight">{item.title}</h4>
              <ul className="space-y-2.5">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-zinc-400 text-xs sm:text-sm font-mono flex items-start gap-2.5 group-hover:text-zinc-200 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-brand-cyan/80 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Expertise;
