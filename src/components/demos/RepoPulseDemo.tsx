"use client";

import { useState, useMemo } from "react";
import { 
  Activity, 
  LayoutGrid, 
  Box, 
  Plus, 
  Search,
  Filter,
  Star,
  Copy,
  ExternalLink,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

// Mock Data
const SPACES = [
  { id: "s1", name: "Frontend Nodes", description: "Edge-deployed consumer interfaces." },
  { id: "s2", name: "Backend Clusters", description: "Distributed service mesh components." },
  { id: "s3", name: "Neural Engines", description: "Large language model implementations." },
];

const REPOS = [
  {
    id: "r1",
    name: "nexus-core-ui",
    description: "Primary command interface for distributed infrastructure management.",
    language: "TypeScript",
    starCount: 142,
    pushedAt: "2h ago",
    spaces: ["s1"],
    status: "nominal"
  },
  {
    id: "r2",
    name: "repo-pulse-sync",
    description: "Synchronized state manager for cross-region dashboard telemetry.",
    language: "TypeScript",
    starCount: 89,
    pushedAt: "1d ago",
    spaces: ["s1", "s2"],
    status: "nominal"
  },
  {
    id: "r3",
    name: "gpt-causal-v4",
    description: "Causal self-attention engine with fused QKV projections and flash attention.",
    language: "Python",
    starCount: 1245,
    pushedAt: "3d ago",
    spaces: ["s3"],
    status: "active"
  },
  {
    id: "r4",
    name: "media-stream-android",
    description: "Mobile node for low-latency hardware-accelerated stream decoding.",
    language: "Kotlin",
    starCount: 64,
    pushedAt: "1w ago",
    spaces: ["s1"],
    status: "nominal"
  },
  {
    id: "r5",
    name: "auth-mesh-go",
    description: "Zero-trust authentication gateway with JWT rotation and rate limiting.",
    language: "Go",
    starCount: 312,
    pushedAt: "2w ago",
    spaces: ["s2"],
    status: "nominal"
  },
  {
    id: "r6",
    name: "data-pipe-rust",
    description: "High-throughput stream processing node with SIMD optimizations.",
    language: "Rust",
    starCount: 856,
    pushedAt: "1mo ago",
    spaces: ["s2"],
    status: "warning"
  }
];

function getLanguageColor(lang: string) {
  switch (lang.toLowerCase()) {
    case "typescript": return "border-[var(--brand-neon)]/30 text-cyan-400";
    case "python": return "border-emerald-500/30 text-emerald-400";
    case "kotlin": return "border-purple-500/30 text-purple-400";
    case "go": return "border-sky-500/30 text-sky-400";
    case "rust": return "border-orange-500/30 text-orange-400";
    default: return "border-zinc-800 text-zinc-400";
  }
}

export default function RepoPulseDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const [activeSpaceId, setActiveSpaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const projectData = projects.find((p) => p.id === "repo-pulse");
  
  const activeSpace = activeSpaceId ? SPACES.find(s => s.id === activeSpaceId) : null;
  
  const filteredRepos = useMemo(() => {
    let results = activeSpaceId 
      ? REPOS.filter(r => r.spaces.includes(activeSpaceId)) 
      : REPOS;
      
    if (searchQuery) {
      results = results.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return results;
  }, [activeSpaceId, searchQuery]);

  const totalStars = filteredRepos.reduce((acc, r) => acc + r.starCount, 0);

  return (
    <div 
      className="h-full rounded-xl border border-[var(--surface-border)] overflow-hidden flex flex-col lg:flex-row font-sans text-sm relative shadow-2xl transition-colors duration-500 bg-[var(--surface-bg)] text-[var(--text-primary)]" 
    >
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(180deg, transparent 0%, var(--brand-neon) 0.01%, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent 29px, var(--brand-neon) 29px, var(--brand-neon) 30px),
            repeating-linear-gradient(90deg, transparent, transparent 29px, var(--brand-neon) 29px, var(--brand-neon) 30px)
          `,
          backgroundSize: "100% 100%, 30px 30px, 30px 30px"
        }}
      />

      {/* Sidebar - Mobile Toggle */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-black/80 backdrop-blur-xl border-b border-[var(--surface-border)] px-4 py-3">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-[var(--brand-neon)]">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[var(--brand-neon)] drop-shadow-[0_0_8px_var(--brand-neon)]" />
          <span className="font-display font-bold text-xs tracking-widest uppercase text-[var(--brand-neon)]">RepoPulse</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-[var(--brand-neon)]/30 bg-zinc-800" />
      </div>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0 border-r border-[var(--surface-border)] flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(20px)" }}
      >
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 text-zinc-500">
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--brand-neon)] to-[var(--brand-purple)] rounded-2xl opacity-40 blur-lg group-hover:opacity-70 transition duration-500"></div>
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-black border-2 border-[var(--brand-neon)]/50">
                <Activity size={24} className="text-[var(--brand-neon)] drop-shadow-[0_0_8px_var(--brand-neon)]" />
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-[0.2em] font-display uppercase mt-2">
              Repo<span className="text-[var(--brand-neon)]">Pulse</span>
            </h1>
          </div>
        </div>
        
        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-zinc-500)]">
            Nodes / Root
          </div>
          
          <button
            onClick={() => { setActiveSpaceId(null); setSidebarOpen(false); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
            style={{ 
              background: activeSpaceId === null ? "rgba(0, 240, 255, 0.1)" : "transparent", 
              color: activeSpaceId === null ? "var(--brand-neon)" : "inherit",
              border: `1px solid ${activeSpaceId === null ? "rgba(0, 240, 255, 0.3)" : "transparent"}`
            }}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid size={16} />
              All Projects
            </div>
            <span className="opacity-50 font-mono text-[10px]">{REPOS.length}</span>
          </button>

          <div className="pt-8 px-3 mb-2 flex items-center justify-between group">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-zinc-500)]">
              Clusters
            </span>
            <Plus size={14} className="text-zinc-500 cursor-pointer hover:text-white transition-colors" />
          </div>

          {SPACES.map((space) => {
            const count = REPOS.filter(r => r.spaces.includes(space.id)).length;
            const isActive = activeSpaceId === space.id;
            return (
              <button
                key={space.id}
                onClick={() => { setActiveSpaceId(space.id); setSidebarOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 group"
                style={{ 
                  background: isActive ? "rgba(112, 0, 255, 0.1)" : "transparent", 
                  color: isActive ? "var(--brand-purple)" : "inherit",
                  border: `1px solid ${isActive ? "rgba(112, 0, 255, 0.3)" : "transparent"}`
                }}
              >
                <div className="flex items-center gap-3 truncate">
                  <Box size={16} className={cn("transition-colors", isActive ? "text-[var(--brand-purple)]" : "text-zinc-500 group-hover:text-white")} />
                  <span className="truncate">{space.name}</span>
                </div>
                <span className="opacity-50 font-mono text-[10px]">{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[var(--surface-border)] mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--brand-neon)] to-[var(--brand-purple)] border border-white/10" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold truncate">Command_Agent</span>
              <span className="text-[10px] font-mono uppercase opacity-50 tracking-tight truncate">Status: Nominal</span>
            </div>
            <LogOut size={16} className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <div className="flex flex-col p-6 sm:p-8 lg:p-12 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between items-start gap-8">
            <div className="space-y-4 min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-zinc-500)] uppercase tracking-[0.2em] opacity-70">
                  System /{" "}
                  <span style={{ color: activeSpaceId ? "var(--brand-purple)" : "var(--brand-neon)" }} className="opacity-100">
                    {activeSpaceId === null ? "All Projects" : "Active Cluster"}
                  </span>
                </div>
                <div className="h-px w-12 bg-white/10" />
                <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold uppercase text-emerald-500">Live_Sync</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter font-display uppercase">
                {activeSpaceId === null ? "Command Center" : activeSpace?.name}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-zinc-400)] max-w-2xl font-medium leading-relaxed opacity-80">
                {activeSpaceId === null 
                  ? "Unified tactical overview of all distributed codebases and development nodes." 
                  : activeSpace?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto shrink-0">
              <div className="bg-black/40 border border-[var(--surface-border)] rounded-2xl p-5 flex flex-col gap-1 min-w-[140px] relative overflow-hidden group hover:border-[var(--brand-neon)]/40 transition-colors">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-neon)]/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-[var(--text-zinc-500)]">
                  Active Focus
                </span>
                <span className="text-3xl font-bold font-display">{filteredRepos.length}</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Cpu size={10} className="text-[var(--brand-neon)]" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Nodes Active</span>
                </div>
              </div>
              <div className="bg-black/40 border border-[var(--surface-border)] rounded-2xl p-5 flex flex-col gap-1 min-w-[140px] relative overflow-hidden group hover:border-[var(--brand-purple)]/40 transition-colors">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-purple)]/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-[var(--text-zinc-500)]">
                  Collective Stars
                </span>
                <span className="text-3xl font-bold font-display text-[var(--brand-purple)]">{totalStars}</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Zap size={10} className="text-[var(--brand-purple)]" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Energy Peak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Bar (Filter) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full items-center p-2 rounded-2xl border border-[var(--surface-border)] shadow-xl bg-black/20">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search distributed nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm pl-12 pr-4 py-3 outline-none placeholder:text-zinc-600 font-medium"
              />
            </div>
            <div className="hidden sm:block w-px h-8 bg-zinc-800/50" />
            <div className="flex items-center gap-2 pr-2">
              <button className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-zinc-800 text-[var(--text-zinc-500)]">
                <Filter size={14} />
                <span>Sort_By: Pulse</span>
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <Terminal size={18} />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRepos.length === 0 ? (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border border-dashed rounded-3xl border-zinc-800 bg-white/[0.01]">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                  <Search size={32} className="text-zinc-700" />
                </div>
                <p className="text-lg font-bold font-display uppercase tracking-wider">No Nodes Detected</p>
                <p className="text-sm text-zinc-500 mt-2 max-w-xs">Adjust your frequency settings to locate distributed resources.</p>
              </div>
            ) : (
              filteredRepos.map(repo => (
                <div 
                  key={repo.id} 
                  className="flex flex-col group relative transition-all duration-500 border border-[var(--surface-border)] rounded-3xl overflow-hidden hover:translate-y-[-4px] hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] bg-zinc-950/40 backdrop-blur-xl"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--brand-neon)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-6 flex-grow space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                             repo.status === 'nominal' ? "bg-cyan-500 text-cyan-500" : 
                             repo.status === 'active' ? "bg-emerald-500 text-emerald-500" : 
                             "bg-amber-500 text-amber-500"
                           )} />
                           <span className="text-[9px] font-mono font-bold uppercase tracking-tighter opacity-50">{repo.status}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg tracking-tight truncate group-hover:text-[var(--brand-neon)] transition-colors cursor-pointer uppercase">
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-tight text-zinc-500">
                          <span>Updated // {repo.pushedAt}</span>
                        </div>
                      </div>
                      <ShieldCheck size={18} className="text-zinc-800 group-hover:text-emerald-500/50 transition-colors" />
                    </div>
                    <p className="text-xs leading-relaxed font-medium line-clamp-3 text-[var(--text-zinc-400)] group-hover:text-[var(--text-primary)] transition-colors">
                      {repo.description}
                    </p>
                  </div>

                  <div className="p-6 pt-0 flex flex-col gap-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border bg-black/40", getLanguageColor(repo.language))}>
                          {repo.language}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          <span className="font-mono">{repo.starCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button className="p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white transition-all"><Copy size={14} /></button>
                        <button className="p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white transition-all"><ExternalLink size={14} /></button>
                      </div>
                    </div>
                    
                    {activeSpaceId === null && repo.spaces.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900/50 w-full">
                        {repo.spaces.map(sId => {
                          const s = SPACES.find(space => space.id === sId);
                          return s ? (
                            <span key={s.id} className="px-2 py-0.5 rounded bg-zinc-900 text-[9px] font-bold tracking-[0.1em] uppercase text-zinc-600 border border-zinc-800/50">
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
