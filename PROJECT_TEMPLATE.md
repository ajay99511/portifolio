# Portfolio Project Reference Template

> **Purpose**: This document is the canonical reference for AI agents and contributors adding new projects to the portfolio. Follow this guide end-to-end to ensure each project's interactive demo is a **faithful UI replica** of the real application, not a generic placeholder.

---

## Table of Contents

1. [Source Code Analysis (MANDATORY)](#1-source-code-analysis-mandatory)
2. [Data Entry: `projects.ts`](#2-data-entry-projectsts)
3. [Type Reference: `types/index.ts`](#3-type-reference-typesindexts)
4. [Demo Component Contract](#4-demo-component-contract)
5. [Quick Start Steps Format](#5-quick-start-steps-format)
6. [Preview Panels Format](#6-preview-panels-format)
7. [Context Banner Format](#7-context-banner-format)
8. [Registration Checklist](#8-registration-checklist)
9. [Example: Full Project Entry](#9-example-full-project-entry)

---

## 1. Source Code Analysis (MANDATORY)

> ⚠️ **This is the most critical step.** The interactive demo must look and behave like the real application. You MUST study the source code first — never invent a UI from scratch.

### 1.1 Discovery Phase & Archetype Selection

Given a project path (e.g., `C:\Users\ajaye\AndroidStudioProjects\OfflineMediaPlayer\...` or `C:\github\DL_Algorithms`), you must first determine the project archetype:

**Option A: UI Application** (Android, React, Flutter, etc.)
1. **Map the project structure** — List directories to understand architecture layers (UI, data, navigation, theme).
2. **Identify the UI entry point** — Find `MainScreen`, `MainActivity`, `App.tsx`, etc.
3. **Extract navigation structure** — Determine tabs, screens, and routing hierarchy.
4. **Read theme files completely** — Extract exact color values, typography scales, and semantic tokens.
5. **Read major UI screen files** — Understand layout structure, component hierarchy, and styling.

**Option B: Non-UI / Algorithmic / Backend** (Deep Learning Models, CLIs, APIs)
1. **Explore the core logic** — Map the directory to find where the actual algorithms, endpoints, or pipelines live.
2. **Identify complex snippets** — Find the 3 most complex/impressive source files (e.g., a PyTorch training loop, an advanced SQL query, a Rust thread pool).
3. **Extract log/terminal data** — Find sample print statements, logging output, or metrics that the system generates during execution.

### 1.2 UI Extraction Checklist

For each screen you plan to replicate, extract and document:

| Element               | What to Extract                                      |
| --------------------- | ---------------------------------------------------- |
| **Layout Structure**  | Column/Row nesting, Scaffold regions, padding values |
| **Color Tokens**      | Background, surface, text primary/secondary, accent  |
| **Typography**        | Font sizes, weights, letter-spacing, font families   |
| **Component Details** | Card shapes, border radius, elevation/shadow values  |
| **Icon Usage**        | Exact icon names (Material, Lucide equivalents)      |
| **Gradient Brushes**  | Exact gradient colors and directions                 |
| **Navigation Pattern**| Bottom tabs, sidebar, pager with sub-tabs            |
| **Interactive State** | Play/pause, selection, active tab highlighting       |

### 1.3 Color Mapping

Translate the source project's colors into CSS. Example from FastBeat:

```
// Android Source (Kotlin)               →  CSS Equivalent
DarkSurfaceBase = Color(0xFF141418)      →  background: #141418
DarkSurfaceContainer = Color(0xFF1C1C22) →  surface cards: #1C1C22
DarkSurfaceContainerHigh = Color(0xFF242430) → elevated surfaces: #242430
DarkTextPrimary = Color(0xFFF0F0F5)      →  text-primary: #F0F0F5
DarkTextSecondary = Color(0xFFB0B0C0)    →  text-secondary: #B0B0C0
DarkTextTertiary = Color(0xFF707088)     →  text-muted: #707088
primaryColor = Color(0xFFFF5500)         →  accent: #FF5500
```

### 1.4 Navigation Mapping

Map the source app's navigation to web demo equivalents:

```
// Android Source                →  Web Demo
NavigationBar (4 tabs)          →  Bottom tab bar (fixed)
  Tab 0: Videos                 →  Tab component with icon + label
  Tab 1: Music                  →  Tab component with icon + label
  Tab 2: Images                 →  Tab component with icon + label
  Tab 3: Stats                  →  Tab component with icon + label
FastBeatHeader (per-tab)        →  Sticky header with logo + section title
ScrollableTabRow (sub-tabs)     →  Inner tab row (e.g., TRACKS / ALBUMS / PLAYLISTS)
MiniPlayer (persistent bottom)  →  Fixed bottom bar with progress gradient
```

### 1.5 Key Source Files by Platform

| Platform              | Look For                                        |
| --------------------- | ----------------------------------------------- |
| **Android (Compose)** | `MainScreen.kt`, `ui/screens/*.kt`, `ui/theme/Color.kt`, `ui/theme/Theme.kt`, `ui/components/*.kt`, `ui/navigation/*.kt` |
| **Flutter**           | `main.dart`, `lib/screens/*.dart`, `lib/widgets/*.dart`, `lib/theme/*.dart`, `lib/routes/*.dart` |
| **React / Next.js**   | `App.tsx`, `pages/*.tsx`, `components/*.tsx`, `styles/*.css`, `lib/*.ts` |

---

## 2. Data Entry: `projects.ts`

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
  demoKind: "generic",               // "chronos" | "dayvault" | "generic" | "fastbeat" (or add new)
  highlights: [                      // 3-5 bullet-point achievements
    "Highlight one.",
    "Highlight two.",
  ],
  stats: {
    nodes: 5,                        // Numeric complexity metric
    complexity: "Pattern Label",     // e.g., "Offline-First + MVVM"
  },

  // --- Optional Fields ---
  pinned: true,                      // Feature on landing page (max 4 pinned). Defaults to false.
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

### Pinned Projects

The `pinned` field controls whether a project appears in the **Pinned Works** section on the landing page. Only up to **4** projects can be pinned at a time (enforced by `getPinnedProjects()` in `projects.ts`). Projects without `pinned: true` are only visible on the `/projects` gallery page.

- Set `pinned: true` to feature a project on the homepage
- Omit or set `pinned: false` for projects that should only appear in the full gallery
- If more than 4 projects have `pinned: true`, only the first 4 (by array order) are shown

---

## 3. Type Reference: `types/index.ts`

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
| `PlayCircle`   | Media playback icon       |
| `Music`        | Audio/music icon          |
| `MessageSquare`| Chat/messaging icon       |
| `FolderKey`    | Secure folder icon        |
| `Cpu`          | Processing/compute icon   |

> **To add a new icon**: Import it from `lucide-react` in `src/components/ProjectCard.tsx` and add it to the `iconMap` object. The `ProjectCard` is the shared component used by both the homepage Pinned Works section and the `/projects` gallery.

---

## 4. Demo Component Contract

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
5. **Faithful UI replica** — the demo MUST replicate the actual app's:
   - Exact navigation structure (tabs, sub-tabs, sidebar)
   - Color palette from the source project's theme files
   - Typography hierarchy (font weights, sizes, letter-spacing)
   - Layout patterns (header structure, card shapes, spacing)
   - Interactive patterns (mini-player, selection states, progress bars)
6. **QuickStart overlay** — import and render `DemoQuickStart`:

```tsx
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

export default function MyProjectDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "my-project-id");

  return (
    <div className="... relative">
      {/* Demo content — must match the real app's look */}

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

### UI Fidelity Rules

**For UI Applications:**
- **DO** use the exact hex colors from the source app's theme files
- **DO** replicate the navigation hierarchy (e.g., bottom tabs with sub-tab rows inside)
- **DO** match component shapes (border-radius values, elevation shadows)
- **DO** use gradient brushes that match the source (e.g., MiniPlayer progress gradient)
- **DO NOT** invent a sidebar layout when the source app uses bottom tabs
- **DO NOT** use arbitrary green/blue accents when the source app uses `#FF5500` orange

**For Non-UI / Algorithmic Projects (Technical Showcase):**
- **DO** build an interactive IDE simulation (e.g., a VS Code-style layout).
- **DO** include a file tree sidebar to navigate between core algorithm files.
- **DO** use an integrated terminal view at the bottom to simulate running logs (e.g., training metrics, CLI output).
- **DO** syntax-highlight the actual code extracted from the repo.
- **DO NOT** invent a fake consumer UI (e.g., do not make a "Face Recognition Dashboard" if the project is just a Python script; show the script in an IDE).

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

## 5. Quick Start Steps Format

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

## 6. Preview Panels Format

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

## 7. Context Banner Format

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

## 8. Registration Checklist

Use this checklist when adding a new project:

- [ ] **Study the source code** — Read theme, navigation, screens, and component files
- [ ] **Map colors** — Extract hex values from theme files for exact replication
- [ ] **Map navigation** — Document tab structure, sub-tabs, persistent elements
- [ ] Add project entry to `src/lib/projects.ts` with all required fields
- [ ] Set `pinned: true` if this project should appear on the landing page (max 4 pinned)
- [ ] Update `demoKind` union in `src/types/index.ts` if adding a new kind
- [ ] Create demo component at `src/components/demos/{Name}Demo.tsx`
- [ ] Ensure demo replicates the source app's exact UI (colors, layout, navigation)
- [ ] Integrate `DemoQuickStart` overlay in the demo component
- [ ] Register demo in `renderDemo()` in `src/components/ProjectInteractiveView.tsx`
- [ ] Add new icon names to `iconMap` in `src/components/ProjectCard.tsx` (if needed)
- [ ] Include `contextBanner`, `quickStartSteps`, and `previewPanels` data
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Visually verify on homepage pinned works section (max 4 cards with preview strip)
- [ ] Visually verify on `/projects` gallery page (all projects displayed)
- [ ] Visually verify on project detail page (context banner + demo + quickstart)

---

## 9. Example: Full Project Entry

Below is a complete example based on the Chronos Planner entry:

```typescript
{
  id: "chronos-planner",
  batchId: "BATCH_01",
  index: "01",
  pinned: true,                    // Featured on landing page
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
