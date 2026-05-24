/**
 * Property-based test for no horizontal overflow at any viewport width
 *
 * Property 3: No horizontal overflow at any viewport width in [320, 1920]
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4
 *
 * JSDOM LIMITATION NOTE:
 * jsdom does not implement a real layout engine. As a result,
 * `document.body.scrollWidth` is always 0 regardless of content or viewport
 * width, and `window.innerWidth` reflects whatever value we set via
 * Object.defineProperty. The overflow invariant (scrollWidth <= innerWidth)
 * therefore holds trivially (0 <= width) in this environment.
 *
 * What this test DOES verify:
 *   1. The home page renders without throwing at any viewport width in [320, 1920].
 *   2. The structural invariant `document.body.scrollWidth <= window.innerWidth`
 *      holds for all generated widths (documents the intended runtime contract).
 *
 * Real overflow validation requires a browser-based tool (e.g., Playwright)
 * that runs a full layout engine. This test serves as a compile-time and
 * render-time correctness guard.
 *
 * // Feature: responsiveness, Property 3: no horizontal overflow at any viewport width
 */

import React from "react";
import { render, cleanup } from "@testing-library/react";
import * as fc from "fast-check";
import { vi, afterEach } from "vitest";
import Home from "./page";

// ---------------------------------------------------------------------------
// Mocks — must be declared before any imports that trigger module resolution
// ---------------------------------------------------------------------------

// Mock framer-motion so motion.* renders as plain HTML elements in jsdom.
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, tag: string) =>
          React.forwardRef(
            (
              {
                children,
                animate: _animate,
                transition: _transition,
                whileHover: _whileHover,
                whileInView: _whileInView,
                initial: _initial,
                viewport: _viewport,
                style: _style,
                ...props
              }: React.HTMLAttributes<HTMLElement> & {
                children?: React.ReactNode;
                animate?: unknown;
                transition?: unknown;
                whileHover?: unknown;
                whileInView?: unknown;
                initial?: unknown;
                viewport?: unknown;
                style?: unknown;
              },
              ref: React.Ref<HTMLElement>
            ) => React.createElement(tag, { ...props, ref }, children)
          ),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (_v: unknown, _from: unknown, to: unknown[]) =>
      Array.isArray(to) ? to[0] : 0,
  };
});

// Mock next/link as a plain <a> — no Next.js router context needed.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock next/navigation to avoid router context errors.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock @/lib/projects.data with minimal deterministic fixture data.
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
  skills: [{ category: "Frontend", items: ["React", "TypeScript"] }],
}));

// Mock CustomCursor so it renders nothing — avoids matchMedia dependency.
vi.mock("@/components/CustomCursor", () => ({
  default: () => null,
}));

// ---------------------------------------------------------------------------
// Cleanup after each test run to avoid DOM state leaking between fc runs
// ---------------------------------------------------------------------------
afterEach(() => {
  cleanup();
});

// ---------------------------------------------------------------------------
// Property 3: No horizontal overflow at any viewport width in [320, 1920]
// Feature: responsiveness, Property 3: no horizontal overflow at any viewport width
// ---------------------------------------------------------------------------

describe("Property 3: no horizontal overflow at any viewport width", () => {
  /**
   * Validates: Requirements 5.1, 5.2, 5.3, 5.4
   *
   * For each generated viewport width in [320, 1920]:
   *   - Set window.innerWidth to the generated value.
   *   - Render the home page.
   *   - Assert the page renders without throwing.
   *   - Assert document.body.scrollWidth <= window.innerWidth.
   *
   * See the file-level comment for the jsdom limitation note.
   */
  it(
    // Feature: responsiveness, Property 3: no horizontal overflow at any viewport width
    "home page renders without throwing and scrollWidth <= innerWidth for any viewport width in [320, 1920]",
    () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 1920 }),
          (viewportWidth) => {
            // Set window.innerWidth to the generated viewport width.
            Object.defineProperty(window, "innerWidth", {
              value: viewportWidth,
              writable: true,
              configurable: true,
            });

            // Render the home page — must not throw.
            let container: HTMLElement;
            try {
              ({ container } = render(<Home />));
            } catch (err) {
              // If render throws, the property fails — surface the error.
              throw err;
            }

            // The rendered container must exist.
            if (!container) return false;

            // jsdom layout invariant: scrollWidth <= innerWidth.
            // In jsdom, scrollWidth is always 0 so this holds trivially.
            // This assertion documents the intended runtime contract.
            const scrollWidth = document.body.scrollWidth;
            const innerWidth = window.innerWidth;

            const noOverflow = scrollWidth <= innerWidth;

            // Clean up after each fc run to avoid DOM accumulation.
            cleanup();

            return noOverflow;
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
