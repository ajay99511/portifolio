"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Project } from '@/types';
import WalkthroughControls from './WalkthroughControls';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layout } from 'lucide-react';

const demos: Record<string, React.ComponentType<any>> = {
  'social-network': dynamic(() => import('@/components/demos/SocialNetworkDemo'), { ssr: false }),
  'md-explorer': dynamic(() => import('@/components/demos/MdExplorerDemo'), { ssr: false }),
  'sm-pred': dynamic(() => import('@/components/demos/SMPredDemo'), { ssr: false }),
  'gitscripe': dynamic(() => import('@/components/demos/GitScripeDemo'), { ssr: false }),
  'db-pred': dynamic(() => import('@/components/demos/DbPredDemo'), { ssr: false }),
  'repo-pulse': dynamic(() => import('@/components/demos/RepoPulseDemo'), { ssr: false }),
  'icm-fraud-detection': dynamic(() => import('@/components/demos/ICMFraudDetectionDemo'), { ssr: false }),
  'chronos-planner': dynamic(() => import('@/components/demos/ChronosPlannerDemo'), { ssr: false }),
  'chronos': dynamic(() => import('@/components/demos/ChronosPlannerDemo'), { ssr: false }),
  'dayvault': dynamic(() => import('@/components/demos/DayVaultDemo'), { ssr: false }),
  'fastbeat': dynamic(() => import('@/components/demos/FastBeatDemo'), { ssr: false }),
  'personal-assist': dynamic(() => import('@/components/demos/PersonalAssistDemo'), { ssr: false }),
  'dl-algorithms': dynamic(() => import('@/components/demos/DLAlgorithmsDemo'), { ssr: false }),
};

export default function WalkthroughViewer({ project }: { project: any }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = project.steps && project.steps.length > 0 ? project.steps[currentStepIndex] : null;

  const renderMockState = () => {
    const Demo = demos[project.id] || demos[project.demoKind];
    const AnyDemo = Demo as any;
    
    if (Demo) {
      return (
          <AnyDemo mockStateId={step ? step.mockStateId : undefined} />
      );
    }
    
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-xs font-mono uppercase tracking-widest text-brand-neon/40">
         <div className="space-y-4">
            <Box className="w-12 h-12 mx-auto opacity-20 text-brand-neon" />
            <p>Mock component pending for {project.id}</p>
         </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Canvas Top Bar */}
      <div className="h-10 border-b border-brand-neon/20 px-6 flex items-center justify-between shrink-0 bg-transparent">
        <div className="flex items-center gap-1.5 opacity-80">
          <div className="w-2.5 h-2.5 rounded-full border border-neon-muted bg-brand-neon/10" />
          <div className="w-2.5 h-2.5 rounded-full border border-neon-muted bg-brand-neon/10" />
          <div className="w-2.5 h-2.5 rounded-full border border-neon-muted bg-brand-neon/10" />
          <div className="ml-4 px-3 py-1 bg-brand-purple/10 rounded-sm text-[9px] font-mono text-brand-neon border border-brand-neon/20 lowercase">
             {project.id}.ais-cloud.dev
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 font-mono text-[8px] text-brand-neon">
             <span className="w-1 h-1 rounded-full bg-brand-neon animate-pulse shadow-[0_0_5px_#00f0ff]" />
             Viewport: Matrix_Simulated
           </div>
           <Layout className="w-3.5 h-3.5 text-neon-muted" />
        </div>
      </div>

      {/* Primary Interaction Void */}
      <div className="flex-1 bg-transparent overflow-hidden relative group">
        <AnimatePresence mode="wait">
          <motion.div
            key={step ? step.id : 'empty'}
            initial={{ opacity: 0, scale: 0.99, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.01, filter: 'blur(20px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10"
          >
            {renderMockState()}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Overlay for UI Focus */}
        <div className="absolute inset-0 pointer-events-none border-[12px] border-brand-neon/5 z-20 mix-blend-screen" />
      </div>

      {/* Floating Tactical Console */}
      {step && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl group/console z-30">
          <div className="bg-surface-raised/95 backdrop-blur-3xl border border-brand-neon/20 rounded-sm p-5 shadow-[0_0_30px_rgba(0,240,255,0.1)] flex items-center gap-8 transition-all group-hover/console:border-neon-muted group-hover/console:shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono font-bold text-brand-neon uppercase tracking-[0.2em] bg-brand-neon/10 px-2 py-0.5 rounded-sm border border-brand-neon/30">
                  Step {String(currentStepIndex + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-brand-neon/20" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-1"
                >
                    <h3 className="text-sm font-bold text-blue-100 tracking-tight uppercase leading-none">{step.title}</h3>
                    <p className="text-[11px] text-muted font-light leading-relaxed truncate">
                      {step.description}
                    </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="shrink-0 interactive cursor-none">
              <WalkthroughControls 
                currentStep={currentStepIndex}
                totalSteps={project.steps?.length || 0}
                onNext={() => setCurrentStepIndex(i => Math.min(i + 1, (project.steps?.length || 1) - 1))}
                onPrev={() => setCurrentStepIndex(i => Math.max(i - 1, 0))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
