"use client";

import { useState } from "react";
import { 
  Book, 
  Folder, 
  FileText, 
  Settings, 
  Plus, 
  RotateCcw, 
  Search, 
  Star,
  ChevronRight,
  ChevronDown,
  X,
  Menu,
  Maximize2,
  MoreVertical,
  Library,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

// Theme Tokens
const COLORS = {
  backgroundBase: "#0A0E17",
  backgroundSurface: "#0F1520",
  backgroundElevated: "#151C2C",
  backgroundHover: "#1A2332",
  backgroundActive: "#1E3A5F",
  borderSubtle: "#1E293B",
  borderDefault: "#334155",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  accent: "#3B82F6",
  accentSoft: "#1E3A5F",
  starActive: "#FBBF24",
  folderIcon: "#3B82F6",
  fileIcon: "#94A3B8",
};

// Mock Data
const MOCK_FOLDERS = [
  {
    id: "f1",
    name: "Engineering",
    isExpanded: true,
    children: [
      { id: "f1-1", name: "Architecture", isExpanded: false },
      { id: "f1-2", name: "Frontend", isExpanded: true },
    ]
  },
  {
    id: "f2",
    name: "Personal",
    isExpanded: false,
    children: []
  },
  {
    id: "f3",
    name: "Projects",
    isExpanded: false,
    children: []
  }
];

const MOCK_FILES = [
  { id: "m1", name: "React_State_Management.md", date: "Today", folderId: "f1-2" },
  { id: "m2", name: "Tailwind_Best_Practices.md", date: "Yesterday", folderId: "f1-2" },
  { id: "m3", name: "Architecture_Overview.md", date: "2d ago", folderId: "f1-1" },
  { id: "m4", name: "NextJS_App_Router.md", date: "1w ago", folderId: "f1-2" },
];

const MOCK_CONTENT = `
# React State Management

State management is one of the most critical aspects of building modern web applications. In React, there are several ways to handle state:

## 1. Local State (useState)
The simplest form of state management. Used for state that only affects a single component.

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## 2. Context API
Built-in React feature for passing data through the component tree without having to pass props down manually at every level.

## 3. External Libraries
- **Zustand**: Small, fast, and scalable.
- **Redux**: Predictable state container.
- **Riverpod**: A reactive caching and state management framework.

---

> Tip: Always start with the simplest solution and scale up as needed.
`;

export default function MdExplorerDemo() {
  const [selectedFolderId, setSelectedFolderId] = useState("f1-2");
  const [selectedFileId, setSelectedFileId] = useState("m1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMobilePanel, setActiveMobilePanel] = useState<"tree" | "files" | "viewer">("files");
  const [quickStartDone, setQuickStartDone] = useState(false);

  const selectedFile = MOCK_FILES.find(f => f.id === selectedFileId);
  const projectData = projects.find(p => p.id === "md-explorer");

  const filteredFiles = MOCK_FILES.filter(f => 
    f.folderId === selectedFolderId && 
    (searchQuery === "" || f.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full rounded-lg border overflow-hidden flex flex-col font-sans text-sm relative shadow-2xl" style={{ borderColor: COLORS.borderSubtle, background: COLORS.backgroundBase }}>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Panel 1: Sidebar */}
        <div className="w-[280px] shrink-0 flex flex-col border-r" style={{ background: COLORS.backgroundSurface, borderColor: COLORS.borderSubtle }}>
          <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: COLORS.borderSubtle }}>
            <Book size={20} style={{ color: COLORS.accent }} />
            <span className="font-bold text-[16px]" style={{ color: COLORS.textPrimary }}>MD Explorer</span>
            <div className="ml-auto flex items-center gap-1">
              <button className="p-2 hover:bg-white/5 rounded-md"><RotateCcw size={16} style={{ color: COLORS.textMuted }} /></button>
              <button className="p-2 hover:bg-white/5 rounded-md"><Plus size={16} style={{ color: COLORS.textMuted }} /></button>
              <button className="p-2 hover:bg-white/5 rounded-md"><Settings size={16} style={{ color: COLORS.textMuted }} /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2 flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: COLORS.textMuted }}>Managed Folders</span>
            </div>
            
            {MOCK_FOLDERS.map(folder => (
              <div key={folder.id}>
                <div 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  {folder.children.length > 0 ? (folder.isExpanded ? <ChevronDown size={14} style={{ color: COLORS.textMuted }} /> : <ChevronRight size={14} style={{ color: COLORS.textMuted }} />) : <div className="w-[14px]" />}
                  <Folder size={18} style={{ color: COLORS.folderIcon }} />
                  <span style={{ color: folder.id === selectedFolderId ? COLORS.accent : COLORS.textPrimary }}>{folder.name}</span>
                </div>
                {folder.isExpanded && folder.children.map(child => (
                  <div 
                    key={child.id}
                    className={cn(
                      "flex items-center gap-2 pl-10 pr-4 py-2 cursor-pointer transition-colors",
                      child.id === selectedFolderId ? "bg-[#1E3A5F]" : "hover:bg-white/5"
                    )}
                    onClick={() => setSelectedFolderId(child.id)}
                  >
                    <Folder size={18} style={{ color: COLORS.folderIcon }} />
                    <span style={{ color: child.id === selectedFolderId ? "white" : COLORS.textPrimary }}>{child.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 border-t" style={{ borderColor: COLORS.borderSubtle }}>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-white/5 rounded-md cursor-pointer">
              <Library size={18} style={{ color: COLORS.textSecondary }} />
              <span style={{ color: COLORS.textSecondary }}>My Library</span>
            </div>
          </div>
        </div>

        {/* Panel 2: File List */}
        <div className="w-[320px] shrink-0 flex flex-col border-r" style={{ background: COLORS.backgroundBase, borderColor: COLORS.borderSubtle }}>
          <div className="p-4 py-[18px]">
            <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: COLORS.textMuted }}>Files</span>
          </div>
          
          <div className="px-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ background: COLORS.backgroundElevated, borderColor: COLORS.borderSubtle }}>
              <Search size={16} style={{ color: COLORS.textMuted }} />
              <input 
                type="text" 
                placeholder="Search in folder..."
                className="bg-transparent border-none outline-none text-sm w-full"
                style={{ color: COLORS.textPrimary }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <X size={14} className="cursor-pointer" style={{ color: COLORS.textMuted }} onClick={() => setSearchQuery("")} />}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            {filteredFiles.map(file => (
              <div 
                key={file.id}
                className={cn(
                  "p-3 rounded-lg mb-1 cursor-pointer transition-all flex items-center gap-3",
                  selectedFileId === file.id ? "bg-[#1E3A5F]" : "hover:bg-white/5"
                )}
                onClick={() => setSelectedFileId(file.id)}
              >
                <FileText size={18} style={{ color: selectedFileId === file.id ? COLORS.accent : COLORS.fileIcon }} />
                <div className="flex flex-col min-w-0">
                  <span className="truncate font-medium" style={{ color: selectedFileId === file.id ? "white" : COLORS.textPrimary }}>{file.name}</span>
                  <span className="text-[11px]" style={{ color: selectedFileId === file.id ? COLORS.textSecondary : COLORS.textMuted }}>{file.date}</span>
                </div>
                {selectedFileId === file.id && <ChevronRight size={14} className="ml-auto" style={{ color: COLORS.accent }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFile ? (
            <>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: COLORS.borderSubtle, background: COLORS.backgroundSurface }}>
                <div className="flex items-center gap-3">
                  <FileText size={18} style={{ color: COLORS.accent }} />
                  <span className="font-semibold text-[15px]" style={{ color: COLORS.textPrimary }}>{selectedFile.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-md"><Star size={18} style={{ color: COLORS.textMuted }} /></button>
                  <button className="p-2 hover:bg-white/5 rounded-md"><Maximize2 size={18} style={{ color: COLORS.textSecondary }} /></button>
                  <button className="p-2 hover:bg-white/5 rounded-md" onClick={() => setSelectedFileId("")}><X size={18} style={{ color: COLORS.textSecondary }} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-4xl mx-auto w-full">
                <div className="prose prose-invert max-w-none">
                  <pre className="p-6 rounded-xl border border-white/5 bg-zinc-900/50 font-mono text-[13px] leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{ color: COLORS.textPrimary }}>
                    {MOCK_CONTENT}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <FileText size={64} style={{ color: COLORS.textMuted, opacity: 0.2 }} />
              <p className="mt-4 text-[16px] font-medium" style={{ color: COLORS.textMuted }}>Select a file to view</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full overflow-hidden">
        {/* Mobile App Bar */}
        <div className="h-14 shrink-0 flex items-center px-4 gap-4 border-b" style={{ background: COLORS.backgroundSurface, borderColor: COLORS.borderSubtle }}>
          <button className="p-2 -ml-2"><Menu size={24} style={{ color: COLORS.textPrimary }} /></button>
          <div className="flex items-center gap-2">
            <Book size={20} style={{ color: COLORS.accent }} />
            <span className="font-bold text-[16px]" style={{ color: COLORS.textPrimary }}>MD Explorer</span>
          </div>
          <div className="ml-auto flex items-center">
            <button className="p-2"><RotateCcw size={20} style={{ color: COLORS.textSecondary }} /></button>
            <button className="p-2"><Library size={22} style={{ color: COLORS.textSecondary }} /></button>
            <button className="p-2"><Settings size={20} style={{ color: COLORS.textSecondary }} /></button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeMobilePanel === "tree" && (
            <div className="flex-1 overflow-y-auto p-4 animate-in fade-in duration-300">
               <span className="text-[11px] font-bold tracking-widest uppercase block mb-4" style={{ color: COLORS.textMuted }}>Managed Folders</span>
               {MOCK_FOLDERS.map(folder => (
                <div key={folder.id} className="mb-2">
                  <div 
                    className="flex items-center gap-3 py-3 border-b" 
                    style={{ borderColor: COLORS.borderSubtle }}
                    onClick={() => { setSelectedFolderId(folder.id); setActiveMobilePanel("files"); }}
                  >
                    <Folder size={20} style={{ color: COLORS.folderIcon }} />
                    <span className="text-[15px]" style={{ color: COLORS.textPrimary }}>{folder.name}</span>
                    <ChevronRight size={16} className="ml-auto text-zinc-600" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeMobilePanel === "files" && (
            <div className="flex-1 overflow-y-auto p-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: COLORS.textMuted }}>Files in folder</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10" style={{ color: COLORS.accent }}>{selectedFolderId}</span>
              </div>
              <div className="space-y-1">
                {MOCK_FILES.map(file => (
                  <div 
                    key={file.id}
                    className="p-4 rounded-xl border flex items-center gap-3 mb-2 active:scale-[0.98] transition-all"
                    style={{ background: COLORS.backgroundElevated, borderColor: COLORS.borderSubtle }}
                    onClick={() => { setSelectedFileId(file.id); setActiveMobilePanel("viewer"); }}
                  >
                    <FileText size={20} style={{ color: COLORS.fileIcon }} />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate font-medium" style={{ color: COLORS.textPrimary }}>{file.name}</span>
                      <span className="text-[11px]" style={{ color: COLORS.textMuted }}>{file.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMobilePanel === "viewer" && (
            <div className="flex-1 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
               <div className="p-4 border-b flex items-center gap-3" style={{ background: COLORS.backgroundSurface, borderColor: COLORS.borderSubtle }}>
                <button onClick={() => setActiveMobilePanel("files")} className="p-1 -ml-1"><ArrowLeft size={20} style={{ color: COLORS.textSecondary }} /></button>
                <span className="font-semibold truncate flex-1" style={{ color: COLORS.textPrimary }}>{selectedFile?.name}</span>
                <button className="p-1"><Star size={20} style={{ color: COLORS.textMuted }} /></button>
                <button className="p-1"><Maximize2 size={20} style={{ color: COLORS.textSecondary }} /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-6">
                <pre className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: COLORS.textPrimary }}>
                  {MOCK_CONTENT}
                </pre>
               </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="h-16 shrink-0 flex items-center justify-around border-t" style={{ background: COLORS.backgroundSurface, borderColor: COLORS.borderSubtle }}>
          <button 
            className="flex flex-col items-center gap-1 p-2 min-w-20"
            onClick={() => setActiveMobilePanel("tree")}
          >
            <Folder size={24} style={{ color: activeMobilePanel === "tree" ? COLORS.accent : COLORS.textMuted }} />
            <span className="text-[10px]" style={{ color: activeMobilePanel === "tree" ? COLORS.accent : COLORS.textMuted }}>Folders</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 p-2 min-w-20"
            onClick={() => setActiveMobilePanel("files")}
          >
            <Library size={24} style={{ color: activeMobilePanel === "files" ? COLORS.accent : COLORS.textMuted }} />
            <span className="text-[10px]" style={{ color: activeMobilePanel === "files" ? COLORS.accent : COLORS.textMuted }}>Files</span>
          </button>
          <button 
            className={cn("flex flex-col items-center gap-1 p-2 min-w-20", !selectedFile && "opacity-30")}
            onClick={() => selectedFile && setActiveMobilePanel("viewer")}
            disabled={!selectedFile}
          >
            <FileText size={24} style={{ color: activeMobilePanel === "viewer" ? COLORS.accent : COLORS.textMuted }} />
            <span className="text-[10px]" style={{ color: activeMobilePanel === "viewer" ? COLORS.accent : COLORS.textMuted }}>Viewer</span>
          </button>
        </div>
      </div>

      {!quickStartDone && projectData?.quickStartSteps && (
        <DemoQuickStart projectId="md-explorer" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
