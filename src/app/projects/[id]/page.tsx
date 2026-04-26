import { getProjectById } from "@/lib/projects";
import WalkthroughEngine from "@/components/WalkthroughEngine";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <WalkthroughEngine project={project} />
    </main>
  );
}
