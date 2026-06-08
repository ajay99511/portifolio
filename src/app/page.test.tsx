/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Unit tests for home page layout
 * Requirements: 3.1, 4.1, 4.3, 7.1
 */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "./page";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so motion.* renders as plain HTML elements in jsdom
// (no animation delays, no exit animations).
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, tag: string) => {
          const Component = React.forwardRef(
            (
              {
                children,
                animate: _animate,
                transition: _transition,
                initial: _initial,
                whileInView: _whileInView,
                whileHover: _whileHover,
                viewport: _viewport,
                style: _style,
                ...props
              }: React.HTMLAttributes<HTMLElement> & {
                children?: React.ReactNode;
                animate?: unknown;
                transition?: unknown;
                initial?: unknown;
                whileInView?: unknown;
                whileHover?: unknown;
                viewport?: unknown;
                style?: unknown;
              },
              ref: React.Ref<HTMLElement>
            ) => React.createElement(tag, { ...props, ref }, children)
          );
          Component.displayName = `motion.${tag}`;
          return Component;
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (_v: unknown, _from: unknown, to: unknown[]) => to[0],
  };
});

// Mock next/link as a plain <a> so we can query by role/class without needing
// the Next.js router context.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

// Mock next/navigation (usePathname, useRouter, etc.) to avoid router context errors.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

// Mock @/lib/projects.data with minimal fixture data so tests are deterministic.
vi.mock("@/lib/projects.data", () => ({
  profile: {
    name: "Test User",
    role: "Software Engineer",
    location: "Remote",
    status: "Available",
    summary: "Test summary.",
    github: "https://github.com/test",
    linkedin: "https://linkedin.com/in/test",
  },
  projectCatalog: [
    {
      id: "project-alpha",
      title: "Project Alpha",
      description: "Alpha description.",
      techStack: ["React", "TypeScript"],
    },
    {
      id: "project-beta",
      title: "Project Beta",
      description: "Beta description.",
      techStack: ["Node.js"],
    },
  ],
  projects: [
    {
      id: "project-alpha",
      title: "Project Alpha",
      description: "Alpha description.",
      tags: ["React", "TypeScript"],
    },
    {
      id: "project-beta",
      title: "Project Beta",
      description: "Beta description.",
      tags: ["Node.js"],
    },
  ],
  experiences: [
    {
      company: "Acme Corp",
      role: "Engineer",
      period: "2023 — Present",
      description: "Built things.",
      highlights: ["Did stuff"],
    },
  ],
  skills: [
    { category: "Frontend", items: ["React", "TypeScript"] },
  ],
}));

// Mock CustomCursor so it renders nothing — avoids matchMedia dependency.
vi.mock("@/components/CustomCursor", () => ({
  default: () => null,
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Home page layout", () => {
  // -------------------------------------------------------------------------
  // 1. Project card <Link> has `min-h-[320px]` and does NOT have `h-[400px]`
  //    Requirement 7.1 — cards use min-h-[320px] with height: auto, not fixed h-[400px]
  // -------------------------------------------------------------------------
  it("project card links have min-h-[320px] class and do not have h-[400px] class", () => {
    render(<Home />);

    // Each project card is a <Link> (rendered as <a>) pointing to /projects/:id.
    const cardLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href")?.startsWith("/projects/"));

    expect(cardLinks.length).toBeGreaterThan(0);

    for (const card of cardLinks) {
      expect(card.className).toContain("min-h-[320px]");
      expect(card.className).not.toContain("h-[400px]");
    }
  });

  // -------------------------------------------------------------------------
  // 2. Outer container has `space-y-16` class (mobile spacing present)
  //    Requirement 4.1 — section spacing no more than space-y-16 below md
  // -------------------------------------------------------------------------
  it("outer container has space-y-16 class for mobile section spacing", () => {
    const { container } = render(<Home />);

    // The outer container is the first child of the root div — it carries the
    // responsive spacing and padding classes.
    const outerContainer = container.querySelector(".space-y-16");

    expect(outerContainer).not.toBeNull();
    expect(outerContainer!.className).toContain("space-y-16");
  });

  // -------------------------------------------------------------------------
  // 3. Outer container has `px-4` class (mobile horizontal padding present)
  //    Requirement 4.3 — horizontal padding is px-4 at 320 px viewport
  // -------------------------------------------------------------------------
  it("outer container has px-4 class for mobile horizontal padding", () => {
    const { container } = render(<Home />);

    const outerContainer = container.querySelector(".px-4");

    expect(outerContainer).not.toBeNull();
    expect(outerContainer!.className).toContain("px-4");
  });

  // -------------------------------------------------------------------------
  // 4. Hero h1 has `text-balance` class
  //    Requirement 3.1 — hero heading uses text-balance to prevent orphaned words
  // -------------------------------------------------------------------------
  it("hero h1 has text-balance class", () => {
    render(<Home />);

    // The hero heading is the first <h1> on the page.
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).toBeGreaterThan(0);

    const heroH1 = headings[0];
    expect(heroH1.className).toContain("text-balance");
  });
});
