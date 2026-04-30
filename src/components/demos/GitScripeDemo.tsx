"use client";

import { useState } from "react";
import { 
  Box, 
  Search, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Send,
  MessageSquare,
  Filter,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

const COLORS = {
  bg: "#0f1117",
  surface: "#161b22",
  border: "#30363d",
  textPrimary: "#e6edf3",
  textMuted: "#8b949e",
  accent: "#58a6ff",
  success: "#3fb950",
  warning: "#d29922",
  error: "#f85149",
  sidebarActive: "#1f3a5f"
};

const MOCK_REPOS = [
  { id: '1', owner: 'ajay99511', name: 'Social_Networking_Application', status: 'done', description: 'Full-stack social platform built with .NET and Angular.' },
  { id: '2', owner: 'ajay99511', name: 'GitScripe', status: 'done', description: 'Agentic Git intelligence platform using RAG and LLMs.' },
  { id: '3', owner: 'ajay99511', name: 'DL_Algorithms', status: 'processing', description: 'From-scratch implementations of core Deep Learning models.' },
  { id: '4', owner: 'ajay99511', name: 'RepoPulse', status: 'pending', description: 'Personal workspace management dashboard.' }
];

const MOCK_SUMMARIES = [
  {
    id: 's1',
    commitSha: 'g7s2a9d1e2f3g4h5i6j7k8l9m0n1o2p3',
    shortSummary: 'Implement multi-agent pipeline for hierarchical commit analysis',
    detailedSummary: 'This change introduces the core agentic workflow. It orchestrates a DiffAnalyzer to extract changes and a SummaryAgent to infer developer intent, grouping them by architectural impact.',
    inferredIntent: 'Improving the depth of commit analysis by using specialized agents for different parts of the summary generation.',
    authorName: 'ajay99511',
    committedAt: '2026-04-20T14:30:00Z',
    additions: 215,
    deletions: 45,
    riskLevel: 'medium',
    tags: ['agents', 'llm', 'backend'],
    status: 'done',
    fileSummaries: {
      'src/agents/pipeline.ts': 'Implemented the orchestrator for multi-agent coordination.',
      'src/lib/rag/context.ts': 'Added logic to fetch relevant architectural context for the agents.'
    }
  },
  {
    id: 's2',
    commitSha: 's1n8r3e8f0a2c4d6e8f0a2c4d6e8f0a2',
    shortSummary: 'Integrate SignalR for real-time chat synchronization',
    detailedSummary: 'Implemented a SignalR hub on the .NET backend and a reactive service in the Angular frontend to enable instant message delivery and presence tracking.',
    inferredIntent: 'Learning how to handle bi-directional, persistent connections for a seamless real-time user experience.',
    authorName: 'ajay99511',
    committedAt: '2026-03-15T09:15:00Z',
    additions: 120,
    deletions: 8,
    riskLevel: 'medium',
    tags: ['real-time', 'dotnet', 'angular'],
    status: 'done',
    fileSummaries: {
      'API/Hubs/MessageHub.cs': 'Defined the SignalR hub for message routing and connection management.',
      'client/src/app/_services/message.service.ts': 'Built the Angular service to consume SignalR events and update state.'
    }
  }
];

export default function GitScripeDemo() {
  const [activePage, setActivePage] = useState<"discover" | "repo">("discover");
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickStartDone, setQuickStartDone] = useState(false);

  const projectData = projects.find(p => p.id === "gitscripe");

  const filteredRepos = MOCK_REPOS.filter(r => 
    `${r.owner}/${r.name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedRepo = MOCK_REPOS.find(r => r.id === selectedRepoId);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, content: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I've analyzed the recent changes in ${selectedRepo?.name}. Based on the commit history, most of the recent focus has been on improving the authentication layer and updating deployment documentation. Is there a specific module you'd like to dive deeper into?` 
      }]);
    }, 1500);
  };

  return (
    <div className="h-full flex bg-[#0f1117] text-[#e6edf3] font-sans rounded-lg border overflow-hidden shadow-2xl" style={{ borderColor: COLORS.border }}>
      {/* Sidebar */}
      <aside className="w-48 md:w-60 flex-shrink-0 bg-[#161b22] border-r flex flex-col" style={{ borderColor: COLORS.border }}>
        <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: COLORS.border }}>
          <div className="w-8 h-8 bg-[#58a6ff] rounded flex items-center justify-center text-white font-bold">GS</div>
          <span className="font-bold text-lg tracking-tight">GitScripe</span>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActivePage("discover")}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded text-sm transition-colors",
              activePage === "discover" 
                ? "bg-[#1f3a5f] text-[#58a6ff] border-l-2 border-[#58a6ff]" 
                : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
            )}
          >
            Discover
          </button>

          <div className="mt-6">
            <p className="px-3 py-1 text-[10px] text-[#8b949e] uppercase font-bold tracking-widest">Repositories</p>
            <div className="mt-1 space-y-1">
              {MOCK_REPOS.filter(r => r.status === 'done' || r.status === 'processing').map(repo => (
                <button
                  key={repo.id}
                  onClick={() => {
                    setSelectedRepoId(repo.id);
                    setActivePage("repo");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-colors",
                    activePage === "repo" && selectedRepoId === repo.id
                      ? "bg-[#1f3a5f] text-[#e6edf3] border-l-2 border-[#58a6ff]"
                      : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
                  )}
                >
                  <span className="truncate">{repo.owner}/{repo.name}</span>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    repo.status === 'done' ? "bg-[#3fb950]" : "bg-[#d29922]"
                  )} />
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t text-[10px] text-[#8b949e]" style={{ borderColor: COLORS.border }}>
          v1.4.2-agentic
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activePage === "discover" ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">Discover Repositories</h1>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-4 py-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm transition-all"
                >
                  <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                <input 
                  type="text" 
                  placeholder="Filter repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#21262d] border border-[#30363d] rounded px-10 py-2.5 text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#8b949e]"
                />
              </div>

              <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0f1117]">
                <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-[10px] text-[#8b949e] font-bold uppercase tracking-wider">
                  Available Repositories ({filteredRepos.length})
                </div>
                {filteredRepos.map((repo, i) => (
                  <div 
                    key={repo.id}
                    className={cn(
                      "px-4 py-4 flex items-center justify-between hover:bg-[#161b22] transition-colors group cursor-pointer",
                      i !== filteredRepos.length - 1 && "border-b border-[#30363d]"
                    )}
                    onClick={() => {
                      setSelectedRepoId(repo.id);
                      setActivePage("repo");
                    }}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-[#21262d] rounded flex items-center justify-center text-[#8b949e] group-hover:text-[#58a6ff] transition-colors">
                        <Box className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{repo.owner}/{repo.name}</h3>
                          {repo.status === 'done' && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/20 text-[#3fb950] text-[9px] font-bold uppercase">Synced</span>
                          )}
                        </div>
                        <p className="text-xs text-[#8b949e] truncate mt-0.5">{repo.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Repo Summaries */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-lg font-bold">{selectedRepo?.owner}/{selectedRepo?.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#21262d] rounded text-xs text-[#8b949e]">
                    <Filter className="w-3 h-3" />
                    Filters
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_SUMMARIES.map(summary => (
                  <article 
                    key={summary.id}
                    className="border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSummary(expandedSummary === summary.id ? null : summary.id)}
                      className="w-full text-left px-4 py-3 hover:bg-[#21262d] transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium flex-1 leading-tight group-hover:text-[#58a6ff] transition-colors">
                          {summary.shortSummary}
                        </p>
                        {expandedSummary === summary.id ? <ChevronUp className="w-4 h-4 text-[#8b949e]" /> : <ChevronDown className="w-4 h-4 text-[#8b949e]" />}
                      </div>

                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="text-xs text-[#8b949e]">{summary.authorName}</span>
                        <span className="w-1 h-1 rounded-full bg-[#30363d]" />
                        <span className="text-xs text-[#8b949e]">Mar 24</span>
                        <span className="w-1 h-1 rounded-full bg-[#30363d]" />
                        <span className="text-xs text-[#3fb950]">+{summary.additions}</span>
                        <span className="text-xs text-[#f85149]">-{summary.deletions}</span>

                        <div className={cn(
                          "ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                          summary.riskLevel === 'high' ? "bg-[#f85149]/10 text-[#f85149] border border-[#f85149]/20" : "bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20"
                        )}>
                          {summary.riskLevel} risk
                        </div>
                      </div>

                      <div className="flex gap-1 mt-3">
                        {summary.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded border border-[#30363d]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>

                    {expandedSummary === summary.id && (
                      <div className="px-4 pb-4 border-t border-[#30363d] pt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div>
                          <p className="text-[10px] text-[#8b949e] uppercase font-bold tracking-widest mb-1.5">Detailed Summary</p>
                          <p className="text-xs text-[#e6edf3] leading-relaxed">{summary.detailedSummary}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#8b949e] uppercase font-bold tracking-widest mb-1.5">Inferred Intent</p>
                          <p className="text-xs text-[#e6edf3] leading-relaxed italic border-l-2 border-[#58a6ff] pl-3 py-1 bg-[#58a6ff]/5">
                            {summary.inferredIntent}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#8b949e] uppercase font-bold tracking-widest mb-2">Files Changed</p>
                          <div className="space-y-1.5">
                            {Object.entries(summary.fileSummaries).map(([file, desc]) => (
                              <div key={file} className="text-[11px] flex gap-2">
                                <code className="text-[#8b949e] font-mono whitespace-nowrap">{file}:</code>
                                <span className="text-[#e6edf3]">{desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            {/* Chat Panel */}
            <aside className="w-80 border-l border-[#30363d] bg-[#0f1117] flex flex-col">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#58a6ff]" />
                  <span className="text-xs font-bold text-[#e6edf3]">AI Repository Assistant</span>
                </div>
                <button 
                  onClick={() => setChatMessages([])}
                  className="text-[10px] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-12 h-12 bg-[#21262d] rounded-full flex items-center justify-center mb-3">
                      <Search className="w-6 h-6 text-[#30363d]" />
                    </div>
                    <p className="text-xs text-[#8b949e]">
                      Ask questions about this repository&apos;s history, architecture, or recent changes.
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={cn(
                      "flex flex-col max-w-[90%]",
                      msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                    )}>
                      <div className={cn(
                        "p-2.5 rounded-lg text-xs leading-relaxed",
                        msg.role === 'user' 
                          ? "bg-[#1f3a5f] text-white rounded-tr-none" 
                          : "bg-[#21262d] text-[#e6edf3] rounded-tl-none border border-[#30363d]"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex gap-1 p-2 bg-[#21262d] rounded-lg w-12 border border-[#30363d]">
                    <div className="w-1 h-1 bg-[#58a6ff] rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-[#58a6ff] rounded-full animate-bounce delay-75" />
                    <div className="w-1 h-1 bg-[#58a6ff] rounded-full animate-bounce delay-150" />
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-[#30363d] bg-[#161b22]">
                <div className="relative">
                  <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask about this repo..."
                    rows={2}
                    className="w-full bg-[#21262d] border border-[#30363d] rounded-lg pl-3 pr-10 py-2.5 text-xs focus:outline-none focus:border-[#58a6ff] resize-none placeholder-[#8b949e]"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 bottom-2.5 p-1.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded transition-colors disabled:opacity-50 disabled:bg-[#21262d]"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <p className="mt-2 text-[9px] text-[#8b949e] text-center">
                  Press Enter to send
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>

      {!quickStartDone && projectData?.quickStartSteps && (
        <DemoQuickStart 
          projectId="gitscripe" 
          steps={projectData.quickStartSteps} 
          onComplete={() => setQuickStartDone(true)} 
        />
      )}
    </div>
  );
}

