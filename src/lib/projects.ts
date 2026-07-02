import { projectCatalog } from "./projects.data";

export const projects = projectCatalog.map((project, index) => ({
  ...project,
  index: (index + 1).toString().padStart(2, "0"),
  tags: project.techStack ?? [],
  fullDescription: project.longDescription,
  githubUrl: project.repoUrl,
  steps: project.quickStartSteps,
}));

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

/**
 * Returns projects marked as `featured` in the catalog, sorted by `displayOrder`.
 * Used on the home page to show a curated subset of projects.
 */
export function getFeaturedProjects() {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}
