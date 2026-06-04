import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function WalkthroughControls({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-brand-neon/5 rounded-sm border border-brand-neon/20 shadow-[inset_0_0_10px_rgba(0,240,255,0.05)]">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="p-2 text-neon-muted hover:text-brand-neon disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        title="Previous Step [P]"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={3} />
      </button>
      
      <div className="h-4 w-px bg-brand-neon/20 mx-1" />
      
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="group relative flex items-center gap-2 p-2 px-4 bg-brand-neon/20 text-brand-neon border border-neon-muted text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-brand-neon hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed overflow-hidden"
        title="Next Step [N]"
      >
        <span className="relative z-10 flex items-center gap-2 text-shadow-none">
          Proceed
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
        </span>
      </button>
    </div>
  );
}
