# Requirements Document

## Introduction

This feature covers end-to-end responsiveness for the portfolio site built with Next.js, React 19, Tailwind CSS v4, and Framer Motion. The site currently has several responsiveness gaps — most critically a missing mobile navigation menu, a global `cursor-none` style that breaks touch UX, fixed-height project cards that clip content on small screens, and oversized hero typography on narrow viewports. The goal is to bring every page and shared component to a consistent, high-quality responsive standard across the full viewport range of 320 px to 1920 px, while preserving the existing cyberpunk/holographic visual identity.

## Glossary

- **Navbar**: The sticky header component at `src/components/Navbar.tsx` containing the logo, nav links, and social icons.
- **MobileMenu**: A slide-in drawer or overlay that exposes navigation links on viewports narrower than the `sm` breakpoint (640 px).
- **CustomCursor**: The custom neon cursor component at `src/components/CustomCursor.tsx` that replaces the native OS cursor.
- **HolographicOrb**: Decorative animated gradient blobs rendered in `src/app/page.tsx` using fixed positioning.
- **ProjectCard**: The reusable card component at `src/components/ProjectCard.tsx` used in the project gallery.
- **ProjectInteractiveView**: The full-screen project detail component at `src/components/ProjectInteractiveView.tsx` with a sidebar and walkthrough canvas.
- **AttachmentPreviewViewer**: The file preview component at `src/components/AttachmentPreviewViewer.tsx` used for PDFs, images, and Office documents.
- **LayoutShell**: The root layout wrapper at `src/components/LayoutShell.tsx` that renders `CustomCursor` and `Navbar` for all pages.
- **Touch_Device**: Any device that reports `pointer: coarse` via the CSS media query or the `window.matchMedia` API, including phones and tablets.
- **Pointer_Fine_Device**: Any device that reports `pointer: fine`, typically a desktop or laptop with a mouse or trackpad.
- **Touch_Target**: An interactive element (button, link, input) that a user can tap with a finger.
- **Breakpoint_sm**: 640 px — the Tailwind v4 `sm` breakpoint.
- **Breakpoint_md**: 768 px — the Tailwind v4 `md` breakpoint.
- **Breakpoint_lg**: 1024 px — the Tailwind v4 `lg` breakpoint.
- **Breakpoint_xl**: 1280 px — the Tailwind v4 `xl` breakpoint.
- **Horizontal_Overflow**: A condition where page content extends beyond the viewport width, causing a horizontal scrollbar to appear.
- **Section_Spacing**: The vertical gap between major page sections, currently `space-y-40` (10 rem) on the home page.
- **Hero_Typography**: The large display heading in the home page hero section, currently `text-7xl md:text-[9rem]`.

---

## Requirements

### Requirement 1: Mobile Navigation Menu

**User Story:** As a visitor on a mobile device, I want to access all navigation links, so that I can browse every section of the portfolio without being locked out of pages.

#### Acceptance Criteria

1. WHEN the viewport width is less than Breakpoint_sm, THE Navbar SHALL display a hamburger toggle button and SHALL hide the inline nav links, ensuring only one navigation style is visible at any viewport width.
2. WHEN a user taps the hamburger toggle button, THE MobileMenu SHALL open and display all navigation links (Directory, Credentials, Journals) as tappable items.
3. WHEN the MobileMenu is open and a user taps a navigation link, THE MobileMenu SHALL close and THE browser SHALL navigate to the selected route.
4. WHEN the MobileMenu is open and a user taps outside the menu area or presses the close button, THE MobileMenu SHALL close.
5. WHEN the viewport width is greater than or equal to Breakpoint_sm, THE Navbar SHALL display the inline nav links and THE MobileMenu SHALL be rendered in the DOM but visually hidden and inert.
6. THE hamburger toggle button SHALL have a minimum tap target size of 44 × 44 px.
7. WHEN the MobileMenu is open, THE Navbar SHALL display a close (×) button in place of the hamburger button.
8. WHEN the MobileMenu is open, THE MobileMenu SHALL trap focus within the drawer until it is closed.

---

### Requirement 2: Touch Device Cursor Handling

**User Story:** As a visitor on a touch device, I want the native touch pointer to work normally, so that I can interact with the site without a broken or invisible cursor.

#### Acceptance Criteria

1. WHILE the site is running on a Touch_Device, THE CustomCursor component SHALL not render its DOM elements.
2. WHILE the site is running on a Touch_Device, THE body element SHALL not have `cursor-none` applied.
3. WHILE the site is running on a Pointer_Fine_Device, THE CustomCursor SHALL render and follow the pointer as designed.
4. WHILE the site is running on a Pointer_Fine_Device, THE body element SHALL retain `cursor-none` so the native cursor is hidden.
5. THE CustomCursor detection logic SHALL use the `(pointer: coarse)` CSS media query or the equivalent `window.matchMedia('(pointer: coarse)')` API to distinguish Touch_Devices from Pointer_Fine_Devices, and SHALL continuously monitor for pointer type changes even when no change has occurred.
6. WHILE the site is running on a hybrid device that supports both touch and mouse input, THE CustomCursor SHALL default to the hidden state (Touch_Device behaviour) and SHALL only render when mouse pointer input is actively detected.
7. IF the pointer type changes at runtime (e.g., a hybrid device switches between touch and mouse), THEN THE CustomCursor SHALL update its rendered state within one interaction cycle, responding only to user-initiated interaction events.

---

### Requirement 3: Responsive Typography Scale

**User Story:** As a visitor on any device, I want all text to be legible and proportionate to the screen size, so that I can read content comfortably without zooming or horizontal scrolling.

#### Acceptance Criteria

1. THE Hero_Typography on the home page SHALL use a fluid or stepped scale: no larger than `text-5xl` (3 rem) at 320 px, scaling up to `text-[9rem]` at Breakpoint_xl and above.
2. WHEN the viewport width is less than 375 px, THE Hero_Typography SHALL not overflow its container or cause Horizontal_Overflow.
3. THE home page hero heading SHALL use `text-balance` or equivalent line-breaking to prevent orphaned single words on narrow viewports.
4. THE section headings (`h2`) across all pages SHALL use a responsive scale: no larger than `text-3xl` at 320 px, scaling to `text-5xl` or `text-6xl` at Breakpoint_lg and above.
5. THE blog post heading (`h1`) on the `/blogs/[slug]` page SHALL scale from `text-3xl` at 320 px to `text-6xl` at Breakpoint_lg, matching the existing `sm:text-5xl lg:text-6xl` pattern.
6. THE body text across all pages SHALL maintain a minimum font size of 14 px (0.875 rem) at all breakpoints.

---

### Requirement 4: Fluid Layout and Section Spacing

**User Story:** As a visitor on a mobile device, I want page sections to be spaced appropriately for a small screen, so that I can scroll through content without excessive whitespace or cramped layouts.

#### Acceptance Criteria

1. THE home page container SHALL use responsive Section_Spacing: no more than `space-y-16` (4 rem) below Breakpoint_md, scaling to `space-y-40` (10 rem) at Breakpoint_lg and above.
2. THE home page container SHALL use responsive vertical padding: `py-8` below Breakpoint_md, scaling to `py-32` at Breakpoint_md and above.
3. THE home page horizontal padding SHALL scale responsively: `px-4` at 320 px, `px-6` at Breakpoint_sm, and `px-8` at Breakpoint_lg and above.
4. THE Timeline section on the home page SHALL use responsive left padding on the timeline track: `pl-4` below Breakpoint_sm, scaling to `pl-8` at Breakpoint_sm and above.
5. THE Skills section SHALL use responsive gap: `gap-3` below Breakpoint_sm, scaling to `gap-6` at Breakpoint_sm and above.
6. THE home page footer SHALL stack its copyright and social link columns vertically below Breakpoint_md and display them in a row at Breakpoint_md and above; tablets below Breakpoint_md SHALL display the stacked layout.

---

### Requirement 5: No Horizontal Overflow on Any Viewport

**User Story:** As a visitor on any device, I want the page to never scroll horizontally, so that I can read all content without awkward side-scrolling.

#### Acceptance Criteria

1. THE site SHALL render without Horizontal_Overflow on viewport widths from 320 px to 1920 px on every page and route.
2. THE HolographicOrb elements on the home page and project detail page SHALL not cause Horizontal_Overflow; any overflow caused specifically by the HolographicOrb elements themselves SHALL be prevented by their containing element.
3. WHEN HolographicOrb elements are positioned with percentage-based `left` values that exceed the viewport, THE containing element SHALL use `overflow-hidden` to clip them.
4. THE ProjectInteractiveView component SHALL not cause Horizontal_Overflow on any viewport width.
5. THE `overflow-x-hidden` declaration on `body` in `globals.css` SHALL remain in place as a safety net, and no component SHALL rely solely on it to prevent overflow caused by its own layout.

---

### Requirement 6: Touch Target Sizes

**User Story:** As a visitor on a touch device, I want all interactive elements to be large enough to tap accurately, so that I can navigate and interact without mis-taps.

#### Acceptance Criteria

1. THE hamburger toggle button in the Navbar SHALL have a minimum tap target of 44 × 44 px on Touch_Devices.
2. THE navigation links inside the MobileMenu SHALL each have a minimum tap target height of 44 px.
3. THE social icon links in the Navbar SHALL have a minimum tap target of 44 × 44 px on Touch_Devices.
4. THE "Try Now" and "Source" action buttons in ProjectCard SHALL have a minimum tap target height of 44 px on Touch_Devices.
5. THE "Preview Credential" link in the certifications page cards SHALL have a minimum tap target height of 44 px on Touch_Devices.
6. THE "Download" and "Open" action buttons in AttachmentPreviewViewer SHALL have a minimum tap target height of 44 px on Touch_Devices.
7. THE back-navigation links (e.g., "Back_To_Home", "Back_To_Certifications") SHALL have a minimum tap target height of 44 px on Touch_Devices.

---

### Requirement 7: Fluid Project Card Height

**User Story:** As a visitor on a small screen, I want project cards to expand to fit their content, so that text and tags are never clipped or hidden.

#### Acceptance Criteria

1. THE project card links on the home page (`/`) SHALL not use a fixed `h-[400px]` height below Breakpoint_md; instead they SHALL use `min-h-[320px]` with `height: auto` to allow content to expand.
2. WHEN a project card contains a long title or description, THE card SHALL expand vertically to show all content without clipping.
3. THE project card grid on the home page SHALL maintain its `md:grid-cols-2 lg:grid-cols-3` layout while allowing individual cards to grow in height.
4. THE ProjectCard component used in ProjectGallery SHALL not apply any fixed height; it SHALL use flexible height driven by its content.
5. WHEN the viewport is below Breakpoint_sm, THE project card grid SHALL display as a single column.

---

### Requirement 8: All Navigation Links Accessible at Every Breakpoint

**User Story:** As a visitor on any device, I want to reach every page of the portfolio from the navigation, so that I never encounter a dead end regardless of screen size.

#### Acceptance Criteria

1. THE Navbar SHALL provide access to all primary routes (Directory `/`, Credentials `/certifications`, Journals `/blogs`) at every viewport width from 320 px to 1920 px.
2. WHEN the viewport is below Breakpoint_sm, THE MobileMenu SHALL be the mechanism through which navigation links are accessible (per Requirement 1).
3. WHEN the viewport is at or above Breakpoint_sm, THE inline nav links SHALL be visible and tappable/clickable; at exactly Breakpoint_sm the inline links SHALL be visible and the MobileMenu SHALL be hidden.
4. THE logo/home link in the Navbar SHALL be accessible and tappable at all viewport widths.
5. THE social icon links in the Navbar SHALL remain accessible at all viewport widths.

---

### Requirement 9: Holographic Orb Overflow Prevention

**User Story:** As a visitor on a narrow screen, I want decorative background elements to stay within the viewport, so that the page does not scroll horizontally.

#### Acceptance Criteria

1. THE fixed-position HolographicOrb container on the home page SHALL always use `overflow-hidden` (proactive approach) to prevent orbs positioned with `left: 80%` or `left: -10%` from extending the scrollable area.
2. THE fixed-position background orb container in ProjectInteractiveView SHALL use `overflow-hidden` to prevent its absolutely-positioned orbs from causing Horizontal_Overflow.
3. WHEN the viewport width is less than Breakpoint_md, THE HolographicOrb elements SHALL reduce their `size` or `opacity` to avoid visual dominance on small screens.
4. THE orb containers SHALL use `pointer-events-none` at all times so they do not intercept touch events.

---

### Requirement 10: Blog Detail Page Responsive Layout

**User Story:** As a visitor reading a blog post on a mobile device, I want the article to be readable and well-formatted, so that I can consume the content comfortably.

#### Acceptance Criteria

1. THE blog post article on `/blogs/[slug]` SHALL use responsive horizontal padding: `px-4` at 320 px, `px-6` from 321 px up to Breakpoint_sm, and `px-8` at Breakpoint_lg and above, with padding updating immediately at each breakpoint boundary.
2. THE blog post header metadata row (author, date, reading time, tags) SHALL wrap gracefully on narrow viewports without causing Horizontal_Overflow.
3. THE `prose` content area SHALL be constrained to `max-w-none` with the article's own `max-w-4xl` container providing the width limit, ensuring readable line lengths at all breakpoints.
4. WHEN the blog post contains code blocks, THE code blocks SHALL be horizontally scrollable within their container rather than causing page-level Horizontal_Overflow.
5. THE related posts section at the bottom of a blog post SHALL display as a single column below Breakpoint_md and as a multi-column grid at Breakpoint_md and above.
6. THE back-navigation link ("Back to Archive") SHALL be accessible and have a minimum tap target height of 44 px on Touch_Devices.

---

### Requirement 11: ProjectInteractiveView Responsive Layout

**User Story:** As a visitor on a mobile or tablet device, I want to view and interact with project details, so that I can explore the project walkthrough without a broken layout.

#### Acceptance Criteria

1. WHEN the viewport is below Breakpoint_lg, THE ProjectInteractiveView SHALL stack the sidebar (Technical Briefing) above the main walkthrough canvas in a single-column layout.
2. WHEN the viewport is below Breakpoint_lg, THE ProjectInteractiveView SHALL not use `h-screen` as the root container height; instead it SHALL use `min-h-screen` with scrollable content.
3. THE project title heading in ProjectInteractiveView SHALL scale responsively: no larger than `text-3xl` below Breakpoint_sm, `text-4xl` between Breakpoint_sm and Breakpoint_md, and `text-5xl` at Breakpoint_md and above.
4. THE header action buttons (Repository, Live Output) in ProjectInteractiveView SHALL wrap to a new line or stack vertically below Breakpoint_sm without overflowing.
5. THE sidebar in ProjectInteractiveView SHALL be fully scrollable on all viewport sizes when its content exceeds the available height.
6. THE walkthrough canvas (WalkthroughViewer) SHALL be usable on Touch_Devices, with touch-scroll enabled within the canvas area.
7. WHEN the viewport is below Breakpoint_lg, THE decorative terminal panel (currently `hidden lg:block`) SHALL remain hidden, and the freed space SHALL be used by the main content column.

---

### Requirement 12: AttachmentPreviewViewer Mobile Usability

**User Story:** As a visitor on a mobile device, I want to preview and download attachments (PDFs, images, certificates), so that I can view credentials without needing a desktop.

#### Acceptance Criteria

1. WHEN the viewport is below Breakpoint_md, THE PDF preview iframe in AttachmentPreviewViewer SHALL use a minimum height of `60vh` and SHALL be scrollable within its container.
2. WHEN the viewport is below Breakpoint_md, THE image preview container SHALL use a minimum height of `50vh` and SHALL display the image with `object-contain` scaling.
3. THE attachment metadata header (title, description, action buttons) in AttachmentPreviewViewer SHALL stack vertically below Breakpoint_lg and display in a row at Breakpoint_lg and above.
4. THE "Download" and "Open" action buttons SHALL remain visible and tappable at all viewport widths without being pushed off-screen.
5. THE file metadata chips (File, Size, Updated) SHALL wrap to multiple lines below Breakpoint_sm rather than causing Horizontal_Overflow.
6. WHEN the viewport is below Breakpoint_sm, THE AttachmentPreviewViewer page SHALL use `px-4` horizontal padding to prevent content from touching the screen edges.
7. THE back-navigation link in AttachmentPreviewViewer SHALL have a minimum tap target height of 44 px on Touch_Devices.
