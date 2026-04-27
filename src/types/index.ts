export interface QuickStartStep {
  title: string;
  description: string;
}

export interface PreviewPanel {
  label: string;
  iconName: string;
}

export interface ContextBanner {
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  batchId: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  demoKind: "chronos" | "dayvault" | "generic" | "fastbeat" | "personal-assist" | "dl-algorithms";
  pinned?: boolean;
  repoUrl?: string;
  highlights: string[];
  stats: {
    nodes: number;
    complexity: string;
  };
  walkthroughSteps?: WalkthroughStep[];
  contextBanner?: ContextBanner;
  quickStartSteps?: QuickStartStep[];
  previewPanels?: PreviewPanel[];
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
