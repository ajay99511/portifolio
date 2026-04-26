import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "chronos-planner",
    batchId: "BATCH_01",
    index: "01",
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
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
