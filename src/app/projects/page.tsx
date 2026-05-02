import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectGallery from "@/components/ProjectGallery";

export const metadata: Metadata = {
  title: "All Projects — Ajay Portfolio",
  description:
    "Explore the complete collection of engineering projects by Ajay — interactive demos, source code, and technical deep-dives.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1">
      <Navbar />
      <ProjectGallery />

      <footer className="py-8 sm:py-12 section-px border-t border-zinc-900 bg-black text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-widest">
          © 2026 AJAY // FULL_STACK_ENGINEER // PORTFOLIO_PREVIEW
        </p>
      </footer>
    </main>
  );
}
