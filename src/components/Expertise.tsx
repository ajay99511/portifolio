"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";

const expertise = [
  {
    title: "Frontend Architecture",
    icon: <Layout className="text-brand-orange" />,
    skills: ["React 18+", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Performance Optimization"]
  },
  {
    title: "Backend & Systems",
    icon: <Database className="text-brand-orange" />,
    skills: ["Node.js", "PostgreSQL", "Redis", "RESTful APIs", "GraphQL", "Microservices Architecture"]
  },
  {
    title: "Tooling & DX",
    icon: <Terminal className="text-brand-orange" />,
    skills: ["Docker", "CI/CD (GitHub Actions)", "Vite / Webpack", "ESLint / Prettier", "Testing (Jest/Playwright)", "Storybook"]
  },
  {
    title: "Core Languages",
    icon: <Code2 className="text-brand-orange" />,
    skills: ["JavaScript (ES6+)", "HTML5 Semantic Markup", "Advanced CSS (Grid, Flexbox)", "Python", "Rust (Basics)", "SQL"]
  }
];

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 px-6 md:px-24 bg-surface">
      <div className="mb-16">
        <h2 className="font-mono text-sm text-brand-orange mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[1px] bg-brand-orange" /> Expertise_Matrix
        </h2>
        <h3 className="text-4xl font-bold">TECHNICAL CORE</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
        {expertise.map((item, index) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-black p-8 group hover:bg-zinc-900 transition-colors"
          >
            <div className="mb-6">{item.icon}</div>
            <h4 className="font-bold text-lg mb-4 uppercase font-mono tracking-tighter">{item.title}</h4>
            <ul className="space-y-2">
              {item.skills.map(skill => (
                <li key={skill} className="text-zinc-500 text-sm font-mono flex items-center gap-2 group-hover:text-zinc-300 transition-colors">
                  <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
