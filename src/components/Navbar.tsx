"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89c.15-.38.65-1.84-.15-3.84 0 0-1.2-.38-3.9 1.45a13.38 13.38 0 0 0-7 0C4.2 2.27 3 2.65 3 2.65c-.8 2-.3 3.46-.15 3.84A5.5 5.5 0 0 0 1.5 10.38c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
    <path d="M1 19c3 1 4-1 5-1" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV_LINKS = [
  { href: "/#expertise", label: "Expertise" },
  { href: "/#archive", label: "Archive" },
  { href: "/projects", label: "Projects" },
  { href: "/#timeline", label: "Timeline" },
];

const SOCIAL_LINKS = [
  { href: profile.github, icon: GithubIcon, label: "GitHub" },
  { href: profile.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: profile.leetcode, icon: Code, label: "LeetCode" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="font-mono text-lg sm:text-xl font-bold tracking-tighter">
          <span className="text-brand-orange">_</span>AJAY
        </Link>

        {/* Desktop nav links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-mono text-sm uppercase tracking-widest text-zinc-400">        
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons — always visible */}
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label={label}>
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Hamburger toggle — mobile only */}
          <button
            className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              className="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Close */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 mb-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 font-mono text-sm uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-brand-orange mr-2">//</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social links */}
              <div className="mt-auto border-t border-white/5 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-4">Connect</p>
                <div className="flex items-center gap-5 text-zinc-500">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label={label}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
