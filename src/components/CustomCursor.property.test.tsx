/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Property-based tests for CustomCursor — cursor visibility matches pointer type
 * Feature: responsiveness, Property 1: cursor renders iff pointer is fine
 * Validates: Requirements 2.1, 2.3, 2.7
 */
import { render, act } from "@testing-library/react";
import * as fc from "fast-check";
import { vi, beforeEach, afterEach, describe, it } from "vitest";
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
        get: (_target: object, tag: string) => {
          const Component = React.forwardRef(
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
          );
          Component.displayName = `motion.${tag}`;
          return Component;
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// ---------------------------------------------------------------------------
// matchMedia helper
// ---------------------------------------------------------------------------

type PointerType = "coarse" | "fine";

/**
 * Stored change listeners so tests can fire pointer-type change events.
 */
let changeListeners: Array<(e: { matches: boolean }) => void> = [];

/**
 * Install a window.matchMedia mock for the given pointer type.
 * Returns a `fireChange` function that simulates a pointer-type change event.
 */
function mockMatchMedia(pointerType: PointerType) {
  changeListeners = [];
  const isCoarse = pointerType === "coarse";

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(pointer: coarse)" ? isCoarse : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(
        (event: string, listener: (e: { matches: boolean }) => void) => {
          if (event === "change") changeListeners.push(listener);
        }
      ),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

/**
 * Simulate a pointer-type change to `newPointerType` by calling all registered
 * change listeners with the appropriate `matches` value.
 */
function firePointerChange(newPointerType: PointerType) {
  const matches = newPointerType === "coarse";
  changeListeners.forEach((listener) => listener({ matches }));
}

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

afterEach(() => {
  document.body.classList.remove("cursor-none");
  vi.restoreAllMocks();
  changeListeners = [];
});

// ---------------------------------------------------------------------------
// Property 1a — single pointer type: cursor renders iff pointer is fine
// Validates: Requirements 2.1, 2.3
// ---------------------------------------------------------------------------

describe("CustomCursor — Property 1: cursor renders iff pointer is fine", () => {
  it(
    // Feature: responsiveness, Property 1: cursor renders iff pointer is fine
    "renders DOM elements if and only if pointer type is fine (100 runs)",
    () => {
      fc.assert(
        fc.property(fc.constantFrom<PointerType>("coarse", "fine"), (pointerType) => {
          // Reset body class before each run
          document.body.classList.remove("cursor-none");

          mockMatchMedia(pointerType);
          const { container, unmount } = render(<CustomCursor />);

          const fixedElements = container.querySelectorAll(".fixed");
          const hasCursorElements = fixedElements.length > 0;

          const result =
            pointerType === "fine" ? hasCursorElements : !hasCursorElements;

          unmount();
          return result;
        }),
        { numRuns: 100 }
      );
    }
  );

  // ---------------------------------------------------------------------------
  // Property 1b — pointer-type change sequences: final state matches last value
  // Validates: Requirement 2.7
  // ---------------------------------------------------------------------------

  it(
    // Feature: responsiveness, Property 1: cursor renders iff pointer is fine
    "final rendered state matches the last pointer type in a change sequence (100 runs)",
    () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom<PointerType>("coarse", "fine"), {
            minLength: 1,
            maxLength: 10,
          }),
          (sequence) => {
            // Reset body class before each run
            document.body.classList.remove("cursor-none");

            // Mount with the first pointer type in the sequence
            const [first, ...rest] = sequence;
            mockMatchMedia(first);

            const { container, unmount } = render(<CustomCursor />);

            // Fire change events for the remaining pointer types in the sequence
            for (const pointerType of rest) {
              act(() => {
                firePointerChange(pointerType);
              });
            }

            const lastPointerType = sequence[sequence.length - 1];
            const fixedElements = container.querySelectorAll(".fixed");
            const hasCursorElements = fixedElements.length > 0;

            const result =
              lastPointerType === "fine" ? hasCursorElements : !hasCursorElements;

            unmount();
            return result;
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
