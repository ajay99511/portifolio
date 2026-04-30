import Link from "next/link";
import { Code } from "lucide-react";
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

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
        <span className="text-brand-orange">_</span>AJAY
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 font-mono text-sm uppercase tracking-widest text-zinc-400">        
          <Link href="/#expertise" className="hover:text-white transition-colors">Expertise</Link>
          <Link href="/#archive" className="hover:text-white transition-colors">Archive</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/#timeline" className="hover:text-white transition-colors">Timeline</Link>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><GithubIcon size={20} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Code size={20} /></a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
