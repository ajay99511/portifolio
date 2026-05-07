import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import ProjectArchive from "@/components/ProjectArchive";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main id="main-content" className="flex-1 relative">
      <Navbar />
      <Hero />
      <Expertise />
      <ProjectArchive />
      <Timeline />

      <footer className="py-8 sm:py-12 section-px border-t border-white/8 bg-black/85 text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.18em]">
          Copyright 2026 AJAY // FULL_STACK_ENGINEER // PORTFOLIO_PREVIEW
        </p>
      </footer>
    </main>
  );
}
