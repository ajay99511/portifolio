"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  GraduationCap,
  Rocket,
  Code2,
  Brain,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
} from "lucide-react";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const INTERESTS = [
  { label: "AI / LLM / ML", icon: Brain },
  { label: "Systems Design", icon: Code2 },
  { label: "Product Engineering", icon: Rocket },
  { label: "Open Source", icon: GitHubIcon },
];

const BEYOND_CODE = [
  "Watching films — studying how directors build tension and how actors communicate intent through subtle choices.",
  "Playing cricket and volleyball — the team dynamics, strategy under pressure, and the raw energy of competition.",
  "Observing how different people approach the same problem — understanding what triggers the ability to think differently.",
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] -left-16 w-64 sm:w-80 h-64 sm:h-80 bg-brand-neon/12 rounded-full blur-[130px]" />
        <div className="absolute bottom-[15%] right-[5%] w-72 sm:w-96 h-72 sm:h-96 bg-brand-orange/18 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[40%] w-56 sm:w-72 h-56 sm:h-72 bg-brand-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-neon/60 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
            ABOUT_ME
          </span>
          <h1
            className="font-semibold mb-4 tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            THE STORY SO FAR
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Engineer. Builder. Relentless learner. Here&apos;s who I am beyond the code.
          </p>
        </motion.div>

        {/* Main content grid */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-8 xl:gap-12 max-w-5xl mx-auto"
        >
          {/* Left column — Photo + quick facts */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="space-y-6">
            {/* Photo */}
            <div className="glass-morphism rounded-2xl p-4 sm:p-5">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-raised">
                <Image
                  src="/headshot.png"
                  alt="Ajay — Full-Stack Software Engineer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-semibold text-white text-lg">Ajay</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-neon/80">
                    Full-Stack Software Engineer
                  </p>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="neo-panel p-5 sm:p-6 rounded-2xl space-y-4">
              <p className="accent-rule text-[10px] mb-4">Quick Facts</p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-brand-neon" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Origin
                  </p>
                  <p className="text-sm text-zinc-200">
                    Andhra Pradesh, India → USA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                  <GraduationCap size={14} className="text-brand-orange" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Education
                  </p>
                  <p className="text-sm text-zinc-200">
                    MS in Computer Science
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0">
                  <Target size={14} className="text-brand-purple" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Current Role
                  </p>
                  <p className="text-sm text-zinc-200">
                    Software Engineer @ SLK Holdings
                  </p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="neo-panel p-5 sm:p-6 rounded-2xl">
              <p className="accent-rule text-[10px] mb-4">Focus Areas</p>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg"
                  >
                    <Icon size={13} className="text-brand-neon shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 truncate">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — Story */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-8">
            {/* The Story */}
            <div className="glass-morphism rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                <Sparkles size={20} className="text-brand-orange" />
                My Journey
              </h2>

              <div className="space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base">
                <p>
                  I grew up in Andhra Pradesh, India, where my curiosity for how things work led me straight into computer science. What started as tinkering with code in college quickly became an obsession — not just with writing software, but with understanding <em>why</em> certain systems endure while others crumble. I earned my Bachelor&apos;s in Computer Science from Jawaharlal Nehru Institute of Technology, then moved to the United States to pursue my Master&apos;s at the University of Central Missouri (GPA 3.5), where I dove deep into full-stack architecture, real-time systems, and machine learning.
                </p>

                <p>
                  Today, I work as a Software Engineer at SLK Holdings, where I design and ship production systems on Azure — from event-driven pipelines with Service Bus and BullMQ to containerized microservices on AKS. I&apos;ve cut API response times by 60%, reduced manual operational overhead by 90%, and integrated payment and shipping systems that handle real money and real logistics. But what drives me isn&apos;t just the engineering — it&apos;s the thinking behind it. I obsess over <em>why</em> one tech stack fits a problem better than another, how system design decisions ripple through performance and maintainability, and what it takes to build products that people actually rely on.
                </p>

                <p>
                  My biggest dream is to become an entrepreneur who builds software that isn&apos;t just useful today, but sustains for decades. I believe in the discipline of relentless building — the kind where you show up every single day, ask hard questions about every product and system you encounter, and let progress silence the doubters. For the past year, building has been my obsession: from GitScripe (a multi-agent LLM platform) to DayVault (an offline journaling app) to contributing to open-source projects like OpenClaw. I&apos;m not here to ship once and walk away. I&apos;m here to build things that last, and I&apos;m just getting started.
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <div className="glass-morphism rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                <Brain size={20} className="text-brand-neon" />
                How I Think
              </h2>

              <div className="space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base">
                <p>
                  I don&apos;t just learn frameworks — I study the principles underneath them. When I pick a technology, it&apos;s not because it&apos;s trendy; it&apos;s because I&apos;ve analyzed the business domain, the network constraints, the performance characteristics, and the long-term optimization trade-offs. Generalized system design knowledge is what lets me move fluidly between React and Flutter, between Node.js and .NET, between cloud-native and fully offline architectures.
                </p>
                <p>
                  I think of discipline not as routine, but as a kind of possession — the relentless drive to keep going when everyone around you says it&apos;s pointless. You prove them wrong not with words, but with progress. That&apos;s the mindset I bring to every project, every pull request, and every product decision.
                </p>
              </div>
            </div>

            {/* Beyond Code */}
            <div className="glass-morphism rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                <Heart size={20} className="text-brand-purple" />
                Beyond the Code
              </h2>

              <ul className="space-y-4">
                {BEYOND_CODE.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-md bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-mono text-[10px] text-brand-purple">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-orange to-orange-400 text-black rounded-xl font-bold transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-orange/20 text-sm"
              >
                Let&apos;s Connect
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-zinc-900/60 hover:border-brand-neon/30 transition-colors text-zinc-300"
              >
                <Code2 size={18} />
                View_Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
