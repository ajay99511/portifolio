/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Unit tests for MobileMenu
 * Requirements: 1.2, 1.3, 1.4, 1.7
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MobileMenu from "./MobileMenu";
import { FEATURES } from "@/lib/features";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so AnimatePresence renders children immediately in jsdom
// (no animation delays, no exit animations that would keep elements in the DOM).
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, tag: string) => {
          // Return a plain element factory for any motion.* tag
          const Component = React.forwardRef(
            (
              { children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode },
              ref: React.Ref<HTMLElement>
            ) =>
              React.createElement(tag, { ...props, ref }, children)
          );
          Component.displayName = `motion.${tag}`;
          return Component;
        },
      }
    ),
    // AnimatePresence simply renders its children directly
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock next/link as a plain <a> so we can query by role and href without
// needing the Next.js router context.
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

// Mock @/lib/projects.data so socialLinks is lazily evaluated and respects
// the linkedInEnabled flag toggled in individual tests.
const linkedInEnabled = { value: true };
vi.mock("@/lib/projects.data", () => ({
  get socialLinks() {
    const all = [
      { platform: "GitHub", url: "https://github.com/test" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/e-aj-47b71238b/" },
      { platform: "LeetCode", url: "https://leetcode.com/u/ajay216/" },
    ];
    return all.filter(
      (link: { platform: string }) => link.platform !== "LinkedIn" || linkedInEnabled.value
    );
  },
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("MobileMenu", () => {
  beforeEach(() => {
    FEATURES.enableResume = true;
    FEATURES.enableLinkedIn = true;
    linkedInEnabled.value = true;
  });

  // -------------------------------------------------------------------------
  // 1. When isOpen is true, all three nav links are present in the DOM
  // -------------------------------------------------------------------------
  it("renders all four nav links when isOpen is true", () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.getByRole("link", { name: /directory/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /credentials/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /resume/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /journals/i })
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 1b. When FEATURES.enableResume is false, the resume link is NOT rendered
  // -------------------------------------------------------------------------
  it("does not render the resume link when FEATURES.enableResume is false", () => {
    FEATURES.enableResume = false;
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.getByRole("link", { name: /directory/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /credentials/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /resume/i })
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: /journals/i })
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 2. When isOpen is false, drawer has aria-hidden="true"
  // -------------------------------------------------------------------------
  it('sets aria-hidden="true" on the drawer when isOpen is false', () => {
    render(<MobileMenu isOpen={false} onClose={vi.fn()} />);

    // The drawer is the outer wrapper div that always stays in the DOM.
    // It carries aria-hidden when closed.
    const drawer = document
      .querySelector('[aria-hidden="true"]');

    expect(drawer).not.toBeNull();
    expect(drawer).toHaveAttribute("aria-hidden", "true");
  });

  // -------------------------------------------------------------------------
  // 3. Clicking a nav link calls onClose
  // -------------------------------------------------------------------------
  it("calls onClose when a nav link is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<MobileMenu isOpen={true} onClose={onClose} />);

    // Click each of the four links and verify onClose is called each time.
    await user.click(screen.getByRole("link", { name: /directory/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("link", { name: /credentials/i }));
    expect(onClose).toHaveBeenCalledTimes(2);

    await user.click(screen.getByRole("link", { name: /resume/i }));
    expect(onClose).toHaveBeenCalledTimes(3);

    await user.click(screen.getByRole("link", { name: /journals/i }));
    expect(onClose).toHaveBeenCalledTimes(4);
  });

  // -------------------------------------------------------------------------
  // 4. Clicking the backdrop calls onClose
  // -------------------------------------------------------------------------
  it("calls onClose when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<MobileMenu isOpen={true} onClose={onClose} />);

    // The backdrop is the full-viewport div with aria-hidden="true" that sits
    // behind the drawer. It is the only element with both aria-hidden and an
    // onClick handler at the top level (the drawer wrapper also has aria-hidden
    // when closed, but the backdrop is only rendered when isOpen is true).
    // We identify it by its fixed-inset class and z-[100] (below the drawer z-[110]).
    const backdrop = document.querySelector(".fixed.inset-0.z-\\[100\\]");
    expect(backdrop).not.toBeNull();

    await user.click(backdrop as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // 5. Clicking the close button calls onClose
  // -------------------------------------------------------------------------
  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<MobileMenu isOpen={true} onClose={onClose} />);

    const closeButton = screen.getByRole("button", {
      name: /close navigation menu/i,
    });

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // 6. LinkedIn social link is visible when FEATURES.enableLinkedIn is true
  // -------------------------------------------------------------------------
  it("renders LinkedIn social link when FEATURES.enableLinkedIn is true", () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.getByLabelText(/visit linkedin/i)
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 7. LinkedIn social link is hidden when FEATURES.enableLinkedIn is false
  // -------------------------------------------------------------------------
  it("does not render LinkedIn social link when FEATURES.enableLinkedIn is false", () => {
    FEATURES.enableLinkedIn = false;
    linkedInEnabled.value = false;
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.queryByLabelText(/visit linkedin/i)
    ).toBeNull();
  });
});
