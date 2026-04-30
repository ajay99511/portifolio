"use client";

import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";

export function usePinnedProjects() {
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Using setTimeout to avoid cascading render warning in some lint configurations
    const timer = setTimeout(() => setIsMounted(true), 0);
    const stored = localStorage.getItem("pinned-projects");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTimeout(() => setPinnedIds(parsed), 0);
          return;
        }
      } catch {
        // ignore JSON parse errors
      }
    }
    // Default to projects marked as pinned, falling back to first 4 if none are marked
    const defaultIds = projects.some(p => p.pinned)
      ? projects.filter(p => p.pinned).slice(0, 4).map(p => p.id)
      : projects.slice(0, 4).map(p => p.id);
    
    setTimeout(() => setPinnedIds(defaultIds), 0);
    return () => clearTimeout(timer);
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
