/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Unit tests for ProjectInteractiveView responsive layout
 * Requirements: 11.1, 11.2, 11.3, 11.4
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectInteractiveView from "./ProjectInteractiveView";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so motion.* renders as plain HTML elements in jsdom.
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

// Mock next/link as a plain <a> to avoid needing the Next.js router context.
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

// Mock @/lib/projects.data \u2014 only the `projects` array is used by the component
// (to compute the batch index via `projects.indexOf(project)`).
vi.mock("@/lib/projects.data", () => ({
  projects: [
    {
      id: "test-project",
      batchId: "test-batch",
      title: "Test Project",
      subtitle: "A subtitle",
      description: "A test project.",
      longDescription: "Full description",
      techStack: ["React", "TypeScript"],
      fullDescription: "Full description of the test project.",
      tags: ["React", "TypeScript"],
      githubUrl: "https://github.com/test/project",
      liveUrl: "https://test-project.example.com",
      highlights: ["Built something cool"],
      stats: { nodes: 3, complexity: "Medium" },
      contextBanner: {
        challenge: "A hard challenge.",
        solution: "An elegant solution.",
      },
      previewPanels: [{ label: "Panel A" }],
    },
  ],
}));

// Mock CustomCursor to avoid matchMedia dependency.
vi.mock("@/components/CustomCursor", () => ({
  default: () => null,
}));

// Mock WalkthroughViewer — it has complex internal state and canvas logic
// that is irrelevant to layout tests.
vi.mock("@/components/walkthrough/WalkthroughViewer", () => ({
  default: ({ project }: { project: unknown }) => (
    <div data-testid="walkthrough-viewer" data-project={JSON.stringify(project)} />
  ),
}));

// ---------------------------------------------------------------------------
// Minimal mock project prop
// ---------------------------------------------------------------------------
const mockProject = {
  id: "test-project",
  batchId: "test-batch",
  title: "Test Project",
  subtitle: "A subtitle",
  description: "A test project.",
  longDescription: "Full description",
  techStack: ["React", "TypeScript"],
  fullDescription: "Full description of the test project.",
  tags: ["React", "TypeScript"],
  githubUrl: "https://github.com/test/project",
  liveUrl: "https://test-project.example.com",
  highlights: ["Built something cool"],
  stats: { nodes: 3, complexity: "Medium" },
  contextBanner: {
    challenge: "A hard challenge.",
    solution: "An elegant solution.",
  },
  previewPanels: [{ label: "Panel A", iconName: "Box" }],
  demoKind: "generic" as const,
  demoState: { nodes: 5 },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ProjectInteractiveView responsive layout", () => {
  // -------------------------------------------------------------------------
  // 1. Root element has `min-h-screen` and does NOT have `h-screen`
  //    Requirement 11.2 — use min-h-screen so content can scroll beyond viewport
  // -------------------------------------------------------------------------
  it("root element has min-h-screen class and does not have h-screen class", () => {
    const { container } = render(<ProjectInteractiveView project={mockProject} />);

    // The root div is the outermost element rendered by the component.
    const root = container.firstElementChild as HTMLElement;

    expect(root).not.toBeNull();

    // Split on whitespace to get individual class tokens, then check for exact matches.
    const classes = root.className.split(/\s+/);
    expect(classes).toContain("min-h-screen");
    // `h-screen` must not appear as a standalone class token (note: `min-h-screen`
    // contains the substring "h-screen" so we must check tokens, not substrings).
    expect(classes).not.toContain("h-screen");
  });

  // -------------------------------------------------------------------------
  // 2. Split-view section has `flex-col` class (stacked on mobile)
  //    Requirement 11.1 — sidebar stacks above canvas below lg breakpoint
  // -------------------------------------------------------------------------
  it("split-view section has flex-col class for mobile stacking", () => {
    const { container } = render(<ProjectInteractiveView project={mockProject} />);

    // The main split-view section is the <section> element inside the component.
    const section = container.querySelector("section");

    expect(section).not.toBeNull();
    expect(section!.className).toContain("flex-col");
  });

  // -------------------------------------------------------------------------
  // 3. Hero h1 has `text-2xl` class (mobile scale present)
  //    Requirement 11.3 — project title scales from text-2xl on mobile
  // -------------------------------------------------------------------------
  it("hero h1 has text-2xl class for mobile typography scale", () => {
    render(<ProjectInteractiveView project={mockProject} />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).toBeGreaterThan(0);

    const heroH1 = headings[0];
    expect(heroH1.className).toContain("text-2xl");
  });

  // -------------------------------------------------------------------------
  // 4. Action buttons container has `flex-wrap` class
  //    Requirement 11.4 — buttons wrap to new line below sm breakpoint
  // -------------------------------------------------------------------------
  it("action buttons container has flex-wrap class", () => {
    const { container } = render(<ProjectInteractiveView project={mockProject} />);

    // The action buttons container is inside the header and holds the
    // Repository and Live Output anchor elements.
    const repoLink = container.querySelector('a[href="https://github.com/test/project"]');
    expect(repoLink).not.toBeNull();

    // The parent of the repo link is the buttons container div.
    const buttonsContainer = repoLink!.parentElement as HTMLElement;
    expect(buttonsContainer).not.toBeNull();
    expect(buttonsContainer.className).toContain("flex-wrap");
  });
});
