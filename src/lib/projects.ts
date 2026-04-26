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
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
