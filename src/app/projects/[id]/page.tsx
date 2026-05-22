import { getProjectById, projects } from "@/lib/projects";
import ProjectInteractiveView from "@/components/ProjectInteractiveView";
import { notFound } from "next/navigation";

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
    <main id="main-content" className="min-h-screen bg-black">
      <ProjectInteractiveView project={project} />
    </main>
  );
}
