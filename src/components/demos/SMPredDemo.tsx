"use client";

import { useState, useEffect } from "react";
import { 
  Folder, 
  FileCode2, 
  TerminalSquare, 
  Play, 
  ChevronRight,
  ChevronDown,
  BarChart3,
  PanelRightClose,
  PanelRightOpen,
  Layout,
  Droplets,
  TrendingUp,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

const THEME = {
  bgBase: "#0d1117",     
  bgSidebar: "#161b22",  
  bgPanel: "#0d1117",    
  bgTerminal: "#010409", 
  textMain: "#c9d1d9",   
  textMuted: "#8b949e",  
  accent: "#58a6ff",     
  border: "#30363d",     
  keyword: "#ff7b72",
  string: "#a5d6ff",
  function: "#d2a8ff",
  class: "#ff7b72",
  number: "#79c0ff",
  comment: "#8b949e"
};

type ModuleData = {
  id: string;
  label: string;
  icon: LucideIcon;
  files: { name: string; type: "dir" | "file"; children?: { name: string; type: "file" }[], isOpen?: boolean }[];
  codeFilename: string;
  codeSnippet: string;
  termCommand: string;
  termSimulation: (step: number, epoch: number, currentVal: number) => string;
  maxSteps: number;
  info: {
    title: string;
    description: string;
    dataset: string;
    model: string;
    tech: string;
    keyConcept: string;
    highlights: string[];
    insight: string;
  };
};

const MODULES: ModuleData[] = [
  {
    id: "dashboard",
    label: "My Dashboard",
    icon: Layout,
    files: [
      { name: "root", type: "dir", isOpen: true, children: [{ name: "app.py", type: "file" }] },
      { name: "data", type: "dir", children: [{ name: "Groundwater.csv", type: "file" }] }
    ],
    codeFilename: "app.py",
    codeSnippet: `import streamlit as st
import plotly.express as px

st.title("ðŸ’§ My Groundwater Analytics")

# Scenario Analysis Tool
st.header("ðŸ”® Simulation Tool")
col1, col2 = st.columns(2)

with col1:
    rain = st.slider("Monsoon Rainfall", 0.0, 50.0, 15.0)
    usage = st.slider("Irrigation Usage", 0.0, 50.0, 10.0)

# Real-time Feature Engineering
usage_intensity = usage / (avail + 1e-5)
recharge_eff = rain / (total_rain + 1e-5)

prediction = model.predict([[rain, usage, usage_intensity, recharge_eff]])
st.metric("Predicted Stress Level", prediction)`,
    termCommand: "streamlit run app.py",
    termSimulation: () => `INFO: [${new Date().toLocaleTimeString()}] Streamlit server started.\nLocal URL: http://localhost:8501\nNetwork URL: http://192.168.1.5:8501`,
    maxSteps: 10,
    info: {
      title: "Building the Interface",
      description: "I built this dashboard to visualize how changes in rainfall and usage affect water stress in real-time.",
      dataset: "Indian States Groundwater",
      model: "Random Forest",
      tech: "Streamlit + Plotly",
      keyConcept: "Scenario Simulation",
      highlights: ["What-If Analysis", "Dynamic Plotly Charts", "Sidebar Navigation"],
      insight: "I learned that seeing the data move with a slider makes it much easier to understand the 'tipping points' of water stress."
    }
  },
  {
    id: "engineering",
    label: "Learning Features",
    icon: TrendingUp,
    files: [
      { name: "src", type: "dir", isOpen: true, children: [{ name: "train.py", type: "file" }] }
    ],
    codeFilename: "train.py",
    codeSnippet: `def feature_engineering(df):
    """My custom groundwater metrics."""
    # Usage Intensity: Ratio of extraction to availability
    df['Usage_Intensity'] = df['Total_Usage'] / (df['Net annual availability'] + 1e-5)
    
    # Recharge Efficiency: Rainfall conversion rate
    df['Recharge_Efficiency'] = (
        df['Recharge_rainfall_Monsoon'] + df['Recharge_rainfall_NonMonsoon']
    ) / (df['Total_Rainfall'] + 1e-5)
    
    return df

# Train with engineered features
df = feature_engineering(pd.read_csv('Groundwater.csv'))
model.fit(df[features], df['Situation'])`,
    termCommand: "python train.py",
    termSimulation: () => `[Feature Engineering] Calculated Usage_Intensity...\n[Feature Engineering] Calculated Recharge_Efficiency...\n[Training] RF Accuracy: 0.94 | F1: 0.92`,
    maxSteps: 15,
    info: {
      title: "Domain Feature Design",
      description: "My exploration into creating 'Stress Ratios' that tell a better story than raw volumetric data.",
      dataset: "Groundwater.csv",
      model: "Domain Analytics",
      tech: "Pandas + NumPy",
      keyConcept: "Feature Discovery",
      highlights: ["Usage Ratios", "Efficiency Indices", "Null Value Handling"],
      insight: "Creating 'Usage Intensity' was a breakthrough—it allowed the model to focus on the balance of water rather than just volume."
    }
  },
  {
    id: "insights",
    label: "Model Insights",
    icon: BarChart3,
    files: [
      { name: "models", type: "dir", isOpen: true, children: [{ name: "groundwater_model.pkl", type: "file" }] }
    ],
    codeFilename: "groundwater_model.pkl",
    codeSnippet: `# Random Forest Feature Importance Analysis
importances = model.feature_importances_
feature_rank = pd.DataFrame({
    'Feature': feature_names,
    'Importance': importances
}).sort_values('Importance', ascending=False)

# Notice: My custom features 'Usage_Intensity' 
# and 'Recharge_Efficiency' typically rank 
# in the Top 3 importance scorers.`,
    termCommand: "python -m insights.evaluate",
    termSimulation: () => `Top Feature 1: Usage_Intensity (0.342)\nTop Feature 2: Total_Rainfall (0.215)\nTop Feature 3: Recharge_Efficiency (0.188)`,
    maxSteps: 12,
    info: {
      title: "Analyzing the 'Why'",
      description: "Checking which factors my model values most to ensure it has learned the right patterns.",
      dataset: "Validation Set",
      model: "Random Forest",
      tech: "Scikit-Learn",
      keyConcept: "Gini Importance",
      highlights: ["Feature Ranking", "Explainability", "Model Validation"],
      insight: "Seeing my custom features at the top confirmed that my domain-specific approach was the right path."
    }
  }
];

export default function SMPredDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "sm-pred");
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Initializing Groundwater Analytics Environment...",
    "Connecting to Scikit-Learn backends...",
    "Ready."
  ]);
  const [showInfo, setShowInfo] = useState(true);
  
  const activeModule = MODULES[activeModuleIdx];

  useEffect(() => {
    setTimeout(() => {
      setLogs([
        "Initializing Groundwater Analytics Environment...",
        "Connecting to Scikit-Learn backends...",
        "Ready."
      ]);
      setIsRunning(false);
    }, 0);
  }, [activeModuleIdx]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    let step = 0;
    
    setTimeout(() => {
      setLogs([`$ ${activeModule.termCommand}`, "Starting execution..."]);
    }, 0);

    const interval = setInterval(() => {
      step++;
      
      const newLog = activeModule.termSimulation(step, 0, 0);
      
      setLogs(prev => {
        const next = [...prev, newLog];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      
      if (step >= activeModule.maxSteps) {
        setIsRunning(false);
        setLogs(prev => [...prev, "Execution finished successfully."]);
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [isRunning, activeModule]);

  return (
    <div className="h-full rounded-lg border overflow-hidden flex flex-col font-sans text-sm relative shadow-2xl" style={{ borderColor: THEME.border, background: THEME.bgBase, color: THEME.textMain }}>
      
      <div className="h-12 border-b flex items-center px-2 shrink-0 overflow-x-auto hide-scrollbar" style={{ borderColor: THEME.border, background: THEME.bgSidebar }}>
        <div className="flex gap-1 min-w-max">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const isActive = idx === activeModuleIdx;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleIdx(idx)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-xs font-medium",
                  isActive ? "bg-white/10 shadow-sm" : "hover:bg-white/5 opacity-70 hover:opacity-100"
                )}
                style={{ color: isActive ? THEME.textMain : THEME.textMuted }}
              >
                <Icon size={14} style={{ color: isActive ? THEME.accent : "currentColor" }} />
                {mod.label}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-2 pl-4">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-colors whitespace-nowrap"
            style={{ background: isRunning ? "rgba(248, 113, 113, 0.15)" : "rgba(88, 166, 255, 0.15)", color: isRunning ? "#f87171" : THEME.accent }}
          >
            {isRunning ? "⏹ Stop" : <><Play size={12} /> Run</>}
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 rounded-sm transition-colors hover:bg-white/10"
            style={{ color: THEME.textMuted }}
          >
            {showInfo ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        <div className="w-[180px] md:w-[220px] border-r shrink-0 flex flex-col overflow-y-auto" style={{ borderColor: THEME.border, background: THEME.bgSidebar }}>
          <div className="px-4 py-3 text-[10px] font-bold tracking-widest uppercase" style={{ color: THEME.textMuted }}>
            Workspace
          </div>
          <div className="flex flex-col pb-4">
            {activeModule.files.map((dir, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-white/5 transition-colors text-sm font-medium" style={{ color: THEME.textMain }}>
                  {dir.isOpen !== false ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <Folder size={14} style={{ color: THEME.accent }} />
                  <span className="truncate">{dir.name}</span>
                </div>
                {dir.isOpen !== false && dir.children?.map((file, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer text-[13px] transition-colors"
                    style={{ 
                      background: file.name === activeModule.codeFilename ? "rgba(88, 166, 255, 0.1)" : "transparent",
                      color: file.name === activeModule.codeFilename ? THEME.accent : THEME.textMuted
                    }}
                  >
                    <FileCode2 size={14} />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0" style={{ background: THEME.bgPanel }}>
          <div className="flex border-b text-xs shrink-0" style={{ borderColor: THEME.border, background: THEME.bgSidebar }}>
            <div className="px-4 py-2.5 flex items-center gap-2 border-r border-t-2 bg-transparent" style={{ borderColor: THEME.border, borderTopColor: THEME.accent }}>
              <FileCode2 size={14} style={{ color: THEME.accent }} />
              <span style={{ color: THEME.textMain }} className="font-medium">{activeModule.codeFilename}</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed whitespace-pre" style={{ color: THEME.textMain }}>
            {activeModule.codeSnippet.split('\n').map((line, i) => {
              let coloredLine = line
                .replace(/\b(class|def|import|from|return|if|else|elif|for|in|while|try|except|with|as|pass|super|async|await)\b/g, `<span style="color: ${THEME.keyword}">$1</span>`)
                .replace(/\b(pd\.DataFrame|XGBClassifier|Transaction|PredictionResponse|HTTPException|int|float|bool|str|list|dict|tuple|RandomForestClassifier)\b/g, `<span style="color: ${THEME.class}">$1</span>`)
                .replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, `<span style="color: ${THEME.function}">$1</span>`);
              
              if (line.trim().startsWith('"""') || line.trim().startsWith('#')) {
                coloredLine = `<span style="color: ${THEME.comment}">${line}</span>`;
              }
              return (
                <div key={i} className="flex hover:bg-white/5 px-2 -mx-2 rounded-sm group">
                  <span className="w-8 shrink-0 text-right pr-4 select-none opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: THEME.border }}>{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: coloredLine }} />
                </div>
              );
            })}
          </div>

          <div className="h-[220px] shrink-0 border-t flex flex-col relative" style={{ borderColor: THEME.border, background: THEME.bgTerminal }}>
            <div className="h-9 border-b flex items-center px-4 gap-4 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: THEME.border, color: THEME.textMuted }}>
              <div className="flex items-center gap-1.5 text-white">
                <TerminalSquare size={14} /> Console
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed" style={{ color: THEME.textMuted }}>
              {logs.map((log, i) => (
                <div key={i} className={log.startsWith('$') ? "text-white font-medium mb-2" : ""}>
                  {log}
                </div>
              ))}
              {isRunning && <div className="animate-pulse inline-block">_</div>}
            </div>
          </div>
        </div>

        {showInfo && (
          <div className="w-[280px] shrink-0 border-l flex flex-col overflow-y-auto" style={{ borderColor: THEME.border, background: THEME.bgSidebar }}>
            <div className="p-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets size={16} style={{ color: THEME.accent }} />
                  <h3 className="font-semibold text-white">{activeModule.info.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
                  {activeModule.info.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="border rounded-md p-3" style={{ borderColor: THEME.border, background: "rgba(0,0,0,0.2)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: THEME.textMuted }}>Key Insight</p>
                  <p className="text-sm font-medium leading-snug" style={{ color: THEME.accent }}>{activeModule.info.insight}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Project Specs</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Dataset</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.dataset}>{activeModule.info.dataset}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Architecture</p>
                    <p className="font-medium text-white">{activeModule.info.model}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Framework</p>
                    <p className="font-medium text-white">{activeModule.info.tech}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Concept</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.keyConcept}>{activeModule.info.keyConcept}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Implementation Details</p>
                <ul className="text-xs space-y-1.5" style={{ color: THEME.textMain }}>
                  {activeModule.info.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: THEME.accent }}></span>
                      <span className="leading-tight">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart projectId="sm-pred" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
