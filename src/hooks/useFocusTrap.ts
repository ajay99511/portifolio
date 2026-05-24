"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Traps keyboard focus within `containerRef.current` while `active` is `true`.
 *
 * - On activation: moves focus to the first focusable element inside the container.
 * - While active: Tab cycles forward and Shift+Tab cycles backward through focusable
 *   elements; both call `e.preventDefault()` to suppress the browser's default behaviour.
 * - On deactivation: restores focus to the element that held focus before activation.
 * - Zero focusable children: handled gracefully — no error is thrown.
 *
 * Requirements: 1.8
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean
): void {
  // Keep a stable ref to the element that was focused before the trap activated
  // so we can restore it when the trap deactivates.
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) {
      // Deactivation: restore focus to the previously focused element.
      const previous = previousFocusRef.current;
      if (previous && typeof (previous as HTMLElement).focus === "function") {
        (previous as HTMLElement).focus();
      }
      previousFocusRef.current = null;
      return;
    }

    // Activation: record the currently focused element and move focus into the container.
    previousFocusRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

    // Move focus to the first focusable element (no-op if none exist).
    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const elements = getFocusable();

      // Edge case: no focusable elements — prevent default and do nothing.
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab: cycle backward.
        if (active === first || !container.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: cycle forward.
        if (active === last || !container.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, containerRef]);
}
