import type { Project } from "@/types";
import { projectCatalog } from "./projects.data";

export const projects: Project[] = projectCatalog.map((project, index) => ({
  ...project,
  index: (index + 1).toString().padStart(2, "0"),
}));

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
