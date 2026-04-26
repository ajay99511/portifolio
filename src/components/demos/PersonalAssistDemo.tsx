"use client";

import { useState } from "react";
import {
  MessageSquare,
  BrainCircuit,
  Cpu,
  Bot,
  Download,
  Mic,
  FolderKey,
  Settings,
  Activity,
  Send,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

/* ─── Exact colors from index.css (Dark Theme) ─── */
const C = {
  bgPrimary: "#0a0e1a",
  bgSecondary: "#111827",
  bgCard: "rgba(17, 24, 39, 0.7)",
  bgInput: "rgba(255, 255, 255, 0.06)",
  bgHover: "rgba(255, 255, 255, 0.08)",
  bgGlass: "rgba(255, 255, 255, 0.04)",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accentPrimary: "#818cf8",
  accentGlow: "rgba(129, 140, 248, 0.15)",
  border: "rgba(255, 255, 255, 0.08)",
  borderActive: "rgba(129, 140, 248, 0.4)",
  success: "#34d399",
  successBg: "rgba(52, 211, 153, 0.15)",
  warning: "#fbbf24",
};

type PageId = "chat" | "memory" | "models" | "agents" | "workspace" | "jobs" | "health";

const NAV_ITEMS = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "models", label: "Models", icon: "⚡" },
  { id: "agents", label: "Agents", icon: "🤖" },
  { id: "ingest", label: "Ingestion", icon: "📥" },
  { id: "podcast", label: "Podcast", icon: "🎙️" },
  { id: "workspace", label: "Workspace", icon: "📁" },
  { id: "jobs", label: "Background Tasks", icon: "⚙️" },
  { id: "health", label: "System Health", icon: "🏥" },
  { id: "telegram", label: "Telegram", icon: "✈️" },
] as const;

export default function PersonalAssistDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "personal-assist");
  
  const [activePage, setActivePage] = useState<string>("chat");
  const [apiOnline] = useState(true);
  const [theme] = useState<"dark" | "light">("dark");
  const [smartMode, setSmartMode] = useState(true);
  const [streamMode, setStreamMode] = useState(true);

  // Chat Mock State
  const [chatInput, setChatInput] = useState("");
  const mockMessages = [
    { role: "assistant", content: "Hello! I am PersonalAssist. How can I help you today with your local AI tasks?", timestamp: "10:42 AM" },
    { role: "user", content: "Can you analyze the errors in src/main.rs?", timestamp: "10:44 AM" },
    { role: "assistant", content: "I found a lifetime borrow checker error in `src/main.rs` on line 42. You're trying to return a reference to a locally scoped variable. I suggest using an `Arc` or cloning the data.", timestamp: "10:45 AM", memoryUsed: true, model: "llama3-8b-instruct" },
  ];

  const ChatPage = () => (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b" style={{ borderColor: C.border, background: C.bgSecondary }}>
        <div className="flex items-center gap-3">
          <button className="text-xl" style={{ color: C.textPrimary }}>☰</button>
          <div className="font-semibold text-base">Rust Debugging Session</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-0 py-8 flex flex-col items-center">
        <div className="w-full max-w-[800px] flex flex-col gap-4 px-4">
          {mockMessages.map((msg, i) => (
            <div
              key={i}
              className={cn("max-w-[75%] p-3 rounded-xl text-sm leading-relaxed", msg.role === "assistant" ? "self-start" : "self-end rounded-br-sm")}
              style={{
                background: msg.role === "assistant" ? "transparent" : `linear-gradient(135deg, #818cf8, #6366f1)`,
                color: msg.role === "assistant" ? C.textPrimary : "#ffffff",
              }}
            >
              <div>{msg.content}</div>
              <div className="flex items-center gap-2 mt-2 text-[11px]" style={{ color: msg.role === "user" ? "rgba(255,255,255,0.7)" : C.textMuted, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.model && <span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: C.accentGlow, color: C.accentPrimary }}>{msg.model}</span>}
                {msg.memoryUsed && <span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: C.successBg, color: C.success }}>🧠 Memory</span>}
                <span>{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="w-full border-t flex justify-center py-3 px-6" style={{ background: C.bgSecondary, borderColor: C.border }}>
        <div className="w-full max-w-[800px]">
          {/* Controls */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-2" style={{ cursor: "pointer" }} onClick={() => setSmartMode(!smartMode)}>
              <div className="w-9 h-5 rounded-full relative border transition-all" style={{ background: smartMode ? C.accentGlow : C.bgGlass, borderColor: smartMode ? C.accentPrimary : C.border }}>
                <div className="w-3.5 h-3.5 rounded-full absolute top-[1px] transition-all" style={{ background: smartMode ? C.accentPrimary : C.textSecondary, left: smartMode ? "18px" : "2px" }} />
              </div>
              <span className="text-xs" style={{ color: C.textMuted }}>Smart</span>
            </div>
            
            <div className="w-px h-4 mx-1" style={{ background: C.border }} />
            
            <div className="flex items-center gap-2" style={{ cursor: "pointer" }} onClick={() => setStreamMode(!streamMode)}>
              <div className="w-9 h-5 rounded-full relative border transition-all" style={{ background: streamMode ? C.accentGlow : C.bgGlass, borderColor: streamMode ? C.accentPrimary : C.border }}>
                <div className="w-3.5 h-3.5 rounded-full absolute top-[1px] transition-all" style={{ background: streamMode ? C.accentPrimary : C.textSecondary, left: streamMode ? "18px" : "2px" }} />
              </div>
              <span className="text-xs" style={{ color: C.textMuted }}>Stream</span>
            </div>

            <div className="flex-1" />

            <div className="px-3 py-1.5 rounded-md text-xs border" style={{ background: C.bgInput, borderColor: C.border, color: C.textPrimary }}>
              🖥️ llama3-8b-instruct
            </div>
          </div>

          {/* Textarea Area */}
          <div className="flex items-end gap-2 p-[2px] rounded-md border" style={{ background: C.bgInput, borderColor: C.border }}>
            <textarea
              className="flex-1 bg-transparent border-none outline-none text-sm p-3 resize-none h-[44px]"
              placeholder="Type a message... (Shift+Enter for new line)"
              style={{ color: C.textPrimary }}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="px-4 py-2 rounded-md text-xs font-medium m-1.5" style={{ background: `linear-gradient(135deg, #818cf8, #6366f1)`, color: "#ffffff", boxShadow: `0 0 20px ${C.accentGlow}` }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkspacePage = () => (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold m-0" style={{ color: C.textPrimary }}>Workspace Management</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md text-[13px] font-medium border" style={{ background: C.bgGlass, color: C.textSecondary, borderColor: C.border }}>
            🔒 Test Permissions
          </button>
          <button className="px-4 py-2 rounded-md text-[13px] font-medium border border-transparent" style={{ background: `linear-gradient(135deg, #818cf8, #6366f1)`, color: "#ffffff" }}>
            + New Workspace
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Workspace Card 1 */}
        <div className="p-4 rounded-xl border backdrop-blur-md" style={{ background: C.bgCard, borderColor: C.border, boxShadow: `0 4px 12px rgba(0,0,0,0.3)` }}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.textPrimary }}>portfolio-project</h3>
              <div className="text-[13px] mb-2" style={{ color: C.textMuted }}>📁 C:\Users\ajaye\My_Products\portifolio</div>
              <div className="text-xs" style={{ color: C.textMuted }}>Read: **/* | Write: src/**/*, app/**/*</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md text-sm border" style={{ background: C.bgGlass, borderColor: C.border }}>📋</button>
              <button className="px-3 py-1.5 rounded-md text-sm border" style={{ background: "rgba(248, 113, 113, 0.15)", borderColor: "rgba(248, 113, 113, 0.15)" }}>🗑️</button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: C.accentGlow, color: C.accentPrimary }}>⚡ Execute</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: C.successBg, color: C.success }}>🔀 Git</span>
          </div>
        </div>

        {/* Workspace Card 2 */}
        <div className="p-4 rounded-xl border backdrop-blur-md" style={{ background: C.bgCard, borderColor: C.border }}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.textPrimary }}>agent-framework</h3>
              <div className="text-[13px] mb-2" style={{ color: C.textMuted }}>📁 C:\Agents\PersonalAssist\core</div>
              <div className="text-xs" style={{ color: C.textMuted }}>Read: **/*.py | Write: None</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md text-sm border" style={{ background: C.bgGlass, borderColor: C.border }}>📋</button>
              <button className="px-3 py-1.5 rounded-md text-sm border" style={{ background: "rgba(248, 113, 113, 0.15)", borderColor: "rgba(248, 113, 113, 0.15)" }}>🗑️</button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(251, 191, 36, 0.15)", color: C.warning }}>🌐 Network</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full rounded-lg overflow-hidden relative font-sans text-sm flex" style={{ background: C.bgPrimary, color: C.textPrimary }}>
      
      {/* ── Sidebar ── */}
      <aside className="w-[240px] min-w-[240px] border-r flex flex-col p-4 gap-1 shrink-0" style={{ background: C.bgSecondary, borderColor: C.border }}>
        {/* Brand */}
        <div className="flex items-center gap-2.5 pb-5 mb-3 border-b" style={{ borderColor: C.border }}>
          <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, #818cf8, #6366f1)` }}>P</div>
          <div className="font-semibold text-[15px]">PersonalAssist</div>
          <span className="text-[11px] ml-auto px-2 py-0.5 rounded-full border" style={{ color: C.textMuted, background: C.bgGlass, borderColor: C.border }}>v0.2</span>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-md cursor-pointer font-medium text-[13px] transition-all border",
                activePage === item.id ? "" : "hover:bg-white/5 border-transparent"
              )}
              style={{
                color: activePage === item.id ? C.accentPrimary : C.textSecondary,
                background: activePage === item.id ? C.accentGlow : "transparent",
                borderColor: activePage === item.id ? C.borderActive : "transparent",
              }}
            >
              <span className="text-[18px] w-[22px] text-center">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t flex flex-col gap-2" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-2 px-3 py-1">
            <button className="w-8 h-8 rounded-md border flex items-center justify-center" style={{ background: C.bgGlass, borderColor: C.border, color: C.textSecondary }}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <span className="text-[11px]" style={{ color: C.textMuted }}>Light mode</span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-2 cursor-default">
            <span className="w-2 h-2 rounded-full" style={{ background: apiOnline ? C.success : "red", boxShadow: `0 0 8px ${apiOnline ? C.success : "red"}` }} />
            <span className="text-xs" style={{ color: C.textMuted }}>API {apiOnline ? "Connected" : "Offline"}</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ background: C.bgPrimary }}>
        {activePage === "chat" && <ChatPage />}
        {activePage === "workspace" && <WorkspacePage />}
        {activePage !== "chat" && activePage !== "workspace" && (
          <div className="flex-1 flex items-center justify-center flex-col text-center p-12">
            <div className="text-5xl mb-4 opacity-50">{NAV_ITEMS.find(n => n.id === activePage)?.icon}</div>
            <div className="text-base font-semibold mb-2">{NAV_ITEMS.find(n => n.id === activePage)?.label} Engine</div>
            <div className="text-[13px] max-w-[320px]" style={{ color: C.textMuted }}>Select Chat or Workspace in the sidebar to explore the fully mapped interactive views.</div>
          </div>
        )}
      </main>

      {/* Quick Start */}
      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart projectId="personal-assist" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
