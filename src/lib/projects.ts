import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "repo-pulse",
    batchId: "BATCH_01",
    index: "00",
    pinned: true,
    title: "RepoPulse",
    subtitle: "GitHub Repository Manager",
    description: "A premium repository management dashboard with custom spaces and local directory binding.",
    longDescription: "RepoPulse is a sleek, dark-themed Next.js dashboard designed to organize GitHub repositories into customizable 'Spaces'. It features a command palette, local VS Code directory binding, advanced filtering, and a serverless Gist-based sync mechanism for configuration roaming.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Zustand", "NextAuth", "Framer Motion"],
    demoKind: "repo-pulse",
    repoUrl: "https://github.com/ajay99511/repo_pulse",
    highlights: [
      "Custom 'Spaces' organization system to group related repositories.",
      "Local machine path binding to quickly open repos in VS Code.",
      "Serverless architecture leveraging GitHub Gists for config roaming.",
      "Premium glassmorphic UI with advanced search and filtering."
    ],
    stats: {
      nodes: 5,
      complexity: "Dashboard / Next.js",
    },
    contextBanner: {
      challenge: "Managing dozens of GitHub repos across different contexts is chaotic and disconnected from local environments.",
      solution: "A unified command center that groups repos into Spaces and binds them directly to local IDE paths."
    },
    quickStartSteps: [
      {
        title: "Explore the Dashboard",
        description: "View the comprehensive statistics in the header and browse the BentoGrid of repositories."
      },
      {
        title: "Navigate Spaces",
        description: "Use the left sidebar to switch between 'All Projects' and customized Spaces to filter your view."
      },
      {
        title: "Interact with Repos",
        description: "Hover over repository cards to see quick actions like copying the clone URL or launching the local path in VS Code."
      }
    ],
    previewPanels: [
      { label: "Dashboard", iconName: "LayoutGrid" },
      { label: "Spaces", iconName: "FolderPlus" },
      { label: "Settings", iconName: "Settings" }
    ]
  },
  {
    id: "icm-fraud-detection",
    batchId: "BATCH_01",
    index: "00",
    pinned: true,
    title: "ICM Fraud Detection",
    subtitle: "Real-time ML Scoring Service",
    description: "Production-grade fraud detection system leveraging XGBoost and FastAPI for sub-100ms transaction scoring.",
    longDescription: "ICM Fraud Detection is a high-performance machine learning service built to identify fraudulent financial transactions in real-time. Using the IEEE-CIS dataset, it implements a complete pipeline from feature engineering and class-imbalance handling to a container-ready REST API. The system focuses on low-latency inference and high ROC-AUC, simulating the core decision engine of major payment processors.",
    techStack: ["Python", "FastAPI", "XGBoost", "Pandas", "Scikit-learn", "Joblib"],
    demoKind: "icm-fraud-detection",
    repoUrl: "https://github.com/ajay99511/ICM_Fraud_Detection",
    highlights: [
      "Sub-100ms inference latency optimized for real-time payment processing.",
      "Advanced XGBoost configuration with scale_pos_weight for 30x class imbalance.",
      "Stateless inference pipeline ensuring feature parity via persistent encoders.",
      "Production-ready REST API with Pydantic validation and batch scoring."
    ],
    stats: {
      nodes: 4,
      complexity: "MLOps + Inference",
    },
    contextBanner: {
      challenge: "High-volume card transactions require millisecond-level fraud decisions without sacrificing precision or handling extreme class imbalance.",
      solution: "An end-to-end ML scoring service with schema-aligned inference, XGBoost optimization, and a production-grade FastAPI interface."
    },
    quickStartSteps: [
      {
        title: "Inference Pipeline",
        description: "Examine the preprocessing logic that handles categorical encoding and numeric imputation with training-time parity."
      },
      {
        title: "XGBoost Training",
        description: "Review the model trainer's configuration for handling extreme class imbalance using scale_pos_weight and AUC metrics."
      },
      {
        title: "REST API",
        description: "Test the FastAPI endpoints for single and batch fraud predictions with Pydantic validation."
      }
    ],
    previewPanels: [
      { label: "Real-time", iconName: "Activity" },
      { label: "Prevention", iconName: "ShieldCheck" },
      { label: "Data", iconName: "Database" }
    ]
  },
  {
    id: "chronos-planner",
    batchId: "BATCH_01",
    index: "01",
    pinned: true,
    title: "Chronos Planner",
    subtitle: "Desktop-first productivity planner",
    description:
      "Flutter productivity system with schedule orchestration, templates, analytics, and focus HUD.",
    longDescription:
      "Chronos Planner is a cross-platform planning engine built with Flutter, Drift, and Provider. The app combines a weekly scheduler, reusable work-plan templates, a notes/timer/list workspace, and a real-time analytics layer tuned for deep-focus workflows.",
    techStack: [
      "Flutter",
      "Dart",
      "Drift ORM",
      "SQLite",
      "Provider",
      "Window Manager",
    ],
    demoKind: "chronos",
    repoUrl: "https://github.com/ajay99511/chronos_planner",
    highlights: [
      "Rolling 7-day schedule with task CRUD, sort controls, and undo stack recovery.",
      "Template engine with recurring-day application and cross-day propagation.",
      "Focus HUD desktop mode (always-on-top) for next-task execution.",
      "Analytics for efficiency, focus hours, energy peaks, and category distribution.",
    ],
    stats: {
      nodes: 7,
      complexity: "Offline-First + MVVM",
    },
    contextBanner: {
      challenge: "Productivity tools lack deep-focus workflow support and actionable analytics",
      solution: "A planner engine with schedule orchestration, templates, focus HUD, and real-time efficiency tracking",
    },
    quickStartSteps: [
      {
        title: "Navigate the Weekly Schedule",
        description: "Click any day in the 7-day strip to view and manage tasks. Try adding a task or toggling one complete.",
      },
      {
        title: "Explore WorkPlans & Templates",
        description: "Switch to WorkPlans in the sidebar to see reusable day templates. Apply one to populate a day instantly.",
      },
      {
        title: "Check Analytics & Focus HUD",
        description: "Open Analytics for efficiency metrics and category breakdowns. Try Focus HUD for a distraction-free next-task view.",
      },
    ],
    previewPanels: [
      { label: "Schedule", iconName: "CalendarDays" },
      { label: "Analytics", iconName: "BarChart3" },
      { label: "Focus HUD", iconName: "Bolt" },
    ],
  },
  {
    id: "dayvault-memory-palace",
    batchId: "BATCH_01",
    index: "02",
    pinned: true,
    title: "DayVault (Memory Palace)",
    subtitle: "Secure offline journaling platform",
    description:
      "Encrypted journaling and personal ranking system with lock-screen security and rich media references.",
    longDescription:
      "DayVault is an offline-first, cross-platform journal built with Flutter, Riverpod, and ObjectBox. It blends secure entry storage, calendar-based recall, identity ranking boards, and profile diagnostics under a glassmorphic interface with biometric and PIN-based protection.",
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "ObjectBox",
      "AES-256 / PBKDF2",
      "Local Auth",
    ],
    demoKind: "dayvault",
    repoUrl: "https://github.com/ajay99511/DayVault",
    highlights: [
      "PIN + biometric lock flow with attempt throttling and lockout behavior.",
      "Story/event journal editor with draft auto-save and media references.",
      "Calendar recall with day drill-down and quick entry creation.",
      "Preference ranking workspace with categories, stars, and reorder support.",
    ],
    stats: {
      nodes: 4,
      complexity: "Security + Offline Sync",
    },
    contextBanner: {
      challenge: "Journal apps sacrifice security for convenience, leaving private memories exposed",
      solution: "An encrypted memory palace with biometric auth, calendar recall, and identity ranking boards",
    },
    quickStartSteps: [
      {
        title: "Unlock the Vault",
        description: "Enter PIN 2160 or tap \"Bio\" to bypass. This simulates the biometric + PIN auth flow with attempt throttling.",
      },
      {
        title: "Browse & Create Memories",
        description: "Explore the journal feed, search memories, or tap \"New\" to create a story or event entry with mood tags.",
      },
      {
        title: "Discover Identity Rankings",
        description: "Switch to Identity to see your ranked favorites — movies, books, places. Add items and reorder them.",
      },
    ],
    previewPanels: [
      { label: "Lock Screen", iconName: "Lock" },
      { label: "Journal", iconName: "CalendarDays" },
      { label: "Rankings", iconName: "FolderHeart" },
    ],
  },
  {
    id: "fastbeat-media-player",
    batchId: "BATCH_01",
    index: "03",
    pinned: true,
    title: "FastBeat Media Player",
    subtitle: "Premium offline media player",
    description:
      "100% offline Android media player with Jetpack Compose, Media3 ExoPlayer, and smart queue management.",
    longDescription:
      "FastBeat is a powerful, modern offline media player for Android built from the ground up to deliver a premium experience for both video and audio. Built with Kotlin, Jetpack Compose, Media3, Room, and Hilt, it provides a seamless and immersive way to enjoy your local media without any internet connection, featuring an advanced video player with gesture controls and an immersive audio experience with a smart queue system.",
    techStack: ["Kotlin", "Jetpack Compose", "Media3", "Room", "Hilt/Dagger", "Coroutines/Flow"],
    demoKind: "fastbeat",
    repoUrl: "https://github.com/ajay99511/FastBeat",
    highlights: [
      "Architected a Clean Architecture-lite MVVM stack with Repository pattern and Hilt DI.",
      "Built a reactive state management system using Kotlin Coroutines Flow, eliminating LiveData entirely.",
      "Implemented a Room 2.7 database with 8 entities modeling playback history, analytics, and playlists.",
      "Developed a foreground MediaSessionService with ExoPlayer supporting background audio playback.",
      "Engineered a fullscreen video player with touch gesture recognition and Picture-in-Picture mode.",
    ],
    stats: {
      nodes: 5,
      complexity: "MVVM + Clean Architecture",
    },
    contextBanner: {
      challenge: "Standard media players are ad-heavy, clunky, and lack deep analytics for local media",
      solution: "A premium, 100% offline media player with advanced gestures, smart queue, and a rich analytics dashboard",
    },
    quickStartSteps: [
      {
        title: "Play Your Media",
        description: "Explore the audio library and start playing a track to see the immersive player and queue system.",
      },
      {
        title: "View Your Stats",
        description: "Switch to the Analytics dashboard to see your listening habits, streaks, and top tracks.",
      },
      {
        title: "Manage Playlists",
        description: "Create and manage playlists with custom sorting, all saved securely offline via Room DB.",
      },
    ],
    previewPanels: [
      { label: "Player", iconName: "PlayCircle" },
      { label: "Library", iconName: "Music" },
      { label: "Analytics", iconName: "BarChart3" },
    ],
  },
  {
    id: "personal-assist",
    batchId: "BATCH_01",
    index: "04",
    pinned: true,
    title: "Personal Agent Workbench",
    subtitle: "Local AI Desktop Environment",
    description: "A Tauri-based desktop application providing a unified interface for local AI models, agentic workflows, and workspace management.",
    longDescription: "Personal Agent Workbench is a unified desktop environment built with React, Vite, and Tauri. It provides a secure, locally-hosted interface for managing large language models, running agentic background tasks, and configuring workspace permissions for autonomous workflows. Features include a dual-pane chat system, comprehensive system health monitoring, and an auditable workspace permission system.",
    techStack: ["React", "Vite", "Tauri", "TypeScript", "TanStack Query", "Rust"],
    demoKind: "personal-assist",
    repoUrl: "https://github.com/ajay99511/PAW",
    highlights: [
      "Tauri-based desktop architecture bridging web front-end with native Rust capabilities.",
      "Workspace permission engine for securely exposing local directories to AI agents.",
      "Dual-mode chat interface with standard LLM responses and RAG-enhanced Smart Mode.",
      "System health and background task monitoring dashboard.",
    ],
    stats: {
      nodes: 6,
      complexity: "Local AI + Desktop Environment",
    },
    contextBanner: {
      challenge: "Managing local AI models and agents across different terminal windows is fragmented and insecure",
      solution: "A unified desktop interface with centralized chat, model management, and strict workspace permissions",
    },
    quickStartSteps: [
      {
        title: "Interact with the AI",
        description: "Open the Chat interface and test the streaming responses. Toggle Smart Mode to see RAG capabilities in action.",
      },
      {
        title: "Explore the Dashboard",
        description: "Switch to the Workspace view to see how local directories are securely exposed to AI agents with granular permissions.",
      },
      {
        title: "Check System Health",
        description: "Notice the active system status indicators in the sidebar ensuring your local AI backend is running smoothly.",
      },
    ],
    previewPanels: [
      { label: "Chat Engine", iconName: "MessageSquare" },
      { label: "Workspaces", iconName: "FolderKey" },
      { label: "Agents", iconName: "Cpu" },
    ],
  },
  {
    id: "dl-algorithms",
    batchId: "BATCH_01",
    index: "05",
    title: "Deep Learning Mastery",
    subtitle: "PyTorch Curriculum & Algorithms",
    description: "A research-grade deep learning curriculum covering MLPs, Transformers, Vision Models, and RLHF—all optimized for CPU training.",
    longDescription: "This repository houses a comprehensive suite of Deep Learning algorithms built from scratch using PyTorch. It features a complete pipeline from foundational Multi-Layer Perceptrons to complex architectures like GPT-style Causal Self-Attention models, Vision Transformers (ViT), and advanced alignment techniques including Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF).",
    techStack: ["Python", "PyTorch", "Transformers", "Hypothesis", "Machine Learning"],
    demoKind: "dl-algorithms",
    highlights: [
      "Config-driven training loops with structured JSONL logging and checkpointing.",
      "Custom implementation of Multi-head Causal Self-Attention and Vision Transformers.",
      "Complete RLHF pipeline with Reward Modeling and PPO.",
      "Property-based testing suite using Hypothesis to verify correctness.",
    ],
    stats: {
      nodes: 6,
      complexity: "Model Architectures & Training",
    },
    contextBanner: {
      challenge: "Understanding complex deep learning architectures requires looking beneath high-level framework abstractions",
      solution: "A transparent, thoroughly documented set of raw model implementations and training loops built from first principles",
    },
    quickStartSteps: [
      {
        title: "Explore the Architectures",
        description: "Browse the file tree to discover implementations of GPT-style pre-training, SFT/RLHF alignment, and Vision Transformers.",
      },
      {
        title: "Examine the Code",
        description: "Review the syntax-highlighted code for the CausalSelfAttention layer, showcasing fused QKV projections and causal masking.",
      },
      {
        title: "Run the Training Loop",
        description: "Click 'Run Model' to simulate a PyTorch training session and watch the loss metrics decrease in the terminal output.",
      },
    ],
    previewPanels: [
      { label: "Training", iconName: "TerminalSquare" },
      { label: "Algorithms", iconName: "Code2" },
      { label: "Models", iconName: "Network" },
    ],
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
