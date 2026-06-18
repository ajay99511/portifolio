---
slug: portfolio-architecture-integration
title: "Architecting a Multi-Archetype Portfolio: From UI Replicas to AI Workbenches"
description: "A deep dive into the technical decisions, component architecture, and integration strategy for merging diverse projects into a unified Next.js portfolio."
author: Ajay
publishedAt: 2026-06-17
updatedAt: 2026-06-17
tags:
  - architecture
  - nextjs
  - react
  - system-design
category: Engineering
readingTimeMinutes: 12
featured: true
draft: false
---

## Intent & Context

A portfolio is more than just a list of links; it is a product in itself. The core technical and business objective of our recent engineering sprint was to integrate seven highly diverse projects into a unified Next.js portfolio. 

These projects spanned entirely different technology stacks and archetypes:
- **Algorithmic/Non-UI:** Machine Learning models and APIs (ICM Fraud Detection, Diabetes XAI API, Groundwater Analytics).
- **UI Applications:** Full-stack and cross-platform apps (GitScripe with its agentic backend, MD Explorer built in Flutter, and SocialNetwork built with Angular and .NET Core).
- **Dashboard Interfaces:** RepoPulse, which required a massive UI overhaul to align with a new "Cyberpunk" design language.

Our goal was not to simply embed static screenshots, but to build **highly faithful, interactive UI replicas** and **technical IDE showcases** using React. We needed a system that allowed visitors to experience the "feel" and logic of these applications without requiring us to host heavy backend infrastructure (like SQL Server databases or PyTorch environments) just for the portfolio.

## Architectural & Logic Decisions

To handle the sheer variety of projects, we established a strict **Archetype Pattern**.

### 1. The Archetype Division
Before writing any code, we analyzed the source code of each target project to determine its archetype:
*   **UI Applications (Faithful Replicas):** For projects like the Angular/.NET SocialNetwork or the Flutter MD Explorer, we extracted exact theme tokens (e.g., `#E95420` Ubuntu Orange) and layout patterns. We used isolated React state (`useState`) to mock routing, tabs, and interactions.
*   **Non-UI / Algorithmic (Technical Showcases):** For Python/ML projects, visual replication wasn't applicable. Instead, we designed a **Simulated IDE Environment**. We created a glassmorphic VS Code-style layout featuring a left sidebar file tree, a main syntax-highlighted code viewer, and a bottom terminal panel streaming dynamic, mock execution logs (e.g., Optuna Bayesian optimization trials or SHAP value calculations).

### 2. Isolated State Management
We explicitly chose to keep state management local to each demo component rather than using a global store (like Zustand or Redux). By encapsulating state, we ensured that interacting with the *GitScripe* chat interface wouldn't accidentally trigger a re-render or leak state into the *SocialNetwork* message simulator. For asynchronous backend simulation, we utilized standard `useEffect` hooks with `setInterval` to mock network latency and stream terminal outputs.

### 3. Unified Theming via CSS Variables
While strict replicas required hardcoded hex values, projects native to the portfolio's ecosystem (like RepoPulse) needed to seamlessly blend in. We refactored RepoPulse to utilize the portfolio's global CSS variables (`--brand-neon`, `--surface-bg`, `--surface-border`). This ensured that the cyberpunk aesthetic remained consistent and reacted natively to top-level theme changes.

## Technical Implementation (The "How")

### The Data Flow Contract
We expanded our type definitions in `src/types/index.ts` to support the new projects, extending the `demoKind` union type. This ensured type-safe routing across the application.

```typescript
export interface Project {
  // ...
  demoKind: "chronos" | "dayvault" | "gitscripe" | "md-explorer" | "social-network" | "db-pred" | "sm-pred" | "repo-pulse";
}
```

The single source of truth for all metadata, highlights, and quick-start steps was centralized in `src/lib/projects.ts`. 

### The Render Factory
To bridge the data layer and the presentation layer, we updated the `ProjectInteractiveView` component. It acts as a factory, inspecting the `demoKind` property and dynamically rendering the appropriate interactive component.

```tsx
import GitScripeDemo from "@/components/demos/GitScripeDemo";
import SocialNetworkDemo from "@/components/demos/SocialNetworkDemo";
// ... other imports

function renderDemo(project: Project) {
  switch (project.demoKind) {
    case "gitscripe":
      return <GitScripeDemo />;
    case "social-network":
      return <SocialNetworkDemo />;
    // ...
    default:
      return (
        <div className="h-full border border-zinc-800 rounded-lg p-6 text-zinc-400 font-mono text-xs uppercase">
          No interactive demo configured.
        </div>
      );
  }
}
```

### Simulating Real-time Execution
For the IDE showcases, simulating a live terminal was critical for demonstrating algorithmic logic. We implemented a robust hook pattern to stream logs over time, mimicking epoch training or cURL requests:

```typescript
useEffect(() => {
  if (!isRunning) return;
  
  let step = 0;
  const interval = setInterval(() => {
    step++;
    const newLog = activeModule.termSimulation(step);
    
    setLogs(prev => {
      const next = [...prev, newLog];
      return next.length > 50 ? next.slice(next.length - 50) : next; // Keep memory footprint small
    });
    
    if (step >= activeModule.maxSteps) {
      setIsRunning(false);
      clearInterval(interval);
    }
  }, 400);
  
  return () => clearInterval(interval);
}, [isRunning, activeModule]);
```

## Challenges & Roadblocks

Building and integrating these complex components wasn't without friction. We encountered a few critical roadblocks during the CI/CD build phase (`npm run build`):

1.  **Icon Resolution & Version Mismatch:**
    We attempted to import the `Github` icon from `lucide-react`, which resulted in a fatal Turbopack build error: `Export Github doesn't exist in target module`. Deep diving into the `package.json` and grep-searching the node modules revealed a versioning discrepancy (using a `0.x` runtime despite a `^1.11.0` package declaration). 
    *Resolution:* We rapidly pivoted to fallback icons (`Box`, `Folder`, `Book`) that were statically verified to exist within the mapped `ProjectCard.tsx` dependencies.

2.  **Strict React DOM Property Validation:**
    While styling the glassmorphic overlays in RepoPulse, an inline style of `backdropBlur: "20px"` caused a TypeScript compilation failure. React strictly enforces standard CSS property mapping.
    *Resolution:* We surgically corrected the property to `backdropFilter: "blur(20px)"`, satisfying the DOM type checker and restoring the visual effect.

3.  **State Constraints and Curation:**
    Our architectural guidelines dictate a maximum of 4 pinned projects on the landing page. As we registered the new integrations, we exceeded this limit.
    *Resolution:* We systematically reviewed the `projects.ts` file, updating the boolean flags to unpin older projects (like Chronos Planner and DayVault) in favor of the newly minted enterprise-grade and agentic showcases (SocialNetwork, GitScripe, RepoPulse, MD Explorer).

## Future Considerations

While the current architecture is robust, there are a few technical debts and scaling considerations we need to track:

*   **Component Lazy Loading:** Currently, `ProjectInteractiveView.tsx` statically imports every demo component. As the portfolio grows, this will bloat the initial JavaScript payload. We should implement Next.js `next/dynamic` imports so that the client only downloads the specific demo code requested.
*   **Reusable Simulator Primitives:** The "IDE Simulator" (file tree + terminal + code viewer) layout is duplicated across `ICMFraudDetectionDemo`, `DbPredDemo`, and `SMPredDemo`. Abstracting this into a unified `<TechnicalShowcaseShell />` component would reduce code duplication by 60% across non-UI projects.
*   **Enhanced Accessibility:** Ensure all custom tab implementations and simulated terminals announce correctly to screen readers, particularly when terminal logs are updating dynamically.
