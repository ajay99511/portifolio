"use client";

import Link from "next/link";
import { Code, UserCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
        <span className="text-brand-orange">_</span>ARCHITECT
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 font-mono text-sm uppercase tracking-widest text-zinc-400">
          <Link href="/#expertise" className="hover:text-white transition-colors">Expertise</Link>
          <Link href="/#archive" className="hover:text-white transition-colors">Archive</Link>
          <Link href="/#timeline" className="hover:text-white transition-colors">Timeline</Link>
        </div>
        
        <div className="flex items-center gap-4 text-zinc-400">
          <a href="#" className="hover:text-white transition-colors"><Code size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><UserCircle size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Share2 size={20} /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
