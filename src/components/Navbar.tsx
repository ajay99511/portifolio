"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Terminal, Code } from 'lucide-react';
import { socialLinks, profile } from '@/lib/projects.data';
import MobileMenu from '@/components/MobileMenu';

// Inline SVGs for icons removed from lucide-react 1.x
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SocialIcon = ({ platform, className }: { platform: string, className?: string }) => {
  switch (platform) {
    case 'GitHub': return <GitHubIcon className={className} />;
    case 'LinkedIn': return <LinkedInIcon className={className} />;
    case 'Twitter': return <X className={className} />;
    case 'LeetCode': return <Code className={className} />;
    default: return null;
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-surface-border bg-surface-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-zinc-100 rounded-sm flex items-center justify-center text-black transition-transform group-hover:rotate-6">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-[11px] font-mono tracking-tighter text-zinc-500 uppercase">Engineer</span>
            <span className="text-xs font-semibold tracking-tight text-white group-hover:text-brand-orange transition-colors uppercase">{profile.name}</span>
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          <div className="hidden sm:flex gap-6 items-center">
            <Link 
              href="/" 
              className={`text-[10px] uppercase tracking-widest font-bold transition-all ${isHome ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              / Directory
            </Link>
            <Link 
              href="/certifications" 
              className={`text-[10px] uppercase tracking-widest font-bold transition-all ${pathname.startsWith('/certifications') ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              / Credentials
            </Link>
            <Link 
              href="/blogs" 
              className={`text-[10px] uppercase tracking-widest font-bold transition-all ${pathname.startsWith('/blogs') ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              / Journals
            </Link>
          </div>
          
          <div className="h-4 w-px bg-surface-border hidden sm:block" />

          <div className="flex items-center gap-4">
            {socialLinks.map((link: { platform: string; url: string }) => (
              <span key={link.platform} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                <a 
                  href={link.url}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-500 hover:text-white transition-all hover:-translate-y-0.5"
                  title={link.platform}
                >
                  <SocialIcon platform={link.platform} className="h-3.5 w-3.5" />
                </a>
              </span>
            ))}
          </div>

          {/* Hamburger / close toggle — visible only below sm breakpoint */}
          <button
            className="sm:hidden w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {menuOpen ? '×' : '☰'}
            </span>
          </button>
        </nav>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
