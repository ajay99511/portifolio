/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Unit tests for Navbar
 * Requirements: 1.1, 1.5, 1.6, 6.1, 6.3
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Navbar from "./Navbar";
import { FEATURES } from "@/lib/features";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so AnimatePresence renders children immediately in jsdom.
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, tag: string) => {
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
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock next/link as a plain <a>.
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

// Mock usePathname so the component doesn't need a Next.js router context.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock @/lib/projects.data with minimal fixture data.
// The getter reads linkedInEnabled so toggling it in tests changes the result.
const linkedInEnabled = { value: true };
vi.mock("@/lib/projects.data", () => ({
  profile: { name: "Test User" },
  get socialLinks() {
    const all = [
      { platform: "GitHub", url: "https://github.com/test" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/test" },
    ];
    return all.filter(
      (link: { platform: string }) => link.platform !== "LinkedIn" || linkedInEnabled.value
    );
  },
}));

// Mock MobileMenu so we can inspect the isOpen prop without needing the full
// component tree (focus trap, framer-motion drawer, etc.).
let capturedIsOpen: boolean | undefined;
vi.mock("@/components/MobileMenu", () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    capturedIsOpen = isOpen;
    return (
      <div data-testid="mobile-menu" data-is-open={String(isOpen)}>
        {isOpen && (
          <button onClick={onClose} aria-label="Close navigation menu">
            ×
          </button>
        )}
      </div>
    );
  },
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Navbar", () => {
  beforeEach(() => {
    capturedIsOpen = undefined;
    FEATURES.enableLinkedIn = true;
    linkedInEnabled.value = true;
  });

  // -------------------------------------------------------------------------
  // 1. Hamburger button has `sm:hidden` class (hidden at sm and above)
  //    Requirement 1.1 — only one navigation style visible at any viewport width
  //    Requirement 6.1 — hamburger has minimum 44×44 px tap target
  // -------------------------------------------------------------------------
  it("hamburger button has sm:hidden class so it is hidden at sm breakpoint and above", () => {
    render(<Navbar />);

    const hamburger = screen.getByRole("button", {
      name: /open navigation menu/i,
    });

    expect(hamburger).toBeInTheDocument();
    expect(hamburger.className).toContain("sm:hidden");
  });

  // -------------------------------------------------------------------------
  // 2. Inline nav links container has `hidden sm:flex` classes
  //    Requirement 1.1 — inline links hidden below sm
  //    Requirement 1.5 — inline links visible at sm and above
  // -------------------------------------------------------------------------
  it("inline nav links container has hidden and sm:flex classes", () => {
    render(<Navbar />);

    // The inline nav links are wrapped in a div with `hidden sm:flex`.
    // Query by the Directory link and walk up to its container.
    const directoryLink = screen.getByRole("link", { name: /directory/i });
    const container = directoryLink.parentElement as HTMLElement;

    expect(container.className).toContain("hidden");
    expect(container.className).toContain("sm:flex");
  });

  // -------------------------------------------------------------------------
  // 3. Social icon wrappers have min-w-[44px] and min-h-[44px]
  //    Requirement 6.3 — social icon links have 44×44 px tap target
  // -------------------------------------------------------------------------
  it("social icon wrappers have min-w-[44px] and min-h-[44px] classes", () => {
    render(<Navbar />);

    // Each social link is wrapped in a <span> with the tap-target classes.
    // We locate the <a> elements by their title attribute and check the parent.
    const githubLink = screen.getByTitle("GitHub");
    const linkedinLink = screen.getByTitle("LinkedIn");

    const githubWrapper = githubLink.parentElement as HTMLElement;
    const linkedinWrapper = linkedinLink.parentElement as HTMLElement;

    expect(githubWrapper.className).toContain("min-w-[44px]");
    expect(githubWrapper.className).toContain("min-h-[44px]");
    expect(linkedinWrapper.className).toContain("min-w-[44px]");
    expect(linkedinWrapper.className).toContain("min-h-[44px]");
  });

  // -------------------------------------------------------------------------
  // 4. Clicking the hamburger renders MobileMenu with isOpen={true}
  //    Requirement 1.1, 1.6 — hamburger toggles the mobile menu open
  // -------------------------------------------------------------------------
  it("clicking the hamburger button passes isOpen={true} to MobileMenu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Before clicking, MobileMenu should be closed.
    expect(capturedIsOpen).toBe(false);

    const hamburger = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    await user.click(hamburger);

    // After clicking, MobileMenu should receive isOpen={true}.
    expect(capturedIsOpen).toBe(true);

    // The data attribute on our mock also reflects the state.
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveAttribute("data-is-open", "true");
  });

  // -------------------------------------------------------------------------
  // 5. LinkedIn icon is visible when FEATURES.enableLinkedIn is true
  // -------------------------------------------------------------------------
  it("renders LinkedIn social icon when FEATURES.enableLinkedIn is true", () => {
    render(<Navbar />);

    expect(screen.getByTitle("LinkedIn")).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 6. LinkedIn icon is hidden when FEATURES.enableLinkedIn is false
  // -------------------------------------------------------------------------
  it("does not render LinkedIn social icon when FEATURES.enableLinkedIn is false", () => {
    FEATURES.enableLinkedIn = false;
    linkedInEnabled.value = false;
    render(<Navbar />);

    expect(screen.queryByTitle("LinkedIn")).toBeNull();
  });
});
