import { Project } from "@/types";

const rawProjects: Project[] = [
  {
    id: "social-network",
    batchId: "BATCH_01",
    pinned: true,
    title: "SocialNetwork",
    subtitle: "My Deep Dive into Full-Stack Systems",
    description: "A personal project to master real-time communication and complex backend architecture using .NET and Angular.",
    longDescription: "I built SocialNetwork to understand how large-scale social platforms handle state and security. This was my 'proving ground' for mastering the Repository pattern, Unit of Work, and real-time synchronization with SignalR. It taught me how to bridge a strictly-typed C# backend with a reactive Angular frontend while maintaining high performance and secure JWT-based authentication.",
    techStack: ["C#", ".NET Core 8", "Angular 18", "SQL Server", "SignalR", "Cloudinary"],
    demoKind: "social-network",
    repoUrl: "https://github.com/ajay99511/Social_Networking_Application",
    highlights: [
      "Learned to architect a scalable API using the Repository and Unit of Work patterns.",
      "Explored real-time bi-directional communication using SignalR web sockets.",
      "Deep-dived into ASP.NET Core Identity for secure, token-based authentication.",
      "Mastered reactive state management in Angular for a fluid, 'single-page' feel."
    ],
    stats: {
      nodes: 8,
      complexity: "Learning Full-Stack Patterns",
    },
    contextBanner: {
      challenge: "I wanted to understand how to build a secure, real-time platform that doesn't sacrifice performance as it grows.",
      solution: "Implemented a decoupled architecture where .NET handles the heavy lifting and Angular provides a responsive UI."
    },
    quickStartSteps: [
      {
        title: "Login Flow",
        description: "See how I implemented secure JWT authentication connecting to the .NET Identity system."
      },
      {
        title: "Member Exploration",
        description: "Browse profiles loaded via server-side pagination—a key technique I learned for handling large datasets."
      },
      {
        title: "Live Chat",
        description: "Test the messaging system I built with SignalR to see real-time updates without page refreshes."
      }
    ],
    previewPanels: [
      { label: "Real-time", iconName: "MessageSquare" },
      { label: "Auth", iconName: "Shield" },
      { label: "State", iconName: "Users" }
    ]
  },
  {
    id: "md-explorer",
    batchId: "BATCH_01",
    pinned: true,
    title: "MD Explorer",
    subtitle: "A Better Way to Read My Docs",
    description: "Built out of a personal need for a cleaner Markdown reader, exploring Flutter's desktop capabilities.",
    longDescription: "As I wrote more documentation, I found standard file explorers lacking. I built MD Explorer to learn Flutter's desktop-first development and state management with Riverpod. It features a custom 3-panel layout that makes navigating complex project docs much easier, teaching me about responsive UI design across different form factors.",
    techStack: ["Flutter", "Dart", "Riverpod", "Markdown", "Window Manager", "Path"],
    demoKind: "md-explorer",
    repoUrl: "https://github.com/ajay99511/md_doc_viewer",
    highlights: [
      "Designed a responsive 3-panel layout from scratch for optimal desktop reading.",
      "Experimented with Riverpod to manage complex UI state and file system navigation.",
      "Integrated custom Markdown rendering with syntax highlighting for better readability.",
      "Learned to handle local file system watchers and directory indexing in Dart."
    ],
    stats: {
      nodes: 6,
      complexity: "State Management & Desktop UI",
    },
    contextBanner: {
      challenge: "I needed a tool that could quickly index and display my project notes without the clutter of a full IDE.",
      solution: "A lightweight, 3-panel documentation explorer focused on speed and deep-linking."
    },
    quickStartSteps: [
      {
        title: "Navigate Folders",
        description: "Explore the folder tree I designed to handle deeply nested documentation structures."
      },
      {
        title: "Search & Filter",
        description: "Try the instant search—I built this to quickly jump between files in large repositories."
      },
      {
        title: "Read Experience",
        description: "Open a file to see the custom Markdown rendering and bookmarking system I implemented."
      }
    ],
    previewPanels: [
      { label: "Folders", iconName: "Folder" },
      { label: "Reader", iconName: "Book" },
      { label: "UI Flow", iconName: "Search" }
    ]
  },
  {
    id: "sm-pred",
    batchId: "BATCH_01",
    pinned: true,
    title: "Groundwater Analytics",
    subtitle: "Exploring Environmental Data with ML",
    description: "A data science project where I learned to predict water stress using Random Forest and interactive visualization.",
    longDescription: "I've always been interested in how data can help solve environmental issues. This project was my first deep dive into the 'why' behind ML predictions. I learned how to engineer domain-specific features like 'Recharge Efficiency' and used Plotly to make the data tell a story. It taught me that a model is only as good as the features you create for it.",
    techStack: ["Python", "Streamlit", "Plotly", "Scikit-Learn", "Pandas", "Joblib"],
    demoKind: "sm-pred",
    repoUrl: "https://github.com/ajay99511/Soil-Moisture-Prediction",
    highlights: [
      "Learned the importance of feature engineering by creating custom environmental metrics.",
      "Used Scikit-Learn's Random Forest to model complex, non-linear water stress patterns.",
      "Built an interactive dashboard with Streamlit to make ML insights accessible.",
      "Explored Explainable AI (XAI) to understand which factors most influence water stress."
    ],
    stats: {
      nodes: 4,
      complexity: "ML Feature Engineering",
    },
    contextBanner: {
      challenge: "Environmental data is messy. I wanted to see if I could extract meaningful predictions from complex rainfall and usage patterns.",
      solution: "Combined robust data preprocessing with a Random Forest model and a visual 'What-If' simulator."
    },
    quickStartSteps: [
      {
        title: "Explore Analytics",
        description: "Interact with the Plotly maps—I built these to visualize spatial trends in groundwater."
      },
      {
        title: "Feature Engineering",
        description: "See how I transformed raw data into 'Stress Ratios' to help the model learn better."
      },
      {
        title: "Simulate Scenarios",
        description: "Use the simulator I built to see how changes in rainfall affect predicted water levels."
      }
    ],
    previewPanels: [
      { label: "Maps", iconName: "Layout" },
      { label: "Trends", iconName: "TrendingUp" },
      { label: "Nature", iconName: "Droplets" }
    ]
  },
  {
    id: "gitscripe",
    batchId: "BATCH_01",
    pinned: true,
    title: "GitScripe",
    subtitle: "My Experiment with AI Agents",
    description: "An exploration into LLM agents and RAG to make sense of complex Git repository histories.",
    longDescription: "GitScripe was born from my curiosity about LLM agents. I wanted to see if I could build a system that doesn't just list commits, but actually 'understands' the intent behind them. I learned how to orchestrate multiple agents (Analyzer, Summarizer, Critic) and implemented a RAG pipeline so I could chat with my own codebase history.",
    techStack: ["Node.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Redis", "Ollama"],
    demoKind: "gitscripe",
    repoUrl: "https://github.com/ajay99511/GitScripe",
    highlights: [
      "Built a multi-agent pipeline to process and critique Git diffs for better summaries.",
      "Implemented a RAG (Retrieval-Augmented Generation) system for repository-aware chat.",
      "Learned background job orchestration with Redis and BullMQ for processing large repos.",
      "Developed a GitHub-style dark UI to present AI insights in a familiar developer context."
    ],
    stats: {
      nodes: 12,
      complexity: "AI Agents & RAG",
    },
    contextBanner: {
      challenge: "Commit messages are often vague. I wanted to use AI to automatically infer intent and summarize changes accurately.",
      solution: "A multi-stage agentic pipeline that analyzes diffs and groups them by architectural impact."
    },
    quickStartSteps: [
      {
        title: "Sync Repo",
        description: "Watch the background workers I built process repository history in real-time."
      },
      {
        title: "AI Summaries",
        description: "Review the intent-based summaries generated by the multi-agent pipeline."
      },
      {
        title: "Code Chat",
        description: "Ask the AI questions about the code—powered by the RAG system I implemented."
      }
    ],
    previewPanels: [
      { label: "Agents", iconName: "MessageSquare" },
      { label: "Insights", iconName: "ShieldCheck" },
      { label: "Context", iconName: "Search" }
    ]
  },
  {
    id: "db-pred",
    batchId: "BATCH_01",
    pinned: false,
    title: "Diabetes XAI API",
    subtitle: "Learning Explainable Medical AI",
    description: "A project focused on building trustworthy ML models with clear reasoning using XGBoost and SHAP.",
    longDescription: "I built this to learn how to make AI predictions transparent, which is critical in healthcare. I explored SHAP (Explainable AI) to show exactly why a model predicts a certain risk level. This project taught me about class imbalance handling with SMOTE and how to use Optuna for Bayesian hyperparameter optimization to reach high recall.",
    techStack: ["Python", "FastAPI", "XGBoost", "Optuna", "SHAP", "Docker"],
    demoKind: "db-pred",
    repoUrl: "https://github.com/ajay99511/Diabetes-Prediction",
    highlights: [
      "Learned to use SHAP values to provide human-readable reasoning for ML predictions.",
      "Mastered hyperparameter tuning using Bayesian optimization with Optuna.",
      "Handled extreme class imbalance using SMOTE and KNNImputation techniques.",
      "Built a production-ready API with FastAPI and containerized it with Docker."
    ],
    stats: {
      nodes: 5,
      complexity: "Explainable AI (XAI)",
    },
    contextBanner: {
      challenge: "A simple 'Yes/No' isn't enough for medical AI. I wanted to provide 'Why' for every prediction.",
      solution: "Integrated SHAP explainability directly into the API response to highlight top physiological risk factors."
    },
    quickStartSteps: [
      {
        title: "Optuna Tuning",
        description: "See how I used automated tuning to maximize the model's diagnostic recall."
      },
      {
        title: "XAI Reasoning",
        description: "Examine the SHAP analysis—I built this to show which patient features drive the prediction."
      },
      {
        title: "API Interface",
        description: "Test the FastAPI endpoints I designed for easy integration with medical systems."
      }
    ],
    previewPanels: [
      { label: "Reasoning", iconName: "Microscope" },
      { label: "AI Logic", iconName: "BrainCircuit" },
      { label: "API", iconName: "Server" }
    ]
  },
  {
    id: "repo-pulse",
    batchId: "BATCH_01",
    pinned: false,
    title: "RepoPulse",
    subtitle: "My Personal Project Command Center",
    description: "A custom dashboard I built to organize my messy GitHub repositories and bind them to local folders.",
    longDescription: "I have too many projects! I built RepoPulse to learn Next.js 14 and created a personal 'command center'. It helps me group repos into 'Spaces' and, through a small local helper, opens them directly in VS Code. It taught me about serverless sync (using GitHub Gists) and building modern, glassmorphic UIs.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Zustand", "NextAuth", "Framer Motion"],
    demoKind: "repo-pulse",
    repoUrl: "https://github.com/ajay99511/RepoPulse",
    highlights: [
      "Built a custom 'Spaces' system to organize repositories by interest or stack.",
      "Learned to bridge the browser and local machine with VS Code directory binding.",
      "Implemented a serverless config sync using GitHub Gists as a lightweight database.",
      "Experimented with Framer Motion to create a premium, interactive user experience."
    ],
    stats: {
      nodes: 5,
      complexity: "Productivity Tooling",
    },
    contextBanner: {
      challenge: "Managing dozens of learning projects across different folders was becoming a headache.",
      solution: "A unified dashboard that organizes my work and connects directly to my local development environment."
    },
    quickStartSteps: [
      {
        title: "Repo Spaces",
        description: "Browse the 'Spaces' I created—this was my solution for project categorization."
      },
      {
        title: "Sync System",
        description: "See how I used Gists for roaming settings without needing a full backend."
      },
      {
        title: "Local Launch",
        description: "Check out the VS Code binding—I built this to jump into code faster."
      }
    ],
    previewPanels: [
      { label: "Command", iconName: "LayoutGrid" },
      { label: "Spaces", iconName: "FolderPlus" },
      { label: "Visuals", iconName: "Settings" }
    ]
  },
  {
    id: "icm-fraud-detection",
    batchId: "BATCH_01",
    pinned: false,
    title: "ICM Fraud Detection",
    subtitle: "Real-time Scoring with Imbalanced Data",
    description: "An ML project exploring how to catch fraud in high-volume streams with extreme class imbalance.",
    longDescription: "I built this to tackle one of the hardest problems in ML: extreme class imbalance (only 1% fraud). I learned how to use XGBoost's internal weighting and feature engineering to maintain sub-100ms latency. This project was my introduction to building high-throughput inference services with FastAPI.",
    techStack: ["Python", "FastAPI", "XGBoost", "Pandas", "Scikit-learn", "Joblib"],
    demoKind: "icm-fraud-detection",
    repoUrl: "https://github.com/ajay99511/ICM_Fraud_Detection",
    highlights: [
      "Explored XGBoost's scale_pos_weight to handle extreme 30:1 class imbalance.",
      "Built a low-latency inference pipeline optimized for sub-100ms scoring.",
      "Learned the importance of feature parity between training and production environments.",
      "Implemented a stateless FastAPI service designed for easy horizontal scaling."
    ],
    stats: {
      nodes: 4,
      complexity: "Imbalanced Learning",
    },
    contextBanner: {
      challenge: "How do you build a model that can catch rare fraud events without slowing down the user experience?",
      solution: "A combination of cost-sensitive learning (XGBoost) and a highly optimized Python inference service."
    },
    quickStartSteps: [
      {
        title: "Imbalance Logic",
        description: "Review how I configured the model to focus on rare fraud cases."
      },
      {
        title: "Fast Inference",
        description: "Test the scoring endpoint—I optimized this for real-time performance."
      },
      {
        title: "Data Pipeline",
        description: "See the preprocessing steps I built to keep features consistent for the model."
      }
    ],
    previewPanels: [
      { label: "Latency", iconName: "Activity" },
      { label: "Security", iconName: "ShieldCheck" },
      { label: "Streams", iconName: "Database" }
    ]
  },
  {
    id: "chronos-planner",
    batchId: "BATCH_01",
    pinned: false,
    title: "Chronos Planner",
    subtitle: "Building My Ideal Study System",
    description: "A Flutter project to manage my learning schedule, featuring offline storage and focus tracking.",
    longDescription: "I needed a way to manage my study sessions more effectively, so I built Chronos. This was my deep dive into Flutter's offline-first capabilities using SQLite (Drift). I learned how to build a complex template system and a 'Focus HUD' that stays on top of other windows while I code.",
    techStack: ["Flutter", "Dart", "Drift ORM", "SQLite", "Provider", "Window Manager"],
    demoKind: "chronos",
    repoUrl: "https://github.com/ajay99511/chronos_planner",
    highlights: [
      "Mastered offline-first architecture using Drift (SQLite) for reliable data storage.",
      "Built a custom scheduling engine with support for reusable task templates.",
      "Implemented an 'Always-on-Top' Focus HUD to keep my goals visible during work.",
      "Created an analytics dashboard to track my learning efficiency over time."
    ],
    stats: {
      nodes: 7,
      complexity: "Offline-First Mobile",
    },
    contextBanner: {
      challenge: "Generic planners didn't fit my study workflow. I wanted a tool that combined planning with active focus tracking.",
      solution: "A Flutter app with a persistent task overlay and a local-first database for zero-latency interaction."
    },
    quickStartSteps: [
      {
        title: "Schedule Tasks",
        description: "Manage your day with the 7-day view I designed for quick task entry."
      },
      {
        title: "Use Templates",
        description: "Check out the WorkPlans—I built this to automate my recurring study routines."
      },
      {
        title: "Focus Mode",
        description: "Launch the Focus HUD to see the desktop overlay I implemented for deep work."
      }
    ],
    previewPanels: [
      { label: "Schedule", iconName: "CalendarDays" },
      { label: "Stats", iconName: "BarChart3" },
      { label: "HUD", iconName: "Bolt" }
    ],
  },
  {
    id: "dayvault-memory-palace",
    batchId: "BATCH_01",
    pinned: false,
    title: "DayVault",
    subtitle: "Exploring Security & Privacy in Flutter",
    description: "An encrypted journal exploring biometric authentication and secure local storage.",
    longDescription: "I wanted a private place for my thoughts that felt truly secure. DayVault was my project for learning about mobile security—implementing AES-256 encryption and biometric locks. It taught me how to handle sensitive data locally using ObjectBox and build a glassmorphic UI that feels premium yet private.",
    techStack: ["Flutter", "Dart", "Riverpod", "ObjectBox", "AES-256 / PBKDF2", "Local Auth"],
    demoKind: "dayvault",
    repoUrl: "https://github.com/ajay99511/DayVault",
    highlights: [
      "Learned to implement biometric and PIN-based security with lockout protection.",
      "Explored secure local storage using ObjectBox and AES encryption for entries.",
      "Designed a glassmorphic UI to give the 'Vault' a modern, high-end feel.",
      "Built a calendar-based recall system for easy navigation of past memories."
    ],
    stats: {
      nodes: 4,
      complexity: "Mobile Security Patterns",
    },
    contextBanner: {
      challenge: "Most journal apps store data in the cloud. I wanted to build one that keeps everything encrypted on-device.",
      solution: "An offline-first vault using PBKDF2 for key derivation and local biometric hardware for access."
    },
    quickStartSteps: [
      {
        title: "Unlock Vault",
        description: "Test the security flow—I built this with biometric fallback and PIN protection."
      },
      {
        title: "Write Memory",
        description: "Create a journal entry to see the rich-text editor and mood tagging system."
      },
      {
        title: "Identity Rankings",
        description: "Explore the 'Identity' board where I learned to implement drag-and-drop reordering."
      }
    ],
    previewPanels: [
      { label: "Security", iconName: "Lock" },
      { label: "Journal", iconName: "CalendarDays" },
      { label: "Identity", iconName: "FolderHeart" }
    ],
  },
  {
    id: "fastbeat-media-player",
    batchId: "BATCH_01",
    pinned: false,
    title: "FastBeat Media Player",
    subtitle: "My Journey with Modern Android Development",
    description: "A clean, ad-free media player built to master Jetpack Compose and the Media3 ExoPlayer stack.",
    longDescription: "I was tired of ad-heavy media players, so I built my own. FastBeat was my project to learn the latest Android standards: Jetpack Compose for UI, Media3 for playback, and Hilt for dependency injection. It taught me how to handle background services and build a high-performance media library using Room.",
    techStack: ["Kotlin", "Jetpack Compose", "Media3", "Room", "Hilt/Dagger", "Coroutines/Flow"],
    demoKind: "fastbeat",
    repoUrl: "https://github.com/ajay99511/FastBeat",
    highlights: [
      "Learned the latest Android UI patterns using Jetpack Compose and Material 3.",
      "Explored complex background processing with Media3 ExoPlayer and Foreground Services.",
      "Built a robust local media database using Room with Coroutines and Flow.",
      "Implemented a Clean Architecture-lite stack to keep the playback logic modular."
    ],
    stats: {
      nodes: 5,
      complexity: "Modern Android Stack",
    },
    contextBanner: {
      challenge: "Building a media player that feels smooth while handling thousands of local files in the background is tough.",
      solution: "Leveraged Kotlin Coroutines for non-blocking I/O and Jetpack Compose for a lag-free, reactive UI."
    },
    quickStartSteps: [
      {
        title: "Playback Engine",
        description: "Play a track to see the Media3 integration and the custom queue system I built."
      },
      {
        title: "Listening Stats",
        description: "Check the analytics—I implemented this to track my personal listening habits."
      },
      {
        title: "Library View",
        description: "See how I used Room to index local files for near-instant searching and sorting."
      }
    ],
    previewPanels: [
      { label: "Player", iconName: "PlayCircle" },
      { label: "Library", iconName: "Music" },
      { label: "Stats", iconName: "BarChart3" }
    ],
  },
  {
    id: "personal-assist",
    batchId: "BATCH_01",
    pinned: false,
    title: "PAW (Personal Agent Workbench)",
    subtitle: "Centralizing My Local AI Tools",
    description: "A Tauri-based desktop environment I built to manage local LLMs and autonomous agent experiments.",
    longDescription: "I wanted a single place to experiment with local AI without jumping between terminals. PAW is my exploration into Tauri and Rust. I built it to provide a secure, UI-driven way to manage local models, handle agent permissions, and monitor system health. It taught me how to bridge a React frontend with a high-performance Rust backend.",
    techStack: ["React", "Vite", "Tauri", "TypeScript", "TanStack Query", "Rust"],
    demoKind: "personal-assist",
    repoUrl: "https://github.com/ajay99511/PAW",
    highlights: [
      "Learned to build cross-platform desktop apps with Tauri and Rust integration.",
      "Designed a custom permission system for exposing local directories to AI agents.",
      "Implemented a dual-mode chat interface with support for RAG and streaming responses.",
      "Built a system monitor to track local LLM performance and background agent tasks."
    ],
    stats: {
      nodes: 6,
      complexity: "Cross-Platform AI Tooling",
    },
    contextBanner: {
      challenge: "Running local AI agents can be messy and hard to monitor. I wanted a 'dashboard' for my experiments.",
      solution: "A unified desktop interface that bridges web technologies with native OS-level capabilities via Rust."
    },
    quickStartSteps: [
      {
        title: "Agent Chat",
        description: "Test the chat interface—I built this with streaming support for local Ollama models."
      },
      {
        title: "Workspace Prep",
        description: "See how I designed the workspace view to securely share folders with AI agents."
      },
      {
        title: "System Monitor",
        description: "Check the sidebar—I added real-time health checks for the local AI backend."
      }
    ],
    previewPanels: [
      { label: "Chat", iconName: "MessageSquare" },
      { label: "Security", iconName: "FolderKey" },
      { label: "Agents", iconName: "Cpu" }
    ],
  },
  {
    id: "dl-algorithms",
    batchId: "BATCH_01",
    title: "Deep Learning Mastery",
    subtitle: "Learning AI from First Principles",
    description: "A collection of core DL algorithms I built from scratch in PyTorch to truly understand how they work.",
    longDescription: "I believe the best way to learn is to build. I created this repository to master Deep Learning from the ground up—moving from basic MLPs to Transformers and RLHF. Every model here is implemented without high-level abstractions, teaching me the intricate details of backpropagation, attention mechanisms, and model alignment.",
    techStack: ["Python", "PyTorch", "Transformers", "Hypothesis", "Machine Learning"],
    demoKind: "dl-algorithms",
    repoUrl: "https://github.com/ajay99511/DL_Algorithms",
    highlights: [
      "Implemented Transformers and Causal Self-Attention from scratch to master the math.",
      "Explored the full RLHF pipeline, including Reward Modeling and PPO alignment.",
      "Learned to use Hypothesis for property-based testing of neural network layers.",
      "Developed a custom training loop with structured logging and checkpointing for CPU-only runs."
    ],
    stats: {
      nodes: 6,
      complexity: "First-Principles AI",
    },
    contextBanner: {
      challenge: "Frameworks like Hugging Face hide the 'magic'. I wanted to peel back the layers and build everything myself.",
      solution: "A transparent library of model implementations focused on readability and mathematical correctness."
    },
    quickStartSteps: [
      {
        title: "View Architectures",
        description: "Explore the GPT and Vision Transformer code—I built these using raw PyTorch tensors."
      },
      {
        title: "Study RLHF",
        description: "Check out the alignment logic—I implemented this to learn how to 'steer' AI models."
      },
      {
        title: "Simulate Training",
        description: "Run the model demo to see the training loop and loss metrics I designed for CPU learning."
      }
    ],
    previewPanels: [
      { label: "Terminal", iconName: "TerminalSquare" },
      { label: "Code", iconName: "Code2" },
      { label: "Math", iconName: "Network" }
    ],
  },
];

export const projects: Project[] = rawProjects.map((p, i) => ({
  ...p,
  index: (i + 1).toString().padStart(2, "0"),
}));

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
