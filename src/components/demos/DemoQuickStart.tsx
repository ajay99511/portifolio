"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStartStep {
  title: string;
  description: string;
}

interface DemoQuickStartProps {
  projectId: string;
  steps: QuickStartStep[];
  onComplete: () => void;
}

export default function DemoQuickStart({ projectId, steps, onComplete }: DemoQuickStartProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storageKey = `quickstart-seen-${projectId}`;
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem(storageKey);
      if (seen) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDismissed(true);
        onComplete();
      } else {
        // Slight delay so the demo renders first
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    }
  }, [projectId, onComplete]);

  const dismiss = () => {
    const storageKey = `quickstart-seen-${projectId}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(storageKey, "true");
    }
    setDismissed(true);
    onComplete();
  };

  const advance = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      dismiss();
    }
  };

  if (dismissed || !visible || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative max-w-md w-full mx-4"
        >
          {/* Card */}
          <div
            className="rounded-xl border border-white/10 p-6 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(24, 24, 40, 0.95) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <Sparkles size={16} className="text-black" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400">
                    Quick Start
                  </p>
                  <p className="font-mono text-[10px] text-zinc-500">
                    Step {currentStep + 1} of {steps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="p-1.5 rounded-md border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
                aria-label="Skip tour"
              >
                <X size={14} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1 mb-5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    i <= currentStep
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : "bg-zinc-800"
                  )}
                />
              ))}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={dismiss}
                className="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Skip Tour
              </button>
              <button
                onClick={advance}
                className={cn(
                  "px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all",
                  "bg-gradient-to-r from-orange-500 to-amber-600 text-black",
                  "hover:from-orange-400 hover:to-amber-500",
                  "shadow-lg shadow-orange-500/20"
                )}
              >
                {isLast ? "Start Exploring" : "Next"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Floating hint */}
          <p className="text-center mt-3 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            Press Esc or click outside to dismiss
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
