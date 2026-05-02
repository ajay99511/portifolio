import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import ProjectArchive from "@/components/ProjectArchive";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <Expertise />
      <ProjectArchive />
      <Timeline />
      
      <footer className="py-8 sm:py-12 section-px border-t border-zinc-900 bg-black text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-widest">
          © 2026 AJAY // FULL_STACK_ENGINEER // PORTFOLIO_PREVIEW
        </p>
      </footer>
    </main>
  );
}
