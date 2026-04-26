import { getProjectById } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import ProjectInteractiveView from "@/components/ProjectInteractiveView";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
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
      <ProjectInteractiveView project={project} />
    </main>
  );
}
