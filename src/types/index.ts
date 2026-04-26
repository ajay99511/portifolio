export interface Project {
  id: string;
  batchId: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  stats: {
    nodes: number;
    complexity: string;
  };
  walkthroughSteps: WalkthroughStep[];
}

export interface WalkthroughStep {
  title: string;
  description: string;
  mockState: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface TimelineEntry {
  title: string;
  subtitle: string;
  period: string;
  highlights: string[];
}
