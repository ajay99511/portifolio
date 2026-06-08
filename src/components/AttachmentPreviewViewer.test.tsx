/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Unit tests for AttachmentPreviewViewer
 * Requirements: 12.1, 12.2, 12.7
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AttachmentPreviewViewer from "./AttachmentPreviewViewer";
import type { AttachmentAsset } from "@/lib/attachments";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Mock framer-motion so motion.div renders as a plain div immediately.
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
                ...props
              }: React.HTMLAttributes<HTMLElement> & {
                children?: React.ReactNode;
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

// Mock next/link as a plain <a>.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock next/image as a plain <img>.
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    fill,
    sizes,
    ...rest
  }: {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    sizes?: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} {...rest} />
  ),
}));

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const pdfAttachment: AttachmentAsset = {
  id: "test-pdf",
  title: "Test PDF",
  description: "A test PDF attachment",
  fileName: "test.pdf",
  url: "/test.pdf",
  extension: "pdf",
  kind: "pdf",
  group: "certification",
  updatedAt: "Jan 1, 2025",
  sizeLabel: "100 KB",
};

const imageAttachment: AttachmentAsset = {
  id: "test-image",
  title: "Test Image",
  description: "A test image attachment",
  fileName: "test.png",
  url: "/test.png",
  extension: "png",
  kind: "image",
  group: "certification",
  updatedAt: "Jan 1, 2025",
  sizeLabel: "200 KB",
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("AttachmentPreviewViewer", () => {
  // -------------------------------------------------------------------------
  // 1. PDF iframe container has `h-[60vh]` class
  //    Requirement 12.1 — PDF preview uses 60vh height on mobile
  // -------------------------------------------------------------------------
  it("PDF iframe container has h-[60vh] class", () => {
    const { container } = render(
      <AttachmentPreviewViewer attachment={pdfAttachment} />
    );

    // The PDF preview wraps the iframe in a div with h-[60vh]
    const iframeEl = container.querySelector("iframe");
    expect(iframeEl).not.toBeNull();

    const iframeContainer = iframeEl!.parentElement as HTMLElement;
    expect(iframeContainer.className).toContain("h-[60vh]");
  });

  // -------------------------------------------------------------------------
  // 2. Image preview container has `h-[50vh]` class
  //    Requirement 12.2 — image preview uses 50vh height on mobile
  // -------------------------------------------------------------------------
  it("image preview container has h-[50vh] class", () => {
    const { container } = render(
      <AttachmentPreviewViewer attachment={imageAttachment} />
    );

    const imgEl = container.querySelector("img");
    expect(imgEl).not.toBeNull();

    // Walk up to the outer preview container (img → relative wrapper → outer div)
    const relativeWrapper = imgEl!.parentElement as HTMLElement;
    const outerContainer = relativeWrapper.parentElement as HTMLElement;
    expect(outerContainer.className).toContain("h-[50vh]");
  });

  // -------------------------------------------------------------------------
  // 3. Back-navigation link has `min-h-[44px]` class
  //    Requirement 12.7 — back link meets 44 px touch target
  // -------------------------------------------------------------------------
  it("back-navigation link has min-h-[44px] class", () => {
    render(<AttachmentPreviewViewer attachment={pdfAttachment} />);

    // The back link contains "Back_To_Certifications" text for certification group
    const backLink = screen.getByRole("link", {
      name: /back_to_certifications/i,
    });

    expect(backLink.className).toContain("min-h-[44px]");
  });

  // -------------------------------------------------------------------------
  // 4. Action buttons container has `flex-wrap` class
  //    Requirement 12.4 — Download/Open buttons wrap on narrow viewports
  // -------------------------------------------------------------------------
  it("action buttons container has flex-wrap class", () => {
    const { container } = render(
      <AttachmentPreviewViewer attachment={pdfAttachment} />
    );

    // The action buttons container holds the "Open" and "Download" links.
    // It has flex-wrap to keep both buttons visible on narrow viewports.
    const openLink = screen.getByRole("link", { name: /open/i });
    const downloadLink = screen.getByRole("link", { name: /download/i });

    // Both links share the same parent container
    const buttonsContainer = openLink.parentElement as HTMLElement;
    expect(buttonsContainer).toBe(downloadLink.parentElement);
    expect(buttonsContainer.className).toContain("flex-wrap");
  });
});
