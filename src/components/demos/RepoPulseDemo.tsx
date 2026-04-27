"use client";

import { useState } from "react";
import { 
  Activity, 
  LayoutGrid, 
  Box, 
  FolderPlus, 
  Plus, 
  Search,
  Filter,
  Star,
  GitFork,
  Check,
  Copy,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

// Mock Data
const SPACES = [
  { id: "s1", name: "Frontend Apps" },
  { id: "s2", name: "Backend Services" },
  { id: "s3", name: "Machine Learning" },
];

const REPOS = [
  {
    id: "r1",
    name: "portfolio-nextjs",
    description: "My personal portfolio built with Next.js, Tailwind, and Framer Motion.",
    language: "TypeScript",
    starCount: 12,
    pushedAt: "2h ago",
    spaces: ["s1"]
  },
  {
    id: "r2",
    name: "repo-pulse",
    description: "GitHub repository manager with custom spaces and cross-device sync.",
    language: "TypeScript",
    starCount: 8,
    pushedAt: "1d ago",
    spaces: ["s1", "s2"]
  },
  {
    id: "r3",
    name: "dl-algorithms",
    description: "From-scratch implementations of GPT, ViT, and RLHF in PyTorch.",
    language: "Python",
    starCount: 45,
    pushedAt: "3d ago",
    spaces: ["s3"]
  },
  {
    id: "r4",
    name: "fastbeat-player",
    description: "Android media player with ExoPlayer, Media3, and Room database.",
    language: "Kotlin",
    starCount: 24,
    pushedAt: "1w ago",
    spaces: ["s1"]
  },
  {
    id: "r5",
    name: "go-micro-auth",
    description: "High-performance JWT authentication microservice written in Go.",
    language: "Go",
    starCount: 19,
    pushedAt: "2w ago",
    spaces: ["s2"]
  },
  {
    id: "r6",
    name: "rust-cli-tools",
    description: "Blazing fast CLI utilities for file manipulation and data processing.",
    language: "Rust",
    starCount: 156,
    pushedAt: "1mo ago",
    spaces: ["s2"]
  }
];

// Theme Tokens extracted from repo_pulse
const THEME = {
  bg: "#0a0a0a",
  card: "#121212",
  border: "#262626",
  muted: "#262626",
  textMain: "#ededed",
  textMuted: "#a3a3a3",
  accent: "#f59e0b" // amber-500
};

function getLanguageColor(lang: string) {
  switch (lang.toLowerCase()) {
    case "typescript": return "border-blue-500/50 text-blue-400";
    case "python": return "border-green-500/50 text-green-400";
    case "kotlin": return "border-purple-500/50 text-purple-400";
    case "go": return "border-sky-500/50 text-sky-400";
    case "rust": return "border-orange-500/50 text-orange-400";
    default: return "border-gray-500/50 text-gray-400";
  }
}

export default function RepoPulseDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "repo-pulse");
  
  const [activeSpaceId, setActiveSpaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeSpace = activeSpaceId ? SPACES.find(s => s.id === activeSpaceId) : null;
  
  let filteredRepos = activeSpaceId 
    ? REPOS.filter(r => r.spaces.includes(activeSpaceId)) 
    : REPOS;
    
  if (searchQuery) {
    filteredRepos = filteredRepos.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalStars = filteredRepos.reduce((acc, r) => acc + r.starCount, 0);

  return (
    <div 
      className="h-full rounded-lg border overflow-hidden flex font-sans text-sm relative shadow-2xl" 
      style={{ borderColor: THEME.border, background: THEME.bg, color: THEME.textMain }}
    >
      {/* Sidebar */}
      <aside 
        className="w-64 shrink-0 border-r flex flex-col hidden md:flex" 
        style={{ borderColor: THEME.border, background: "rgba(18, 18, 18, 0.3)" }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8" style={{ color: THEME.accent }} />
            <h1 className="text-xl font-bold tracking-tight">RepoPulse</h1>
          </div>
        </div>
        
        <nav className="flex-grow px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: THEME.textMuted }}>
            System
          </div>
          <button
            onClick={() => setActiveSpaceId(null)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ 
              background: activeSpaceId === null ? THEME.textMain : "transparent", 
              color: activeSpaceId === null ? THEME.bg : THEME.textMain 
            }}
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              All Projects
            </div>
            <div 
              className="px-2 py-0.5 rounded-md text-[10px]"
              style={{ 
                background: activeSpaceId === null ? "rgba(0,0,0,0.1)" : THEME.muted,
                border: `1px solid ${activeSpaceId === null ? "transparent" : THEME.border}`
              }}
            >
              {REPOS.length}
            </div>
          </button>

          <div className="pt-6 px-3 mb-2 flex items-center justify-between group">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: THEME.textMuted }}>
              Spaces
            </span>
            <button className="opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all hover:bg-white/10">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {SPACES.map((space) => {
            const count = REPOS.filter(r => r.spaces.includes(space.id)).length;
            const isActive = activeSpaceId === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                style={{ 
                  background: isActive ? THEME.textMain : "transparent", 
                  color: isActive ? THEME.bg : THEME.textMain 
                }}
              >
                <div className="flex items-center gap-2 truncate">
                  <Box className="w-4 h-4 opacity-70" />
                  <span className="truncate">{space.name}</span>
                </div>
                <div 
                  className="px-2 py-0.5 rounded-md text-[10px]"
                  style={{ 
                    background: isActive ? "rgba(0,0,0,0.1)" : THEME.muted,
                    border: `1px solid ${isActive ? "transparent" : THEME.border}`
                  }}
                >
                  {count}
                </div>
              </button>
            );
          })}

          <div className="pt-8 pb-4">
            <button
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed transition-colors text-sm font-medium hover:border-white/50"
              style={{ borderColor: "rgba(163, 163, 163, 0.3)", color: THEME.textMain }}
            >
              <FolderPlus className="w-4 h-4" />
              New Space
            </button>
          </div>
        </nav>

        <div className="p-4 border-t mt-auto flex items-center gap-3" style={{ borderColor: THEME.border }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-purple-500 shrink-0 border border-white/20" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate">Alex Developer</span>
            <span className="text-[10px] truncate" style={{ color: THEME.textMuted }}>@alexdev</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <div className="flex flex-col p-6 md:p-8 lg:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between items-start gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest opacity-60" style={{ color: THEME.textMuted }}>
                Dashboard / {activeSpaceId === null ? "All Projects" : "Space"}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">
                {activeSpaceId === null ? "Repo Command Center" : activeSpace?.name}
              </h2>
              <p className="text-sm max-w-2xl" style={{ color: THEME.textMuted }}>
                {activeSpaceId === null 
                  ? "Unified view of all your codebases across platforms." 
                  : `Manage select repositories for ${activeSpace?.name}.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full xl:w-auto shrink-0">
              <div className="border rounded-2xl p-4 flex flex-col gap-1 min-w-[120px] shadow-sm" style={{ borderColor: THEME.border, background: THEME.card }}>
                <span className="text-[10px] font-bold uppercase opacity-60 tracking-wider" style={{ color: THEME.textMuted }}>
                  Active Focus
                </span>
                <span className="text-2xl font-bold">{filteredRepos.length}</span>
              </div>
              <div className="border rounded-2xl p-4 flex flex-col gap-1 min-w-[120px] shadow-sm" style={{ borderColor: THEME.border, background: THEME.card }}>
                <span className="text-[10px] font-bold uppercase opacity-60 tracking-wider" style={{ color: THEME.textMuted }}>
                  Collective Stars
                </span>
                <span className="text-2xl font-bold" style={{ color: THEME.accent }}>
                  {totalStars}
                </span>
              </div>
            </div>
          </div>

          {/* Efficiency Bar (Filter) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full items-center p-1.5 rounded-xl border shadow-sm" style={{ borderColor: THEME.border, background: THEME.card }}>
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" style={{ color: THEME.textMuted }} />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm pl-10 pr-4 py-2 outline-none"
                style={{ color: THEME.textMain }}
              />
            </div>
            <div className="hidden sm:block w-px h-6 opacity-30" style={{ background: THEME.border }} />
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/5" style={{ color: THEME.textMuted }}>
              <Filter className="w-4 h-4" />
              <span>Sort: Updated</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRepos.length === 0 ? (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center border border-dashed rounded-xl" style={{ borderColor: THEME.border }}>
                <Search className="w-10 h-10 mb-4 opacity-20" style={{ color: THEME.textMuted }} />
                <p className="text-sm font-medium">No repositories found.</p>
                <p className="text-xs opacity-60 mt-1" style={{ color: THEME.textMuted }}>Try adjusting your search or filters.</p>
              </div>
            ) : (
              filteredRepos.map(repo => (
                <div 
                  key={repo.id} 
                  className="flex flex-col group transition-all duration-300 border rounded-xl"
                  style={{ borderColor: THEME.border, background: THEME.card }}
                >
                  <div className="p-4 flex-grow space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-bold text-base truncate group-hover:text-amber-400 transition-colors cursor-pointer">
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] font-medium" style={{ color: THEME.textMuted }}>
                          {repo.starCount > 20 && (
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse ring-2 ring-green-500/20" />
                          )}
                          <span>Updated {repo.pushedAt}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed font-medium line-clamp-2 opacity-80">
                      {repo.description}
                    </p>
                  </div>

                  <div className="p-4 pt-0 flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-semibold border bg-white/5", getLanguageColor(repo.language))}>
                          {repo.language}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: THEME.muted, color: THEME.textMuted }}>
                          <Star className="w-3 h-3" style={{ color: THEME.accent, fill: THEME.accent }} />
                          {repo.starCount}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md hover:bg-white/10"><Copy className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-md hover:bg-white/10"><ExternalLink className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    {activeSpaceId === null && repo.spaces.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 border-t pt-3 w-full" style={{ borderColor: THEME.border }}>
                        {repo.spaces.map(sId => {
                          const s = SPACES.find(space => space.id === sId);
                          return s ? (
                            <span key={s.id} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-bold tracking-tight uppercase opacity-60">
                              {s.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart projectId="repo-pulse" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
