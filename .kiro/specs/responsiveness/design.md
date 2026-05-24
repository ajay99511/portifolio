# Design Document: Responsiveness

## Overview

This document describes the technical design for making the portfolio site fully responsive across the 320 px–1920 px viewport range. The site is built with Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion, and TypeScript.

The work falls into five broad categories:

1. **Navigation** — add a mobile hamburger menu and `MobileMenu` drawer to `Navbar`
2. **Cursor** — conditionally suppress `CustomCursor` and `cursor-none` on touch devices
3. **Typography & spacing** — fluid/stepped scales for hero text, headings, and section gaps
4. **Layout fixes** — remove fixed card heights, prevent horizontal overflow, fix `ProjectInteractiveView` and `AttachmentPreviewViewer` on small screens
5. **Touch targets** — ensure every interactive element meets the 44 × 44 px minimum

No new routing, data-fetching, or server-side logic is required. All changes are confined to CSS classes, component logic, and a new `MobileMenu` component.

---

## Architecture

The responsiveness feature is a cross-cutting concern that touches the shared shell, several page-level components, and global CSS. There is no new data layer or API surface.

```
LayoutShell
├── CustomCursor          ← touch-detection guard added here
├── Navbar                ← hamburger + MobileMenu added here
│   └── MobileMenu (new) ← slide-in drawer
└── {children}
    ├── page.tsx (Home)   ← typography, spacing, card height, orb overflow
    ├── blogs/[slug]/     ← padding, metadata row wrapping
    ├── ProjectInteractiveView ← stacked layout below lg
    └── AttachmentPreviewViewer ← stacked header, iframe heights
```

### Key design decisions

- **Touch detection via `window.matchMedia('(pointer: coarse)')`** — the CSS media query approach is the most reliable cross-browser signal for distinguishing touch from pointer-fine devices. It is checked once on mount and then kept live via a `MediaQueryList` change listener, satisfying the hybrid-device requirement.
- **`MobileMenu` as a sibling component** — keeping the drawer separate from `Navbar` keeps each component focused and makes the focus-trap logic self-contained.
- **Tailwind responsive prefixes only** — all breakpoint changes use Tailwind's `sm:`, `md:`, `lg:`, `xl:` prefixes. No custom CSS media queries are added to `globals.css` except for the `--text-hero` CSS variable, which already uses `@media` in the theme layer.
- **No new dependencies** — focus trapping is implemented with a small custom hook (`useFocusTrap`) rather than adding a library, keeping the bundle lean.

---

## Components and Interfaces

### 1. `MobileMenu` (new — `src/components/MobileMenu.tsx`)

A slide-in drawer that renders the three primary nav links on viewports below `sm` (640 px).

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Behaviour:**
- Animated with Framer Motion (`x: "-100%"` → `x: 0`).
- Renders a full-height overlay backdrop; tapping the backdrop calls `onClose`.
- Contains a close (`×`) button at the top-right of the drawer.
- Uses `useFocusTrap(isOpen)` to trap keyboard focus while open.
- Each nav link calls `onClose` on click (handled via `onClick` prop on `<Link>`).
- When `isOpen` is `false`, the drawer is `aria-hidden` and `inert` so it is invisible to assistive technology and cannot receive focus.

**Nav links rendered:**
| Label | Route |
|---|---|
| / Directory | `/` |
| / Credentials | `/certifications` |
| / Journals | `/blogs` |

**Minimum tap target:** each link has `min-h-[44px]` and `flex items-center`.

### 2. `Navbar` (modified — `src/components/Navbar.tsx`)

Adds hamburger/close toggle and wires `MobileMenu`.

```typescript
// New state
const [menuOpen, setMenuOpen] = useState(false);
```

**Changes:**
- Hamburger button (`☰`) shown when `sm:hidden`; has `w-11 h-11` (44 px) minimum tap target.
- Close button (`×`) shown inside the drawer via `MobileMenu`; hamburger is replaced by close icon when `menuOpen` is `true`.
- Social icon links gain `min-w-[44px] min-h-[44px] flex items-center justify-center` wrapper to meet touch target requirement.
- `<MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />` rendered as a sibling inside `<header>`.

### 3. `CustomCursor` (modified — `src/components/CustomCursor.tsx`)

Adds touch-device detection and conditionally suppresses rendering.

```typescript
// New state
const [isTouch, setIsTouch] = useState(true); // default true = safe for SSR
```

**Detection logic:**
```typescript
useEffect(() => {
  const mql = window.matchMedia('(pointer: coarse)');
  setIsTouch(mql.matches);
  const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}, []);
```

**Rendering guard:**
```tsx
if (isTouch) return null;
```

**`cursor-none` on `body`:** The `cursor-none` class in `globals.css` is replaced with a conditional applied via `useEffect` in `CustomCursor`:
```typescript
useEffect(() => {
  document.body.classList.toggle('cursor-none', !isTouch);
}, [isTouch]);
```
The static `cursor-none` in `globals.css` is removed so touch devices never inherit it.

### 4. `useFocusTrap` (new — `src/hooks/useFocusTrap.ts`)

A small hook that traps keyboard focus within a ref'd container while `active` is `true`.

```typescript
function useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean): void
```

Queries all focusable elements inside the container and intercepts `Tab` / `Shift+Tab` to cycle within them. Restores focus to the previously focused element on deactivation.

### 5. `page.tsx` — Home page (modified)

| Current | Replacement |
|---|---|
| `space-y-40` | `space-y-16 md:space-y-28 lg:space-y-40` |
| `py-12 md:py-32` | `py-8 md:py-32` |
| `px-6` | `px-4 sm:px-6 lg:px-8` |
| `text-7xl md:text-[9rem]` on hero `h1` | `text-5xl sm:text-7xl xl:text-[9rem]` + `text-balance` |
| `h-[400px]` on project card `<Link>` | `min-h-[320px] h-auto` |
| Timeline `pl-8` | `pl-4 sm:pl-8` |
| Skills `gap-6` | `gap-3 sm:gap-6` |

The `HolographicOrb` container already has `overflow-hidden`; this is verified and kept. Orb `size` props are reduced on mobile via a responsive helper:

```tsx
// Orbs receive size as a prop; reduce on mobile via CSS clamp or conditional
// The container div already has: className="fixed inset-0 overflow-hidden pointer-events-none z-0"
// No change needed to the container — overflow-hidden is already present.
```

### 6. `ProjectInteractiveView` (modified)

| Current | Replacement |
|---|---|
| `h-screen flex flex-col` root | `min-h-screen flex flex-col` |
| `grid lg:grid-cols-12` section | `flex flex-col lg:grid lg:grid-cols-12` |
| Sidebar `lg:col-span-3` | renders above canvas on mobile (natural flow) |
| `text-4xl md:text-5xl` heading | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` |
| Header action buttons `flex gap-3` | `flex flex-wrap gap-3` |
| Background orb container | add `overflow-hidden` if not already present |
| `cursor-none` on root div | removed (handled globally by `CustomCursor`) |

### 7. `AttachmentPreviewViewer` (modified)

| Current | Replacement |
|---|---|
| PDF iframe `h-[74vh] min-h-[460px]` | `h-[60vh] md:h-[74vh] min-h-[360px] md:min-h-[460px]` |
| Image container `h-[74vh] min-h-[460px]` | `h-[50vh] md:h-[74vh] min-h-[300px] md:min-h-[460px]` |
| Header `flex flex-col lg:flex-row` | already correct — verify `lg:items-center` |
| Action buttons `flex items-center gap-2 sm:gap-3 flex-wrap` | already has `flex-wrap` — verify |
| Metadata chips `flex flex-wrap gap-2 sm:gap-3` | already has `flex-wrap` — verify |
| Back link | add `min-h-[44px] flex items-center` |
| Page padding | `px-4 sm:px-6 lg:px-8` — already present via `max-w-5xl` container |

### 8. `globals.css` (modified)

```css
/* BEFORE */
body {
  @apply bg-surface-bg text-blue-100 antialiased selection:bg-brand-neon/30 selection:text-white cursor-none overflow-x-hidden;
}

/* AFTER */
body {
  @apply bg-surface-bg text-blue-100 antialiased selection:bg-brand-neon/30 selection:text-white overflow-x-hidden;
  /* cursor-none is applied conditionally by CustomCursor via JS for pointer-fine devices */
}
```

The `--text-hero` CSS variable used by `Hero.tsx` is defined responsively:

```css
@theme {
  /* existing theme tokens ... */
}

/* Responsive hero font size */
:root {
  --text-hero: clamp(2.5rem, 8vw, 9rem);
}
```

This replaces the stepped `text-5xl sm:text-7xl xl:text-[9rem]` approach for `Hero.tsx` specifically, since it already reads from `var(--text-hero)`. The home page `page.tsx` hero uses Tailwind classes directly and gets the stepped approach.

### 9. Blog detail page `blogs/[slug]/page.tsx` (verified — minimal changes)

The page already uses `px-4 sm:px-6 lg:px-8`, `text-4xl sm:text-5xl lg:text-6xl`, and `flex-wrap` on the metadata row. The related posts section needs a responsive grid:

```tsx
// Related posts grid (to be added)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

The back link needs `min-h-[44px] flex items-center`.

---

## Data Models

No new data models are introduced. The only state additions are:

| Component | New state | Type | Purpose |
|---|---|---|---|
| `Navbar` | `menuOpen` | `boolean` | Controls `MobileMenu` open/close |
| `CustomCursor` | `isTouch` | `boolean` | Suppresses cursor on touch devices |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Cursor visibility matches pointer type

*For any* pointer type value (`coarse` or `fine`), the `CustomCursor` component SHALL render its DOM elements if and only if the pointer type is `fine`. Equivalently, for any sequence of pointer type changes at runtime, the rendered state of `CustomCursor` SHALL always reflect the most recent pointer type after each change event is processed.

**Validates: Requirements 2.1, 2.3, 2.7**

### Property 2: Body text is never smaller than 14 px

*For any* viewport width in the range [320, 1920] px, all body text elements rendered on any page SHALL have a computed `font-size` of at least 14 px (0.875 rem).

**Validates: Requirements 3.6**

### Property 3: No horizontal overflow at any viewport width

*For any* viewport width in the range [320, 1920] px, every page and route in the site SHALL render such that `document.body.scrollWidth` does not exceed `window.innerWidth` (i.e., no horizontal scrollbar appears).

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 4: Project card content is never clipped

*For any* project card rendered with any combination of title length and description length, the card's rendered height SHALL be sufficient to display all content without clipping (i.e., `scrollHeight <= offsetHeight` is false — the card grows to fit).

**Validates: Requirements 7.1, 7.2**

---

## Error Handling

This feature is purely presentational — there are no new async operations, API calls, or data mutations. Error handling considerations are limited to:

- **`window.matchMedia` unavailability (SSR):** `CustomCursor` is already loaded with `dynamic(..., { ssr: false })` in `LayoutShell`, so `window` is always available when the component runs. The `isTouch` state defaults to `true` (cursor hidden) to prevent a flash of the cursor before hydration.
- **`MobileMenu` focus trap with no focusable children:** `useFocusTrap` must handle the edge case where the container has zero focusable elements gracefully (no-op, no throw).
- **Framer Motion `AnimatePresence`:** `MobileMenu` uses `AnimatePresence` to animate out on close. If the animation is interrupted (e.g., rapid open/close), Framer Motion handles this correctly via its internal queue — no special handling needed.

---

## Testing Strategy

This feature is primarily UI/layout work. Property-based testing applies to a small subset of the requirements (cursor detection logic, overflow invariants, font-size invariants, card height invariants). The majority of requirements are best covered by example-based tests and visual/snapshot tests.

### Unit tests (example-based)

- **`MobileMenu`**: render at <640 px, assert links present; render at ≥640 px, assert `aria-hidden`; simulate open/close interactions.
- **`Navbar`**: assert hamburger visible at <640 px; assert inline links visible at ≥640 px; assert social icons have ≥44 px tap target.
- **`CustomCursor`**: mock `matchMedia` returning `coarse`, assert `null` render; mock returning `fine`, assert cursor elements present.
- **`useFocusTrap`**: assert Tab key cycles within container; assert focus restored on deactivation.
- **Home page**: assert `min-h-[320px]` on project card links; assert `space-y-16` class below md.
- **Blog detail**: assert `Back to Archive` link has `min-h-[44px]`.
- **`ProjectInteractiveView`**: assert `min-h-screen` on root; assert single-column layout below lg.
- **`AttachmentPreviewViewer`**: assert PDF iframe has `h-[60vh]` below md; assert action buttons have `min-h-[44px]`.

### Property-based tests

Property-based testing is appropriate here for the cursor detection logic (pure function over pointer type), the font-size invariant (universal over viewport widths), the overflow invariant (universal over viewport widths), and the card height invariant (universal over content lengths).

**Library:** [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, works with Vitest/Jest).

**Configuration:** minimum 100 runs per property.

**Tag format:** `// Feature: responsiveness, Property {N}: {property_text}`

#### Property 1 test — cursor visibility matches pointer type

```typescript
// Feature: responsiveness, Property 1: cursor renders iff pointer is fine
fc.assert(
  fc.property(
    fc.constantFrom('coarse', 'fine'),
    (pointerType) => {
      mockMatchMedia(pointerType);
      const { container } = render(<CustomCursor />);
      const hasCursorElements = container.querySelectorAll('[class*="fixed"]').length > 0;
      return pointerType === 'fine' ? hasCursorElements : !hasCursorElements;
    }
  ),
  { numRuns: 100 }
);
```

For the runtime-change variant, generate random sequences of pointer type changes and assert the final rendered state matches the last value in the sequence.

#### Property 2 test — body text ≥ 14 px

```typescript
// Feature: responsiveness, Property 2: body text >= 14px at any viewport width
fc.assert(
  fc.property(
    fc.integer({ min: 320, max: 1920 }),
    async (viewportWidth) => {
      await setViewportWidth(viewportWidth);
      const textElements = document.querySelectorAll('p, li, span, td, label');
      return Array.from(textElements).every(
        (el) => parseFloat(getComputedStyle(el).fontSize) >= 14
      );
    }
  ),
  { numRuns: 100 }
);
```

#### Property 3 test — no horizontal overflow

```typescript
// Feature: responsiveness, Property 3: no horizontal overflow at any viewport width
fc.assert(
  fc.property(
    fc.integer({ min: 320, max: 1920 }),
    async (viewportWidth) => {
      await setViewportWidth(viewportWidth);
      return document.body.scrollWidth <= window.innerWidth;
    }
  ),
  { numRuns: 100 }
);
```

#### Property 4 test — project card content not clipped

```typescript
// Feature: responsiveness, Property 4: project card grows to fit any content
fc.assert(
  fc.property(
    fc.record({
      title: fc.string({ minLength: 1, maxLength: 200 }),
      description: fc.string({ minLength: 1, maxLength: 500 }),
    }),
    ({ title, description }) => {
      const { container } = render(
        <ProjectCardLink project={{ ...mockProject, title, description }} />
      );
      const card = container.firstElementChild as HTMLElement;
      // Card should not clip: scrollHeight should equal offsetHeight (no overflow)
      return card.scrollHeight <= card.offsetHeight;
    }
  ),
  { numRuns: 100 }
);
```

### Visual / integration tests

For layout correctness at specific breakpoints (Requirements 3, 4, 9, 10, 11, 12), snapshot tests using a tool like Playwright or Storybook visual regression are the most appropriate approach. These are not automated in the unit test suite but should be run manually or in CI against a set of fixed viewport sizes: 320 px, 375 px, 640 px, 768 px, 1024 px, 1280 px, 1920 px.

### Touch target smoke tests

For each interactive element listed in Requirement 6, a single assertion checks that the element's bounding rect is ≥ 44 × 44 px. These run as part of the unit test suite using `getBoundingClientRect` mocks or jsdom computed styles.
