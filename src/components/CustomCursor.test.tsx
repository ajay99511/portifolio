/**
 * Unit tests for CustomCursor
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
import { render } from "@testing-library/react";
import { vi, beforeEach, afterEach } from "vitest";
import CustomCursor from "./CustomCursor";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so motion.div renders as a plain <div> in jsdom.
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
                ...props
              }: React.HTMLAttributes<HTMLElement> & {
                children?: React.ReactNode;
                animate?: unknown;
                transition?: unknown;
              },
              ref: React.Ref<HTMLElement>
            ) => React.createElement(tag, { ...props, ref }, children)
          ),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// ---------------------------------------------------------------------------
// matchMedia helper
// ---------------------------------------------------------------------------

/**
 * Install a window.matchMedia mock that returns `matches: true` for
 * `(pointer: coarse)` when `pointerType` is `"coarse"`, and `false` when
 * `pointerType` is `"fine"`.
 */
function mockMatchMedia(pointerType: "coarse" | "fine") {
  const isCoarse = pointerType === "coarse";

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(pointer: coarse)" ? isCoarse : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("CustomCursor", () => {
  afterEach(() => {
    // Clean up any cursor-none class added to body between tests.
    document.body.classList.remove("cursor-none");
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Coarse pointer → component renders null (no DOM elements)
  //    Requirement 2.1 — CustomCursor SHALL not render its DOM elements on touch devices
  // -------------------------------------------------------------------------
  it("renders null when matchMedia reports pointer: coarse", () => {
    mockMatchMedia("coarse");

    const { container } = render(<CustomCursor />);

    // The container should be empty — no cursor elements rendered.
    expect(container.firstChild).toBeNull();
  });

  // -------------------------------------------------------------------------
  // 2. Fine pointer → component renders cursor elements
  //    Requirement 2.3 — CustomCursor SHALL render and follow the pointer on fine devices
  // -------------------------------------------------------------------------
  it("renders cursor elements when matchMedia reports pointer: fine", () => {
    mockMatchMedia("fine");

    const { container } = render(<CustomCursor />);

    // Two motion.div elements (dot + ring) should be present.
    const fixedElements = container.querySelectorAll(".fixed");
    expect(fixedElements.length).toBeGreaterThanOrEqual(2);
  });

  // -------------------------------------------------------------------------
  // 3a. Fine pointer → body has cursor-none class
  //     Requirement 2.4 — body SHALL retain cursor-none on fine devices
  // -------------------------------------------------------------------------
  it("adds cursor-none to document.body when pointer is fine", () => {
    mockMatchMedia("fine");

    render(<CustomCursor />);

    expect(document.body.classList.contains("cursor-none")).toBe(true);
  });

  // -------------------------------------------------------------------------
  // 3b. Coarse pointer → body does NOT have cursor-none class
  //     Requirement 2.2 — body SHALL NOT have cursor-none on touch devices
  // -------------------------------------------------------------------------
  it("does not add cursor-none to document.body when pointer is coarse", () => {
    mockMatchMedia("coarse");

    render(<CustomCursor />);

    expect(document.body.classList.contains("cursor-none")).toBe(false);
  });
});
