# Agent Prompt: Integrate New Project into Portfolio

**Instructions for the User:** 
Copy the prompt below and provide it to the AI agent whenever you want to add a new project to your portfolio. Replace `[INSERT_PROJECT_PATH_HERE]` with the absolute path to the project you want to integrate.

---

## The Prompt

**Goal:** Integrate a new project into the portfolio website by creating a highly faithful, interactive UI replica (or Technical Showcase) and registering it within the portfolio's data structures.

**Target Project Path:** `[INSERT_PROJECT_PATH_HERE]`
**Portfolio Path:** (The current working directory)

Please execute the following steps meticulously:

### Phase 1: Deep Source Code Analysis & Archetype Selection
The target project might be built in any technology. You must study its actual source code before writing any code for the portfolio demo.

1. **Determine the Archetype:**
   - **UI Application:** Is it an Android/Kotlin, Flutter/Dart, iOS, or React app with a distinct graphical interface?
   - **Non-UI / Algorithmic:** Is it a Deep Learning repo, backend API, CLI tool, or headless framework?
2. **If UI Application:**
   - Extract Theme Tokens: Find exact color palettes (Hex/RGB), typography scales, and gradients. **Do not guess colors.** Map source colors to CSS styles.
   - Map Navigation: Understand the routing hierarchy (bottom tabs, sidebar, pagers).
   - Study Key Screens: Analyze layout patterns, padding, shapes, and interactive elements.
3. **If Non-UI / Algorithmic:**
   - Explore the core algorithmic logic (e.g., neural network architectures, API endpoints).
   - Identify the 3 most complex/impressive source files to showcase.
   - Extract sample log outputs, terminal metrics, or JSON responses to use in the mock terminal.

### Phase 2: Build the Demo Component
Create a standalone React component (e.g., `src/components/demos/MyProjectDemo.tsx`) that acts as an interactive demo of the target project.

**If UI Application (Faithful UI Replica):**
1. **Strict Fidelity:** The demo MUST look and feel exactly like the real application. Apply the exact color hex codes, layout structures, and navigation models extracted in Phase 1.
2. **Self-Contained State:** Use React state (`useState`) to mock interactions and navigation.

**If Non-UI / Algorithmic (Technical Showcase):**
1. **Simulated IDE Environment:** Build a glassmorphic VS Code-style editor layout.
2. **File Explorer & Code Viewer:** Create a left sidebar file tree and a main panel displaying syntax-highlighted code snippets from the most complex files extracted in Phase 1.
3. **Simulated Terminal:** Build a terminal panel at the bottom streaming dynamic, mock execution logs (e.g., PyTorch training loss, cURL requests) relevant to the project type.

**For Both Archetypes:**
- Import and render the `DemoQuickStart` component to provide a guided tour of the replica/showcase.

### Phase 3: Portfolio Integration
Follow the canonical rules defined in `PROJECT_TEMPLATE.md` to register the new project.

1. **`src/types/index.ts`:** Update the `demoKind` union type with a new slug for this project.
2. **`src/lib/projects.ts`:** Add a complete entry to the `projects` array. Ensure you provide high-quality, project-specific copy for:
   - `description` and `longDescription`
   - `highlights` and `stats`
   - `contextBanner` (Challenge → Solution)
   - `quickStartSteps` (Exactly 3 steps mapping to the demo's functionality)
   - `previewPanels` (Exactly 3 panels with appropriate `iconName`s mapped from `iconMap` in `ProjectCard.tsx`)
   - `pinned` — Set to `true` **only** if this project should replace an existing pinned project on the landing page (max 4 pinned). Otherwise omit or set to `false`.
3. **`src/components/ProjectInteractiveView.tsx`:** Import your new demo component and register it in the `renderDemo()` switch statement.
4. **Icons:** If the `previewPanels` require new icons, import them from `lucide-react` into `src/components/ProjectCard.tsx` and add them to the `iconMap`.

### Phase 4: Verification
1. Run `npm run build` to ensure there are no TypeScript or module resolution errors.
2. Ensure the demo is fully responsive and interactive without throwing runtime errors.
3. Verify the project appears on the `/projects` gallery page.
4. If `pinned: true` was set, verify it appears in the Pinned Works section on the homepage (max 4 total).

**Remember:** The success of this integration depends entirely on how accurately the web demo mimics the target project's actual UI, or how impressively it showcases the backend code in the IDE simulator.
