"use client";

import { useMemo, useSyncExternalStore } from "react";
import { projects } from "@/lib/projects";

const DEFAULT_PIN_LIMIT = 4;
const PINNED_KEY = "pinned-projects";
const subscribers = new Set<() => void>();

function getDefaultPinnedIds() {
  return projects.some((project) => project.pinned)
    ? projects
        .filter((project) => project.pinned)
        .slice(0, DEFAULT_PIN_LIMIT)
        .map((project) => project.id)
    : projects.slice(0, DEFAULT_PIN_LIMIT).map((project) => project.id);
}

const defaultPinnedIds = getDefaultPinnedIds();
const defaultPinnedIdsSnapshot = JSON.stringify(defaultPinnedIds);

function sanitizePinnedIds(value: unknown) {
  if (!Array.isArray(value)) return defaultPinnedIds;
  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, DEFAULT_PIN_LIMIT);
}

function getServerPinnedSnapshot() {
  return defaultPinnedIdsSnapshot;
}

function getPinnedSnapshot() {
  if (typeof window === "undefined") return defaultPinnedIdsSnapshot;

  try {
    const stored = window.localStorage.getItem(PINNED_KEY);
    if (!stored) return defaultPinnedIdsSnapshot;

    const parsed = JSON.parse(stored);
    return JSON.stringify(sanitizePinnedIds(parsed));
  } catch {
    return defaultPinnedIdsSnapshot;
  }
}

function emitPinnedChange() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribePinnedProjects(callback: () => void) {
  subscribers.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === PINNED_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function writePinnedIds(ids: string[]) {
  window.localStorage.setItem(PINNED_KEY, JSON.stringify(ids));
  emitPinnedChange();
}

export function usePinnedProjects() {
  const pinnedSnapshot = useSyncExternalStore(
    subscribePinnedProjects,
    getPinnedSnapshot,
    getServerPinnedSnapshot
  );
  const pinnedIds = useMemo(() => {
    try {
      return sanitizePinnedIds(JSON.parse(pinnedSnapshot));
    } catch {
      return defaultPinnedIds;
    }
  }, [pinnedSnapshot]);

  const isMounted = true;

  const togglePin = (id: string) => {
    const nextPinnedIds = [...pinnedIds];

    if (nextPinnedIds.includes(id)) {
      const filtered = nextPinnedIds.filter((pinId) => pinId !== id);
      writePinnedIds(filtered);
      return;
    }

    if (nextPinnedIds.length >= DEFAULT_PIN_LIMIT) {
      // Replace the oldest pin (first in array)
      nextPinnedIds.shift();
    }
    nextPinnedIds.push(id);
    writePinnedIds(nextPinnedIds);
  };

  const isPinned = (id: string) => pinnedIds.includes(id);

  return { pinnedIds, togglePin, isPinned, isMounted };
}
