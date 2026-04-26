"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Layout, Cpu, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface WalkthroughEngineProps {
  project: Project;
}

const WalkthroughEngine = ({ project }: WalkthroughEngineProps) => {
  const steps = project.walkthroughSteps ?? [];
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-zinc-400 font-mono text-xs uppercase tracking-widest">
        No walkthrough configured for this project.
      </div>
    );
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white pt-20">
      {/* Left Pane: Technical Briefing */}
      <aside className="w-full lg:w-[400px] border-r border-zinc-800 p-8 flex flex-col overflow-y-auto">
        <Link href="/#archive" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back_To_Directory
        </Link>

        <div className="mb-8">
          <span className="font-mono text-xs text-brand-orange uppercase tracking-[0.2em] mb-2 block">
            {project.batchId} {" // "} Artifact_{project.id.slice(0, 4).toUpperCase()}
          </span>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">{project.title}</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">{project.longDescription}</p>
        </div>

        <div className="space-y-6 mb-12">
          <div>
            <h3 className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={12} /> Compiler_Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 p-3">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Node_Count</div>
                <div className="text-xl font-bold font-mono">{project.stats.nodes}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-3">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Complexity</div>
                <div className="text-xl font-bold font-mono">{project.stats.complexity}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Layout size={12} /> Tech_Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-2 py-1 bg-zinc-800 border border-zinc-700 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-sm">
            <h4 className="font-mono text-[10px] text-brand-orange uppercase mb-2">Step_Status</h4>
            <div className="flex gap-1 mb-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 flex-1 transition-colors",
                    i <= currentStep ? "bg-brand-orange" : "bg-zinc-800"
                  )} 
                />
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono italic">
              Synchronizing_Mock_State... OK
            </p>
          </div>
        </div>
      </aside>

      {/* Right Pane: Main Stage */}
      <main className="flex-1 p-6 lg:p-12 flex flex-col relative bg-[#050505]">
        <div className="flex-1 relative flex flex-col">
          {/* Simulated Viewport Chrome */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-t-xl p-3 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <div className="flex-1 bg-black/50 rounded py-1 px-4 text-[10px] font-mono text-zinc-500 truncate">
              https://{project.id}.engine.v4/walkthrough/step-{currentStep + 1}
            </div>
          </div>
          
          <div className="flex-1 border-x border-b border-zinc-800 bg-[#0A0A0A] overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                {steps[currentStep].mockState}
              </motion.div>
            </AnimatePresence>
            
            {/* Floating Tactical Console */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div className="glass-morphism px-6 py-4 flex items-center gap-8 min-w-[400px]">
                <div className="flex-1">
                    <div className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-1">
                    Step {currentStep + 1} {" // "} {steps[currentStep].title}
                  </div>
                  <div className="text-xs text-zinc-400 line-clamp-1">
                    {steps[currentStep].description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="p-2 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-brand-orange text-black font-bold text-xs uppercase tracking-tighter flex items-center gap-2 hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-brand-orange transition-colors"
                  >
                    Proceed <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center px-4 font-mono text-[9px] text-zinc-700 uppercase tracking-widest">
          <div>Engine_Render_Type: REACT_18_CONCURRENT</div>
          <div>Memory_Usage: 124MB</div>
          <div>FPS: 60.0</div>
        </div>
      </main>
    </div>
  );
};

export default WalkthroughEngine;
