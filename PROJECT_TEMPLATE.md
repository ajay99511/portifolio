# Portfolio Project Reference Template

> **Purpose**: This document is the canonical reference for AI agents and contributors adding new projects to the portfolio. Follow this guide end-to-end to ensure consistency across all project entries.

---

## Table of Contents

1. [Data Entry: `projects.ts`](#1-data-entry-projectsts)
2. [Type Reference: `types/index.ts`](#2-type-reference-typesindexts)
3. [Demo Component Contract](#3-demo-component-contract)
4. [Quick Start Steps Format](#4-quick-start-steps-format)
5. [Preview Panels Format](#5-preview-panels-format)
6. [Context Banner Format](#6-context-banner-format)
7. [Registration Checklist](#7-registration-checklist)
8. [Example: Full Project Entry](#8-example-full-project-entry)

---

## 1. Data Entry: `projects.ts`

**File**: `src/lib/projects.ts`

Add a new object to the `projects` array. Every project must satisfy the `Project` interface defined in `src/types/index.ts`.

```typescript
{
  // --- Required Fields ---
  id: "kebab-case-unique-id",        // URL-safe slug, used in routes
  batchId: "BATCH_XX",               // Grouping identifier (e.g., BATCH_01)
  index: "03",                       // Zero-padded display index
  title: "Project Title",            // Display name (rendered uppercase)
  subtitle: "Short tagline",         // Rendered as mono-orange subheader
  description: "One-liner.",         // Archive card description (~20 words)
  longDescription: "...",            // Detailed description for project page (~50 words)
  techStack: ["Tech1", "Tech2"],     // Array of technology names
  demoKind: "generic",               // "chronos" | "dayvault" | "generic" (or add new)
  highlights: [                      // 3-5 bullet-point achievements
    "Highlight one.",
    "Highlight two.",
  ],
  stats: {
    nodes: 5,                        // Numeric complexity metric
    complexity: "Pattern Label",     // e.g., "Offline-First + MVVM"
  },

  // --- Optional Fields ---
  repoUrl: "https://github.com/...", // GitHub repo link (omit if private)
  contextBanner: {                   // Challenge → Solution framing
    challenge: "The problem this solves",
    solution: "How this project solves it",
  },
  quickStartSteps: [                 // 3 guided onboarding steps
    { title: "Step Title", description: "What to do in this step." },
  ],
  previewPanels: [                   // 3 visual preview panels for archive cards
    { label: "Panel Label", iconName: "LucideIconName" },
  ],
  walkthroughSteps: [],              // Optional: for WalkthroughEngine (legacy)
}
```

---

## 2. Type Reference: `types/index.ts`

The full `Project` interface is defined in `src/types/index.ts`. Key sub-types:

| Interface        | Fields                              | Usage                        |
| ---------------- | ----------------------------------- | ---------------------------- |
| `QuickStartStep` | `title`, `description`              | Guided overlay on first visit |
| `PreviewPanel`   | `label`, `iconName`                 | Archive card visual preview   |
| `ContextBanner`  | `challenge`, `solution`             | Problem/solution bar on detail page |

### Available `iconName` values for PreviewPanels

These must match keys in the `iconMap` in `ProjectArchive.tsx`:

| iconName       | Icon Description          |
| -------------- | ------------------------- |
| `CalendarDays` | Calendar/schedule icon    |
| `BarChart3`    | Analytics/chart icon      |
| `Bolt`         | Lightning/focus icon      |
| `Lock`         | Security/lock icon        |
| `FolderHeart`  | Collections/favorite icon |

> **To add a new icon**: Import it from `lucide-react` in `ProjectArchive.tsx` and add it to the `iconMap` object.

---

## 3. Demo Component Contract

**Directory**: `src/components/demos/`

### File naming
```
{ProjectName}Demo.tsx    // e.g., RepoPulseDemo.tsx
```

### Component requirements

1. **Default export** a React component with no required props
2. Mark as `"use client"` (client component)
3. **Self-contained state** — all demo state lives inside the component
4. Use `useRouteHistory` from `./useRouteHistory` for internal navigation
5. **QuickStart overlay** — import and render `DemoQuickStart`:

```tsx
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

export default function MyProjectDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "my-project-id");

  return (
    <div className="... relative">
      {/* Demo content */}

      {/* Quick Start Overlay */}
      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart
          projectId="my-project-id"
          steps={projectData.quickStartSteps}
          onComplete={() => setQuickStartDone(true)}
        />
      )}
    </div>
  );
}
```

### Registration

Register the demo in `src/components/ProjectInteractiveView.tsx`:

```tsx
import MyProjectDemo from "@/components/demos/MyProjectDemo";

function renderDemo(project: Project) {
  // ... existing cases
  if (project.demoKind === "myproject") {
    return <MyProjectDemo />;
  }
  // ...
}
```

> **Important**: Also update the `demoKind` union type in `src/types/index.ts` to include the new kind.

---

## 4. Quick Start Steps Format

Each project should have exactly **3 steps** that walk a visitor through the key flows in ~15 seconds.

### Guidelines

- **Step 1**: First interaction (e.g., "unlock", "view the main screen")
- **Step 2**: Core feature exploration (e.g., "create an item", "browse data")
- **Step 3**: Secondary feature discovery (e.g., "check analytics", "manage settings")

### Format

```typescript
quickStartSteps: [
  {
    title: "Action-Oriented Title",           // 3-6 words, imperative
    description: "Clear instruction. What to click, what happens, what to notice.",  // 1-2 sentences
  },
]
```

---

## 5. Preview Panels Format

Each project should have exactly **3 panels** representing the most visually distinct screens.

### Guidelines

- Choose screens that convey the app's personality at a glance
- Use icons that match the screen's purpose
- Labels should be 1-2 words max

```typescript
previewPanels: [
  { label: "Schedule", iconName: "CalendarDays" },
  { label: "Analytics", iconName: "BarChart3" },
  { label: "Focus HUD", iconName: "Bolt" },
]
```

---

## 6. Context Banner Format

One sentence each for challenge and solution. The banner renders as:

```
⚡ CHALLENGE: [challenge text]  →  SOLUTION: [solution text]
```

### Guidelines

- **Challenge**: State the problem the project solves (~10-15 words)
- **Solution**: State how this project solves it (~10-15 words)
- Avoid generic statements — be specific to the project's unique value

```typescript
contextBanner: {
  challenge: "Productivity tools lack deep-focus workflow support and actionable analytics",
  solution: "A planner engine with schedule orchestration, templates, focus HUD, and real-time efficiency tracking",
}
```

---

## 7. Registration Checklist

Use this checklist when adding a new project:

- [ ] Add project entry to `src/lib/projects.ts` with all required fields
- [ ] Update `demoKind` union in `src/types/index.ts` if adding a new kind
- [ ] Create demo component at `src/components/demos/{Name}Demo.tsx`
- [ ] Integrate `DemoQuickStart` overlay in the demo component
- [ ] Register demo in `renderDemo()` in `src/components/ProjectInteractiveView.tsx`
- [ ] Add new icon names to `iconMap` in `src/components/ProjectArchive.tsx` (if needed)
- [ ] Include `contextBanner`, `quickStartSteps`, and `previewPanels` data
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Visually verify on homepage (archive card with preview strip)
- [ ] Visually verify on project detail page (context banner + demo + quickstart)

---

## 8. Example: Full Project Entry

Below is a complete example based on the Chronos Planner entry:

```typescript
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
  techStack: ["Flutter", "Dart", "Drift ORM", "SQLite", "Provider", "Window Manager"],
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
}
```
