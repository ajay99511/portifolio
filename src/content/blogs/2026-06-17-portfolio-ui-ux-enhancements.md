---
slug: portfolio-ui-ux-enhancements
title: "Portfolio UI/UX Enhancements: Hydration, Theming, and Layering"
description: Deep dive into resolving UI stacking contexts, implementing a zero-flash dark/light mode toggle, and fixing Next.js hydration errors.
author: Ajay
publishedAt: 2026-06-17
updatedAt: 2026-06-17
tags:
  - ui
  - ux
  - nextjs
  - architecture
  - css
category: Engineering
readingTimeMinutes: 7
featured: true
draft: false
---

## Intent & Context

Our objective during this session was to address several critical UI/UX issues and feature requests within the portfolio. The overarching business and technical goal was to polish the user experience while maintaining the high-fidelity, interactive nature of the application. 

Specifically, we tackled four core items:
1. **UI Glitch:** The mobile navigation menu drawer and backdrop were rendering beneath the interactive elements of the sticky header.
2. **Feature Integration:** Seamlessly integrating a "Resume" viewing option into the global navigation and hero section.
3. **Accessibility & Preferences:** Implementing a robust Dark/Light mode toggle with state persistence.
4. **Runtime Stability:** Fixing a stubborn Next.js React hydration mismatch error that surfaced in the console.

## Architectural & Logic Decisions

### Stacking Contexts vs. Z-Index
Initially, the mobile menu overlay overlap issue seemed like a simple `z-index` problem. However, deep analysis revealed an architectural constraint: the `MobileMenu` component was nested inside the `<header>` element. Because the header had a `z-index` of 50, it established its own stacking context. No matter how high we set the `z-index` of the mobile menu's backdrop inside the header, it could never overlay sibling elements of the header that also shared high `z-index` values.
**Decision:** Rather than artificially inflating `z-index` values across the entire application to compensate, we made the architectural choice to move the `MobileMenu` component outside the `<header>` tag, making them siblings. This cleanly separated their stacking contexts.

### Theming: `next-themes` vs. Custom Implementation
To implement the dark/light mode toggle, we considered writing a custom `localStorage` hook. However, server-side rendered (SSR) applications like Next.js suffer from "FOUC" (Flash of Unstyled Content) when theme preferences are read purely on the client.
**Decision:** We opted for `next-themes`. It safely injects a script tag into the `<head>` to read local storage before React hydrates, effectively mitigating FOUC. We paired this with native CSS variables mapped directly into Tailwind v4's `@theme` directive, prioritizing a CSS-first approach over heavy JavaScript-driven style recalculations.

### Resume Viewer Integration (DRY Principle)
The portfolio already had an advanced `AttachmentPreviewViewer` designed for certifications. 
**Decision:** Instead of building a separate PDF viewing component for the resume, we leveraged the existing viewer and data catalog. We mapped the `Ajay_Resume.pdf` as a standard `AttachmentAsset` and routed `/preview/resume` to the shared dynamic pipeline.

## Technical Implementation (The "How")

### 1. Resolving the Stacking Context Overlap
In `src/components/Navbar.tsx`, we extracted the `<MobileMenu />` from within the `<header>` element:

```tsx
return (
  <>
    <header className="sticky top-0 z-50 ...">
      {/* Navbar Content */}
    </header>
    {/* Moved outside the header's stacking context */}
    <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
  </>
);
```
Following this, we confidently elevated the backdrop and drawer to `z-[100]` and `z-[110]` respectively in `MobileMenu.tsx`, ensuring they sit at the absolute top of the global layer hierarchy.

### 2. Implementing Theme Toggle
We integrated a `ThemeProvider` at the root of the layout and injected a hydration-safe `ThemeToggle` component into the Navbar. To support this gracefully, we overhauled `globals.css` to rely entirely on CSS variables:

```css
:root {
  --brand-neon: #00f0ff;
  --surface-bg: #020205;
  --text-primary: #dbeafe; 
  --gradient-mid: #ffffff;
}

.light {
  --brand-neon: #008c99;
  --surface-bg: #f8fafc;
  --text-primary: #0f172a;
  --gradient-mid: #0f172a;
}
```
*Crucial Detail:* To ensure interactive elements like the `CustomCursor` and background `HolographicOrb` components looked correct in light mode, we dynamically switched their CSS blending modes. We use `mix-blend-screen` for dark mode (additive blending) and `mix-blend-multiply` for light mode (subtractive blending).

### 3. Suppressing Hydration Warnings
Because `next-themes` programmatically mutates the `class` and `style` attributes on the `<html>` tag before React kicks in, Next.js throws a hydration mismatch error during development. We resolved this by explicitly acknowledging the mutation via the `suppressHydrationWarning` prop:

```tsx
<html lang="en" className="h-full antialiased" suppressHydrationWarning>
```

## Challenges & Roadblocks

1. **Lost Responsive Classes:** During the integration of the `ThemeToggle` next to the mobile hamburger menu in the Navbar, the `sm:hidden` utility class was accidentally dropped from the hamburger button. This caused the hamburger to stay visible on desktop displays, immediately breaking our unit tests. We identified the regression from the failing CI output and surgically restored the class to the button.
2. **Surgical Replace Syntax Errors:** While refactoring the `HolographicOrb` logic in `page.tsx`, an omission placeholder (`...`) was inadvertently committed to the source file, resulting in an unparsable JSX tree. Fast Refresh threw a `500` syntax error. We had to carefully read the surrounding AST and remove the errant text while restoring the missing `animate` prop boundaries.

## Future Considerations

- **Theme Completeness:** While the primary variables are mapped, we must monitor secondary UI components (like code blocks inside markdown posts) to ensure contrast ratios remain accessible in Light Mode.
- **Animation Performance:** The custom cursor and holographic orbs calculate positioning continuously. While they operate smoothly now, as we expand the UI complexity, we should evaluate if we need to implement `requestAnimationFrame` debouncing, particularly for battery-constrained mobile devices running Light mode rendering.
- **Focus Management Audit:** We confirmed `useFocusTrap` works well for the mobile menu, but we should audit the `AttachmentPreviewViewer` to ensure focus is similarly restricted when full-screen iframes are active.