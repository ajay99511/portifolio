# Agent Prompt: Integrate New Project into Portfolio

**Instructions for the User:** 
Copy the prompt below and provide it to the AI agent whenever you want to add a new project to your portfolio. Replace `[INSERT_PROJECT_PATH_HERE]` with the absolute path to the project you want to integrate.

---

## The Prompt

**Goal:** Integrate a new project into the portfolio website by creating a highly faithful, interactive UI replica and registering it within the portfolio's data structures.

**Target Project Path:** `[INSERT_PROJECT_PATH_HERE]`
**Portfolio Path:** (The current working directory)

Please execute the following steps meticulously:

### Phase 1: Deep Source Code Analysis
The target project might be built in any technology (Android/Kotlin, Flutter/Dart, React, etc.). You must study its actual source code before writing any UI code for the portfolio demo.

1. **Explore the Architecture:** Scan the target project directory to locate the UI layer, theme definitions, and navigation structure.
2. **Extract Theme Tokens:** Find the exact color palettes (Hex/RGB values), typography scales, and gradient brushes used in the app. **Do not guess or invent colors.** You must map the exact source colors to CSS styles.
3. **Map the Navigation:** Understand the routing hierarchy. Does it use bottom tabs? A sidebar? Swipeable pagers? Document this structure.
4. **Study Key Screens:** Identify the 3-4 most important screens that convey the app's core functionality. Analyze their layout patterns, padding, component shapes (e.g., border radius, shadows), and interactive elements.

### Phase 2: Build the Faithful UI Replica
Create a standalone React component (e.g., `src/components/demos/MyProjectDemo.tsx`) that acts as an interactive demo of the target project.

1. **Strict Fidelity:** The demo MUST look and feel exactly like the real application. Apply the exact color hex codes, layout structures, and navigation models extracted in Phase 1.
2. **Self-Contained State:** Use React state (`useState`) to mock interactions, navigation between tabs/screens, and core flows.
3. **QuickStart Integration:** Import and render the `DemoQuickStart` component to provide a guided tour of the replica.

### Phase 3: Portfolio Integration
Follow the canonical rules defined in `PROJECT_TEMPLATE.md` to register the new project.

1. **`src/types/index.ts`:** Update the `demoKind` union type with a new slug for this project.
2. **`src/lib/projects.ts`:** Add a complete entry to the `projects` array. Ensure you provide high-quality, project-specific copy for:
   - `description` and `longDescription`
   - `highlights` and `stats`
   - `contextBanner` (Challenge → Solution)
   - `quickStartSteps` (Exactly 3 steps mapping to the demo's functionality)
   - `previewPanels` (Exactly 3 panels with appropriate `iconName`s mapped from `iconMap` in `ProjectArchive.tsx`)
3. **`src/components/ProjectInteractiveView.tsx`:** Import your new demo component and register it in the `renderDemo()` switch statement.
4. **Icons:** If the `previewPanels` require new icons, import them from `lucide-react` into `src/components/ProjectArchive.tsx` and add them to the `iconMap`.

### Phase 4: Verification
1. Run `npm run build` to ensure there are no TypeScript or module resolution errors.
2. Ensure the demo is fully responsive and interactive without throwing runtime errors.

**Remember:** Do not create a generic or "placeholder" UI. The success of this integration depends entirely on how accurately the web demo mimics the target project's actual source code design.
