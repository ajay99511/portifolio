"use client";

import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";

export function usePinnedProjects() {
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("pinned-projects");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPinnedIds(parsed);
          return;
        }
      } catch (e) {
        // ignore JSON parse errors
      }
    }
    // Default to the first 4 projects (or all if 4 or fewer)
    const defaultIds = projects.slice(0, 4).map(p => p.id);
    setPinnedIds(defaultIds);
  }, []);

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      let newIds = [...prev];
      if (newIds.includes(id)) {
        newIds = newIds.filter(pid => pid !== id);
      } else {
        if (newIds.length >= 4) {
          // Replace the oldest pin (first in array)
          newIds.shift();
        }
        newIds.push(id);
      }
      localStorage.setItem("pinned-projects", JSON.stringify(newIds));
      return newIds;
    });
  };

  const isPinned = (id: string) => pinnedIds.includes(id);

  return { pinnedIds, togglePin, isPinned, isMounted };
}
