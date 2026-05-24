"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "/ Directory", href: "/" },
  { label: "/ Credentials", href: "/certifications" },
  { label: "/ Resume", href: "/preview/resume" },
  { label: "/ Journals", href: "/blogs" },
] as const;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus inside the drawer while it is open.
  useFocusTrap(drawerRef, isOpen);

  // Manage aria-hidden and inert imperatively — `inert` is not yet a first-class
  // React prop in all TypeScript DOM lib versions, so we set it via the DOM API.
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (isOpen) {
      drawer.removeAttribute("aria-hidden");
      drawer.removeAttribute("inert");
    } else {
      drawer.setAttribute("aria-hidden", "true");
      // `inert` is a boolean attribute — presence means true.
      drawer.setAttribute("inert", "");
    }
  }, [isOpen]);

  return (
    <>
      {/* Full-viewport backdrop — click closes the menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Slide-in drawer — always in the DOM so the ref is stable for focus trap */}
      <div
        ref={drawerRef}
        // Initial aria-hidden / inert state is set by the useEffect above on mount.
        // We also set it here as a fallback for the very first render before the
        // effect fires (avoids a brief window where the drawer is accessible).
        aria-hidden={!isOpen ? "true" : undefined}
        className="fixed inset-y-0 left-0 z-[110] w-72 max-w-[85vw]"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu-drawer"
              className="h-full bg-surface-bg border-r border-surface-border flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
            >
              {/* Header row — close button at top-right */}
              <div className="flex items-center justify-end px-4 py-3 border-b border-surface-border">
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors rounded"
                >
                  <span className="text-xl leading-none" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>

              {/* Navigation links */}
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col px-4 py-6 gap-2">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className="min-h-[44px] flex items-center text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
