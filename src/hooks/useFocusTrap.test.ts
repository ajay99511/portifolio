/**
 * Unit tests for useFocusTrap
 * Requirements: 1.8
 */
import { renderHook, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a real DOM container with the given inner HTML, appends it to
 * document.body, and returns it along with a cleanup function.
 */
function createContainer(innerHTML: string): {
  container: HTMLDivElement;
  cleanup: () => void;
} {
  const container = document.createElement("div");
  container.innerHTML = innerHTML;
  document.body.appendChild(container);
  return {
    container,
    cleanup: () => {
      document.body.removeChild(container);
    },
  };
}

/**
 * Renders the hook with a pre-built container ref so we can control the DOM
 * independently of React's render cycle.
 */
function renderTrap(
  container: HTMLDivElement | null,
  initialActive: boolean
) {
  return renderHook(
    ({ active }: { active: boolean }) => {
      // Build a stable ref that always points at the provided container.
      const ref = useRef<HTMLElement | null>(container);
      useFocusTrap(ref, active);
    },
    { initialProps: { active: initialActive } }
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useFocusTrap", () => {
  // -------------------------------------------------------------------------
  // Tab — forward cycling
  // -------------------------------------------------------------------------
  it("Tab key cycles focus forward through focusable elements", async () => {
    const user = userEvent.setup();

    const { container, cleanup } = createContainer(`
      <button id="btn1">One</button>
      <button id="btn2">Two</button>
      <button id="btn3">Three</button>
    `);

    const [btn1, btn2, btn3] = [
      container.querySelector<HTMLElement>("#btn1")!,
      container.querySelector<HTMLElement>("#btn2")!,
      container.querySelector<HTMLElement>("#btn3")!,
    ];

    renderTrap(container, true);

    // On activation the hook moves focus to the first element.
    expect(document.activeElement).toBe(btn1);

    // Tab from first → second
    await act(() => user.tab());
    expect(document.activeElement).toBe(btn2);

    // Tab from second → third
    await act(() => user.tab());
    expect(document.activeElement).toBe(btn3);

    // Tab from last → wraps back to first
    await act(() => user.tab());
    expect(document.activeElement).toBe(btn1);

    cleanup();
  });

  // -------------------------------------------------------------------------
  // Shift+Tab — backward cycling
  // -------------------------------------------------------------------------
  it("Shift+Tab cycles focus backward through focusable elements", async () => {
    const user = userEvent.setup();

    const { container, cleanup } = createContainer(`
      <button id="btn1">One</button>
      <button id="btn2">Two</button>
      <button id="btn3">Three</button>
    `);

    const [btn1, btn2, btn3] = [
      container.querySelector<HTMLElement>("#btn1")!,
      container.querySelector<HTMLElement>("#btn2")!,
      container.querySelector<HTMLElement>("#btn3")!,
    ];

    renderTrap(container, true);

    // Hook moves focus to first element on activation.
    expect(document.activeElement).toBe(btn1);

    // Shift+Tab from first → wraps to last
    await act(() => user.tab({ shift: true }));
    expect(document.activeElement).toBe(btn3);

    // Shift+Tab from last → second
    await act(() => user.tab({ shift: true }));
    expect(document.activeElement).toBe(btn2);

    // Shift+Tab from second → first
    await act(() => user.tab({ shift: true }));
    expect(document.activeElement).toBe(btn1);

    cleanup();
  });

  // -------------------------------------------------------------------------
  // Focus restoration on deactivation
  // -------------------------------------------------------------------------
  it("restores focus to the previously focused element when active becomes false", async () => {
    const { container, cleanup } = createContainer(`
      <button id="inner">Inner</button>
    `);

    // Create an element outside the trap that holds focus before activation.
    const outside = document.createElement("button");
    outside.id = "outside";
    document.body.appendChild(outside);
    outside.focus();
    expect(document.activeElement).toBe(outside);

    const { rerender } = renderTrap(container, true);

    // Trap is active — focus should have moved inside.
    expect(document.activeElement).toBe(
      container.querySelector<HTMLElement>("#inner")
    );

    // Deactivate the trap.
    act(() => {
      rerender({ active: false });
    });

    // Focus should be restored to the element that was focused before activation.
    expect(document.activeElement).toBe(outside);

    document.body.removeChild(outside);
    cleanup();
  });

  // -------------------------------------------------------------------------
  // Zero focusable children — no error thrown
  // -------------------------------------------------------------------------
  it("does not throw when the container has zero focusable children", () => {
    const { container, cleanup } = createContainer(`
      <p>No interactive elements here.</p>
      <span>Just text.</span>
    `);

    expect(() => {
      renderTrap(container, true);
    }).not.toThrow();

    cleanup();
  });
});
