# Implementation Plan: Responsiveness

## Overview

Make the portfolio site fully responsive across 320 px–1920 px by adding a mobile navigation drawer, conditionally suppressing the custom cursor on touch devices, applying fluid typography and spacing scales, fixing layout issues in `ProjectInteractiveView` and `AttachmentPreviewViewer`, ensuring all touch targets meet the 44 px minimum, and preventing horizontal overflow on every page. All changes are confined to CSS classes, component logic, and two new files (`MobileMenu.tsx`, `useFocusTrap.ts`). A test framework (Vitest + Testing Library + fast-check) is set up as the first task since none currently exists.

---

## Tasks

- [x] 1. Set up test infrastructure
  - Install and configure Vitest, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, and `fast-check` as dev dependencies
  - Create `vitest.config.ts` at the project root with jsdom environment, `globals: true`, and `setupFiles` pointing to a `src/test/setup.ts` that imports `@testing-library/jest-dom`
  - Create `src/test/setup.ts` with the jest-dom import
  - Add `"test": "vitest --run"` to `package.json` scripts
  - _Requirements: all (prerequisite for all test sub-tasks)_

- [x] 2. Patch `globals.css` — remove static `cursor-none`, add `--text-hero` variable
  - Remove `cursor-none` from the `body` `@apply` rule in `src/app/globals.css`; add a comment explaining it is applied conditionally by `CustomCursor` via JS
  - Add a `:root` block after the `@theme` block defining `--text-hero: clamp(2.5rem, 8vw, 9rem)`
  - _Requirements: 2.2, 2.4, 3.1_

- [x] 3. Implement `useFocusTrap` hook
  - [x] 3.1 Create `src/hooks/useFocusTrap.ts`
    - Export `function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void`
    - When `active` is `true`, query all focusable elements inside `containerRef.current` (selectors: `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`)
    - Intercept `keydown` on `document`; on `Tab` cycle forward through focusable elements; on `Shift+Tab` cycle backward; call `e.preventDefault()` in both cases
    - On activation, move focus to the first focusable element; on deactivation, restore focus to the element that was focused before activation
    - Handle the edge case of zero focusable elements gracefully (no-op, no throw)
    - _Requirements: 1.8_

  - [x] 3.2 Write unit tests for `useFocusTrap`
    - Test: Tab key cycles forward through focusable elements within the container
    - Test: Shift+Tab cycles backward
    - Test: focus is restored to the previously focused element when `active` becomes `false`
    - Test: zero focusable children — no error thrown
    - _Requirements: 1.8_

- [x] 4. Implement `MobileMenu` component
  - [x] 4.1 Create `src/components/MobileMenu.tsx`
    - Accept `interface MobileMenuProps { isOpen: boolean; onClose: () => void }`
    - Render a full-viewport semi-transparent backdrop `div` (click calls `onClose`) and a slide-in drawer panel using Framer Motion `AnimatePresence` + `motion.div` with `initial={{ x: "-100%" }}` / `animate={{ x: 0 }}` / `exit={{ x: "-100%" }}`
    - Drawer contains a close (`×`) button at the top-right with `min-w-[44px] min-h-[44px]`
    - Render three `<Link>` items: `/ Directory` → `/`, `/ Credentials` → `/certifications`, `/ Journals` → `/blogs`; each link has `min-h-[44px] flex items-center` and calls `onClose` via `onClick`
    - Use `useFocusTrap(drawerRef, isOpen)` to trap focus while open
    - When `isOpen` is `false`, set `aria-hidden="true"` and the `inert` attribute on the drawer element; remove both when open
    - _Requirements: 1.2, 1.3, 1.4, 1.7, 1.8, 6.2_

  - [x] 4.2 Write unit tests for `MobileMenu`
    - Test: when `isOpen` is `true`, all three nav links are present in the DOM
    - Test: when `isOpen` is `false`, drawer has `aria-hidden="true"`
    - Test: clicking a nav link calls `onClose`
    - Test: clicking the backdrop calls `onClose`
    - Test: clicking the close button calls `onClose`
    - _Requirements: 1.2, 1.3, 1.4, 1.7_

- [x] 5. Update `Navbar` — hamburger toggle, `MobileMenu` wiring, social icon tap targets
  - [x] 5.1 Add hamburger/close toggle and wire `MobileMenu` in `src/components/Navbar.tsx`
    - Add `const [menuOpen, setMenuOpen] = useState(false)` state
    - Render a hamburger button (`☰`) with `sm:hidden w-11 h-11 flex items-center justify-center` that sets `menuOpen(true)`; when `menuOpen` is `true` render a close icon (`×`) instead with the same sizing
    - Render `<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />` as a sibling inside `<header>` (after the inner container `div`)
    - Wrap each social icon `<a>` in a `<span className="min-w-[44px] min-h-[44px] flex items-center justify-center">` to meet the 44 px tap target requirement
    - _Requirements: 1.1, 1.5, 1.6, 1.7, 6.1, 6.3, 8.1, 8.4, 8.5_

  - [x] 5.2 Write unit tests for `Navbar`
    - Test: hamburger button is visible at viewport width < 640 px (has `sm:hidden` class)
    - Test: inline nav links have `hidden sm:flex` (hidden below sm)
    - Test: social icon wrappers have `min-w-[44px]` and `min-h-[44px]`
    - Test: clicking hamburger renders `MobileMenu` with `isOpen={true}`
    - _Requirements: 1.1, 1.5, 1.6, 6.1, 6.3_

- [~] 6. Checkpoint — ensure test infrastructure and new components compile
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Update `CustomCursor` — touch detection, conditional render, body class toggle
  - [x] 7.1 Add `(pointer: coarse)` detection and conditional rendering to `src/components/CustomCursor.tsx`
    - Add `const [isTouch, setIsTouch] = useState(true)` (defaults `true` for SSR safety — cursor hidden until hydration confirms pointer type)
    - In a `useEffect`, create `const mql = window.matchMedia('(pointer: coarse)')`, call `setIsTouch(mql.matches)`, add a `change` event listener that calls `setIsTouch(e.matches)`, and clean up the listener on unmount
    - In a second `useEffect` dependent on `[isTouch]`, call `document.body.classList.toggle('cursor-none', !isTouch)` to apply/remove the class conditionally
    - Add an early return `if (isTouch) return null` before the JSX so no DOM elements are rendered on touch devices
    - Remove any remaining `cursor-none` class from the root `div` in `ProjectInteractiveView` (handled globally now)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 7.2 Write property test for `CustomCursor` — cursor visibility matches pointer type (Property 1)
    - **Property 1: Cursor renders if and only if pointer type is `fine`**
    - **Validates: Requirements 2.1, 2.3, 2.7**
    - Use `fc.constantFrom('coarse', 'fine')` to generate pointer types
    - Mock `window.matchMedia` to return `{ matches: pointerType === 'coarse', addEventListener: ..., removeEventListener: ... }`
    - Render `<CustomCursor />` and assert: when `coarse` → `container` is empty; when `fine` → container has `.fixed` elements
    - Also generate sequences of pointer type changes with `fc.array(fc.constantFrom('coarse', 'fine'), { minLength: 1, maxLength: 10 })` and assert final rendered state matches the last value
    - Tag: `// Feature: responsiveness, Property 1: cursor renders iff pointer is fine`
    - Run with `{ numRuns: 100 }`
    - _Requirements: 2.1, 2.3, 2.7_

  - [x] 7.3 Write unit tests for `CustomCursor`
    - Test: when `matchMedia` returns `coarse`, component renders `null`
    - Test: when `matchMedia` returns `fine`, component renders cursor elements
    - Test: `document.body.classList` has `cursor-none` when pointer is `fine` and does not have it when `coarse`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 8. Update `page.tsx` (Home) — responsive spacing, typography, card height, orb container
  - [x] 8.1 Apply responsive spacing and padding to the home page container in `src/app/page.tsx`
    - Change outer container `px-6 py-12 md:py-32 space-y-40` to `px-4 sm:px-6 lg:px-8 py-8 md:py-32 space-y-16 md:space-y-28 lg:space-y-40`
    - Change timeline track `pl-8` to `pl-4 sm:pl-8`
    - Change skills flex container `gap-6` to `gap-3 sm:gap-6`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 8.2 Apply fluid hero typography and fix project card height in `src/app/page.tsx`
    - Change hero `h1` classes from `text-7xl md:text-[9rem]` to `text-5xl sm:text-7xl xl:text-[9rem] text-balance`
    - Change project card `<Link>` class from `h-[400px]` to `min-h-[320px] h-auto`
    - Verify the `HolographicOrb` container already has `overflow-hidden` (it does — `className="fixed inset-0 overflow-hidden pointer-events-none z-0"`); add a comment confirming it is intentional
    - Remove `cursor-none` from the outer container `div` on the home page (cursor is now managed globally by `CustomCursor`)
    - _Requirements: 3.1, 3.2, 3.3, 7.1, 7.2, 7.3, 9.1_

  - [x] 8.3 Write property test for project card height — content never clipped (Property 4)
    - **Property 4: Project card grows to fit any content without clipping**
    - **Validates: Requirements 7.1, 7.2**
    - Use `fc.record({ title: fc.string({ minLength: 1, maxLength: 200 }), description: fc.string({ minLength: 1, maxLength: 500 }) })` to generate card content
    - Render the project card `<Link>` element with the generated content and assert `card.scrollHeight <= card.offsetHeight` (card is not clipping — it expands to fit)
    - Tag: `// Feature: responsiveness, Property 4: project card grows to fit any content`
    - Run with `{ numRuns: 100 }`
    - _Requirements: 7.1, 7.2_

  - [x] 8.4 Write unit tests for home page layout
    - Test: project card `<Link>` has `min-h-[320px]` class and does not have `h-[400px]`
    - Test: outer container has `space-y-16` class (mobile spacing present)
    - Test: outer container has `px-4` class (mobile padding present)
    - Test: hero `h1` has `text-balance` class
    - _Requirements: 3.1, 4.1, 4.3, 7.1_

- [~] 9. Checkpoint — ensure home page changes compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Update `ProjectInteractiveView` — responsive layout, heading scale, overflow fix
  - [-] 10.1 Apply responsive layout changes to `src/components/ProjectInteractiveView.tsx`
    - Change root `div` class from `h-screen flex flex-col` to `min-h-screen flex flex-col` (remove fixed height)
    - Remove `cursor-none` from the root `div` (cursor is now managed globally by `CustomCursor`)
    - Change the main split-view `<section>` from `grid lg:grid-cols-12` to `flex flex-col lg:grid lg:grid-cols-12` so sidebar stacks above canvas below `lg`
    - Change the background orb container to ensure it has `overflow-hidden` (it already has `overflow-hidden` — verify and add a comment)
    - _Requirements: 11.1, 11.2, 11.7, 9.2_

  - [~] 10.2 Apply responsive heading scale and flex-wrap to action buttons in `src/components/ProjectInteractiveView.tsx`
    - Change hero `h1` from `text-4xl md:text-5xl` to `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
    - Change header action buttons container from `flex gap-3` to `flex flex-wrap gap-3`
    - _Requirements: 11.3, 11.4_

  - [~] 10.3 Write unit tests for `ProjectInteractiveView`
    - Test: root element has `min-h-screen` class and does not have `h-screen`
    - Test: split-view section has `flex-col` class (stacked on mobile)
    - Test: hero `h1` has `text-2xl` class (mobile scale present)
    - Test: action buttons container has `flex-wrap` class
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 11. Update `AttachmentPreviewViewer` — responsive iframe heights, back link tap target
  - [-] 11.1 Apply responsive preview heights and back link tap target in `src/components/AttachmentPreviewViewer.tsx`
    - Change PDF iframe container from `h-[74vh] min-h-[460px]` to `h-[60vh] md:h-[74vh] min-h-[360px] md:min-h-[460px]`
    - Change image preview container from `h-[74vh] min-h-[460px]` to `h-[50vh] md:h-[74vh] min-h-[300px] md:min-h-[460px]`
    - Add `min-h-[44px]` to the back-navigation `<Link>` (it already has `inline-flex items-center gap-2` — add `min-h-[44px]` to the class string)
    - Verify the action buttons container already has `flex-wrap` and the metadata chips already have `flex-wrap` — add comments confirming they are intentional
    - _Requirements: 12.1, 12.2, 12.4, 12.5, 12.7, 6.6, 6.7_

  - [~] 11.2 Write unit tests for `AttachmentPreviewViewer`
    - Test: PDF iframe container has `h-[60vh]` class
    - Test: image preview container has `h-[50vh]` class
    - Test: back-navigation link has `min-h-[44px]` class
    - Test: action buttons container has `flex-wrap` class
    - _Requirements: 12.1, 12.2, 12.7_

- [ ] 12. Update blog detail page — related posts grid and back link tap target
  - [ ] 12.1 Add related posts grid and fix back link in `src/app/blogs/[slug]/page.tsx`
    - Add a related posts section after the `<section className="prose ...">` block: render `relatedPosts` (already fetched) in a `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` using `<BlogCard>` components; wrap in a container with a heading and `mt-16 pt-10 border-t border-surface-border`
    - Add `min-h-[44px]` to the "Back to Archive" `<Link>` (it already has `inline-flex items-center gap-2` — add `min-h-[44px]` to the class string)
    - _Requirements: 10.5, 10.6, 6.7_

  - [~] 12.2 Write unit tests for blog detail page
    - Test: "Back to Archive" link has `min-h-[44px]` class
    - Test: related posts section renders a grid with `grid-cols-1` class (single column on mobile)
    - _Requirements: 10.5, 10.6_

- [ ] 13. Property-based tests for overflow and font-size invariants
  - [~] 13.1 Write property test for no horizontal overflow at any viewport width (Property 3)
    - **Property 3: No horizontal overflow at any viewport width in [320, 1920]**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
    - Use `fc.integer({ min: 320, max: 1920 })` to generate viewport widths
    - For each width, set `Object.defineProperty(window, 'innerWidth', { value: width, writable: true })` and render the home page; assert `document.body.scrollWidth <= window.innerWidth`
    - Tag: `// Feature: responsiveness, Property 3: no horizontal overflow at any viewport width`
    - Run with `{ numRuns: 100 }`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [~] 13.2 Write property test for body text minimum font size (Property 2)
    - **Property 2: All body text is at least 14 px at any viewport width in [320, 1920]**
    - **Validates: Requirements 3.6**
    - Use `fc.integer({ min: 320, max: 1920 })` to generate viewport widths
    - For each width, render a representative page and query all `p, li, span, td, label` elements; assert every element has `parseFloat(getComputedStyle(el).fontSize) >= 14`
    - Tag: `// Feature: responsiveness, Property 2: body text >= 14px at any viewport width`
    - Run with `{ numRuns: 100 }`
    - _Requirements: 3.6_

- [~] 14. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The test framework (Vitest + fast-check) must be installed in Task 1 before any test sub-tasks can run
- Property tests use the `fast-check` library with a minimum of 100 runs per property
- Checkpoints at Tasks 6, 9, and 14 ensure incremental validation
- `cursor-none` is removed from `globals.css` and from all component root `div`s; it is re-applied conditionally by `CustomCursor` via `document.body.classList.toggle`
- The `HolographicOrb` container on the home page already has `overflow-hidden` — Task 8.2 verifies and documents this rather than adding it
- Blog detail page already has correct padding (`px-4 sm:px-6 lg:px-8`) and heading scale (`text-4xl sm:text-5xl lg:text-6xl`) — only the related posts grid and back link tap target need changes

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2", "3.1"] },
    { "id": 2, "tasks": ["3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2", "5.1"] },
    { "id": 4, "tasks": ["5.2", "7.1"] },
    { "id": 5, "tasks": ["7.2", "7.3", "8.1"] },
    { "id": 6, "tasks": ["8.2", "8.3", "8.4"] },
    { "id": 7, "tasks": ["10.1", "11.1", "12.1"] },
    { "id": 8, "tasks": ["10.2", "10.3", "11.2", "12.2"] },
    { "id": 9, "tasks": ["13.1", "13.2"] }
  ]
}
```
