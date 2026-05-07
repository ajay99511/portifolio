"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

const C = {
  bgPrimary: "#0a0e1a",
  bgSecondary: "#111827",
  bgCard: "rgba(17, 24, 39, 0.7)",
  bgInput: "rgba(255, 255, 255, 0.06)",
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

type NavId = (typeof NAV_ITEMS)[number]["id"];

interface ToggleProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

function TinyToggle({ checked, label, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={`Toggle ${label} mode`}
    >
      <span
        className="w-9 h-5 rounded-full relative border transition-all"
        style={{
          background: checked ? C.accentGlow : C.bgGlass,
          borderColor: checked ? C.accentPrimary : C.border,
        }}
      >
        <span
          className="w-3.5 h-3.5 rounded-full absolute top-[1px] transition-all"
          style={{
            background: checked ? C.accentPrimary : C.textSecondary,
            left: checked ? "18px" : "2px",
          }}
        />
      </span>
      <span className="text-xs" style={{ color: C.textMuted }}>
        {label}
      </span>
    </button>
  );
}

interface ChatPageProps {
  chatInput: string;
  setChatInput: (value: string) => void;
  smartMode: boolean;
  setSmartMode: (value: boolean) => void;
  streamMode: boolean;
  setStreamMode: (value: boolean) => void;
}

function ChatPage({
  chatInput,
  setChatInput,
  smartMode,
  setSmartMode,
  streamMode,
  setStreamMode,
}: ChatPageProps) {
  const mockMessages = [
    {
      role: "assistant",
      content: "Hello! I am PersonalAssist. How can I help you today with your local AI tasks?",
      timestamp: "10:42 AM",
    },
    { role: "user", content: "Can you analyze the errors in src/main.rs?", timestamp: "10:44 AM" },
    {
      role: "assistant",
      content:
        "I found a lifetime borrow checker error in src/main.rs on line 42. You're trying to return a reference to a locally scoped variable. I suggest using an Arc or cloning the data.",
      timestamp: "10:45 AM",
      memoryUsed: true,
      model: "llama3-8b-instruct",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b" style={{ borderColor: C.border, background: C.bgSecondary }}>
        <div className="flex items-center gap-3">
          <button type="button" className="text-xl" style={{ color: C.textPrimary }} aria-label="Open menu">
            ☰
          </button>
          <div className="font-semibold text-base">Local LLM Experiment</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-0 py-6 sm:py-8 flex flex-col items-center">
        <div className="w-full max-w-[800px] flex flex-col gap-4 px-3 sm:px-4">
          {mockMessages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[88%] sm:max-w-[75%] p-3 rounded-xl text-sm leading-relaxed",
                message.role === "assistant" ? "self-start" : "self-end rounded-br-sm"
              )}
              style={{
                background:
                  message.role === "assistant" ? "transparent" : "linear-gradient(135deg, #818cf8, #6366f1)",
                color: message.role === "assistant" ? C.textPrimary : "#ffffff",
              }}
            >
              <div>{message.content}</div>
              <div
                className="flex items-center gap-2 mt-2 text-[11px]"
                style={{
                  color: message.role === "user" ? "rgba(255,255,255,0.7)" : C.textMuted,
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.model && (
                  <span
                    className="px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: C.accentGlow, color: C.accentPrimary }}
                  >
                    {message.model}
                  </span>
                )}
                {message.memoryUsed && (
                  <span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: C.successBg, color: C.success }}>
                    Memory
                  </span>
                )}
                <span>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-t flex justify-center py-3 px-4 sm:px-6" style={{ background: C.bgSecondary, borderColor: C.border }}>
        <div className="w-full max-w-[800px]">
          <div className="flex items-center gap-2 mb-2">
            <TinyToggle checked={smartMode} label="Smart" onToggle={() => setSmartMode(!smartMode)} />

            <div className="w-px h-4 mx-1" style={{ background: C.border }} />

            <TinyToggle checked={streamMode} label="Stream" onToggle={() => setStreamMode(!streamMode)} />

            <div className="flex-1" />

            <div className="px-3 py-1.5 rounded-md text-xs border" style={{ background: C.bgInput, borderColor: C.border, color: C.textPrimary }}>
              llama3-8b-instruct
            </div>
          </div>

          <div className="flex items-end gap-2 p-[2px] rounded-md border" style={{ background: C.bgInput, borderColor: C.border }}>
            <textarea
              className="flex-1 bg-transparent border-none outline-none text-sm p-3 resize-none h-[44px]"
              placeholder="Type a message... (Shift+Enter for new line)"
              style={{ color: C.textPrimary }}
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              aria-label="Chat input"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-md text-xs font-medium m-1.5"
              style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)", color: "#ffffff", boxShadow: `0 0 20px ${C.accentGlow}` }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspacePage() {
  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-xl font-semibold m-0" style={{ color: C.textPrimary }}>
          Workspace Management
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md text-[13px] font-medium border"
            style={{ background: C.bgGlass, color: C.textSecondary, borderColor: C.border }}
          >
            Test Permissions
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md text-[13px] font-medium border border-transparent"
            style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)", color: "#ffffff" }}
          >
            + New Workspace
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="p-4 rounded-xl border backdrop-blur-md" style={{ background: C.bgCard, borderColor: C.border, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.textPrimary }}>
                my-portfolio
              </h3>
              <div className="text-[13px] mb-2" style={{ color: C.textMuted }}>
                C:\Users\ajaye\My_Products\portifolio
              </div>
              <div className="text-xs" style={{ color: C.textMuted }}>
                Read: **/* | Write: src/**/*, app/**/*
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="px-3 py-1.5 rounded-md text-sm border" style={{ background: C.bgGlass, borderColor: C.border }}>
                Copy
              </button>
              <button type="button" className="px-3 py-1.5 rounded-md text-sm border" style={{ background: "rgba(248, 113, 113, 0.15)", borderColor: "rgba(248, 113, 113, 0.15)" }}>
                Delete
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: C.accentGlow, color: C.accentPrimary }}>
              Execute
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: C.successBg, color: C.success }}>
              Git
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl border backdrop-blur-md" style={{ background: C.bgCard, borderColor: C.border }}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.textPrimary }}>
                deep-learning-lab
              </h3>
              <div className="text-[13px] mb-2" style={{ color: C.textMuted }}>
                C:\Users\ajaye\My_Products\portifolio\.temp_dl_algo
              </div>
              <div className="text-xs" style={{ color: C.textMuted }}>
                Read: **/*.py | Write: None
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="px-3 py-1.5 rounded-md text-sm border" style={{ background: C.bgGlass, borderColor: C.border }}>
                Copy
              </button>
              <button type="button" className="px-3 py-1.5 rounded-md text-sm border" style={{ background: "rgba(248, 113, 113, 0.15)", borderColor: "rgba(248, 113, 113, 0.15)" }}>
                Delete
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(251, 191, 36, 0.15)", color: C.warning }}>
              Network
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PersonalAssistDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((project) => project.id === "personal-assist");

  const [activePage, setActivePage] = useState<NavId>("chat");
  const [apiOnline] = useState(true);
  const [theme] = useState<"dark" | "light">("dark");
  const [smartMode, setSmartMode] = useState(true);
  const [streamMode, setStreamMode] = useState(true);
  const [chatInput, setChatInput] = useState("");

  return (
    <div
      className="h-full min-h-[620px] rounded-lg overflow-hidden relative font-sans text-sm flex flex-col md:flex-row"
      style={{ background: C.bgPrimary, color: C.textPrimary }}
    >
      <aside className="w-full md:w-[240px] md:min-w-[240px] border-b md:border-b-0 md:border-r flex flex-col p-3 md:p-4 gap-2 shrink-0" style={{ background: C.bgSecondary, borderColor: C.border }}>
        <div className="flex items-center gap-2.5 pb-4 mb-2 border-b" style={{ borderColor: C.border }}>
          <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white shadow-lg" style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)" }}>
            P
          </div>
          <div className="font-semibold text-[15px]">PersonalAssist</div>
          <span className="text-[11px] ml-auto px-2 py-0.5 rounded-full border" style={{ color: C.textMuted, background: C.bgGlass, borderColor: C.border }}>
            v0.2
          </span>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1 max-h-[220px] md:max-h-none overflow-y-auto" aria-label="Personal Assist sections">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-md font-medium text-[12px] md:text-[13px] transition-all border text-left",
                activePage === item.id ? "" : "hover:bg-white/5 border-transparent"
              )}
              style={{
                color: activePage === item.id ? C.accentPrimary : C.textSecondary,
                background: activePage === item.id ? C.accentGlow : "transparent",
                borderColor: activePage === item.id ? C.borderActive : "transparent",
              }}
              aria-pressed={activePage === item.id}
            >
              <span className="text-[17px] w-[20px] text-center">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-3 border-t flex flex-col gap-2" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-2 px-3 py-1">
            <button
              type="button"
              className="w-8 h-8 rounded-md border flex items-center justify-center"
              style={{ background: C.bgGlass, borderColor: C.border, color: C.textSecondary }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <span className="text-[11px]" style={{ color: C.textMuted }}>
              Light mode
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-2 cursor-default">
            <span className="w-2 h-2 rounded-full" style={{ background: apiOnline ? C.success : "red", boxShadow: `0 0 8px ${apiOnline ? C.success : "red"}` }} />
            <span className="text-xs" style={{ color: C.textMuted }}>
              API {apiOnline ? "Connected" : "Offline"}
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden min-h-[420px]" style={{ background: C.bgPrimary }}>
        {activePage === "chat" && (
          <ChatPage
            chatInput={chatInput}
            setChatInput={setChatInput}
            smartMode={smartMode}
            setSmartMode={setSmartMode}
            streamMode={streamMode}
            setStreamMode={setStreamMode}
          />
        )}
        {activePage === "workspace" && <WorkspacePage />}
        {activePage !== "chat" && activePage !== "workspace" && (
          <div className="flex-1 flex items-center justify-center flex-col text-center p-12">
            <div className="text-5xl mb-4 opacity-50">{NAV_ITEMS.find((item) => item.id === activePage)?.icon}</div>
            <div className="text-base font-semibold mb-2">{NAV_ITEMS.find((item) => item.id === activePage)?.label} Engine</div>
            <div className="text-[13px] max-w-[320px]" style={{ color: C.textMuted }}>
              Select Chat or Workspace in the navigation to explore the fully mapped interactive views.
            </div>
          </div>
        )}
      </main>

      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart
          projectId="personal-assist"
          steps={projectData.quickStartSteps}
          onComplete={() => setQuickStartDone(true)}
        />
      )}
    </div>
  );
}
