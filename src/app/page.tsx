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
      
      <footer className="py-12 px-6 md:px-24 border-t border-zinc-900 bg-black text-center">
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          © 2026 AJAY // FULL_STACK_ENGINEER // PORTFOLIO_PREVIEW
        </p>
      </footer>
    </main>
  );
}
