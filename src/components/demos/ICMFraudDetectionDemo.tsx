/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { 
  Folder, 
  FileCode2, 
  TerminalSquare, 
  Play, 
  ChevronRight,
  ChevronDown,
  Info,
  Activity,
  ShieldCheck,
  Zap,
  BarChart3,
  Search,
  PanelRightClose,
  PanelRightOpen,
  Server,
  Database
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  files: { name: string; type: "dir" | "file"; children?: { name: string; type: "file" }[], isOpen?: boolean }[];
  codeFilename: string;
  codeSnippet: string;
  termCommand: string;
  termSimulation: (step: number, epoch: number, currentProb: number) => string;
  maxSteps: number;
  info: {
    title: string;
    description: string;
    dataset: string;
    model: string;
    latency: string;
    keyConcept: string;
    highlights: string[];
    insight: string;
  };
};

const MODULES: ModuleData[] = [
  {
    id: "pipeline",
    label: "Inference Pipeline",
    icon: Zap,
    files: [
      { name: "src", type: "dir", isOpen: true, children: [{ name: "pipeline.py", type: "file" }] },
      { name: "models", type: "dir", children: [{ name: "fraud_model.joblib", type: "file" }] }
    ],
    codeFilename: "pipeline.py",
    codeSnippet: `class PredictionPipeline:
    """Inference pipeline with training-time feature parity."""
    def __init__(self, model_path, encoders_path, medians_path):
        self.model = joblib.load(model_path)
        self.encoders = joblib.load(encoders_path)
        self.medians = joblib.load(medians_path)

    def preprocess(self, input_df: pd.DataFrame) -> pd.DataFrame:
        df = input_df.copy()
        
        # 1. Feature Engineering: Time-based signals
        df["hour"] = (df["TransactionDT"] // 3600) % 24
        
        # 2. Categorical Encoding: Using fitted training encoders
        for col, le in self.encoders.items():
            if col in df.columns:
                known = set(le.classes_)
                df[col] = df[col].apply(lambda x: x if x in known else le.classes_[0])
                df[col] = le.transform(df[col])
                
        # 3. Numeric Imputation: Using training medians
        for col, median in self.medians.items():
            if col in df.columns:
                df[col] = df[col].fillna(median)
                
        return df[self.feature_cols]`,
    termCommand: "curl -X POST /predict -d '{\"TransactionAmt\": 49.99, ...}'",
    termSimulation: (step, _, prob) => `[POST] /predict | Status: 200 | Latency: 42ms | Prob: ${prob.toFixed(4)} | Result: ${prob > 0.5 ? "FRAUD" : "LEGIT"}`,
    maxSteps: 20,
    info: {
      title: "Production Inference",
      description: "Stateless pipeline ensuring 100% feature parity between training and serving.",
      dataset: "IEEE-CIS Fraud",
      model: "XGBoost v2.0",
      latency: "< 50ms",
      keyConcept: "Schema Alignment",
      highlights: ["Imputation via Medians", "Label Encoding Persistence", "Temporal Engineering"],
      insight: "Inference must be a perfect mirror of training transformations to avoid skew."
    }
  },
  {
    id: "training",
    label: "Model Training",
    icon: BarChart3,
    files: [
      { name: "src", type: "dir", isOpen: true, children: [{ name: "model_trainer.py", type: "file" }] },
      { name: "data", type: "dir", children: [{ name: "raw", type: "file" }] }
    ],
    codeFilename: "model_trainer.py",
    codeSnippet: `def train_model(X_train, y_train, X_val, y_val):
    # Calculate scale_pos_weight for extreme class imbalance
    neg, pos = (y_train == 0).sum(), (y_train == 1).sum()
    scale_pos_weight = neg / pos
    
    model = xgb.XGBClassifier(
        n_estimators=500,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.7,
        scale_pos_weight=scale_pos_weight,
        eval_metric="auc",
        early_stopping_rounds=20
    )
    
    model.fit(
        X_train, y_train,
        eval_set=[(X_val, y_val)],
        verbose=50
    )
    return model`,
    termCommand: "python src/components/model_trainer.py",
    termSimulation: (step, _, loss) => `[Epoch ${Math.floor(step/5)}] Step ${step} | val-auc: ${(0.85 + (step/200)).toFixed(4)} | early_stop_count: 0`,
    maxSteps: 50,
    info: {
      title: "XGBoost Training",
      description: "Optimizing for ROC-AUC on highly imbalanced (3% fraud) financial data.",
      dataset: "400+ Features",
      model: "Gradient Boosting",
      latency: "N/A (Training)",
      keyConcept: "Imbalance Handling",
      highlights: ["scale_pos_weight Tuning", "Stratified Split", "Early Stopping (AUC)"],
      insight: "Accuracy is a lie in fraud; ROC-AUC and scale_pos_weight are your best friends."
    }
  },
  {
    id: "api",
    label: "FastAPI Service",
    icon: Server,
    files: [
      { name: "root", type: "dir", isOpen: true, children: [{ name: "app.py", type: "file" }] }
    ],
    codeFilename: "app.py",
    codeSnippet: `@app.post("/predict", response_model=PredictionResponse)
async def predict_fraud(transaction: Transaction):
    """Score a single transaction for fraud probability."""
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Pipeline not loaded")
        
    try:
        prob = pipeline.predict(transaction.model_dump())
        return {
            "fraud_probability": round(prob, 6),
            "is_fraud": prob > FRAUD_THRESHOLD,
            "threshold": FRAUD_THRESHOLD
        }
    except Exception as exc:
        logger.error(f"Prediction failed: {exc}")
        raise HTTPException(status_code=500)`,
    termCommand: "uvicorn app:app --host 0.0.0.0 --port 8000",
    termSimulation: (step, _, __) => `INFO: [${new Date().toLocaleTimeString()}] 127.0.0.1:5421 - "POST /predict HTTP/1.1" 200 OK`,
    maxSteps: 30,
    info: {
      title: "FastAPI REST Server",
      description: "High-performance async API for real-time scoring integration.",
      dataset: "IEEE-CIS",
      model: "XGBoost",
      latency: "10-20ms (API overhead)",
      keyConcept: "Async I/O",
      highlights: ["Pydantic Validation", "Lifespan Model Loading", "Batch Processing"],
      insight: "Model loading should happen once at startup using FastAPI lifespan events."
    }
  }
];

export default function ICMFraudDetectionDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "icm-fraud-detection");
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  
  const activeModule = MODULES[activeModuleIdx];

  useEffect(() => {
    setLogs([
      "Initializing IEEE-CIS Fraud Detection environment...",
      "Connecting to artifact registry...",
      "Ready."
    ]);
    setIsRunning(false);
  }, [activeModuleIdx]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    let step = 0;
    let val = 0.5;
    
    setLogs([`$ ${activeModule.termCommand}`, "Starting execution..."]);

    const interval = setInterval(() => {
      step++;
      val = val + (Math.random() * 0.1 - 0.05);
      if (val < 0) val = 0.01;
      if (val > 1) val = 0.99;
      
      const newLog = activeModule.termSimulation(step, 0, val);
      
      setLogs(prev => {
        const next = [...prev, newLog];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      
      if (step >= activeModule.maxSteps) {
        setIsRunning(false);
        setLogs(prev => [...prev, "Execution finished successfully."]);
        clearInterval(interval);
      }
    }, 400);
    
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
            Project Files
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
                .replace(/\b(pd\.DataFrame|XGBClassifier|Transaction|PredictionResponse|HTTPException|int|float|bool|str|list|dict|tuple)\b/g, `<span style="color: ${THEME.class}">$1</span>`)
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
                  <ShieldCheck size={16} style={{ color: THEME.accent }} />
                  <h3 className="font-semibold text-white">{activeModule.info.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
                  {activeModule.info.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="border rounded-md p-3" style={{ borderColor: THEME.border, background: "rgba(0,0,0,0.2)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: THEME.textMuted }}>Design Choice</p>
                  <p className="text-sm font-medium leading-snug" style={{ color: THEME.accent }}>{activeModule.info.insight}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Technical Specs</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Data</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.dataset}>{activeModule.info.dataset}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Architecture</p>
                    <p className="font-medium text-white">{activeModule.info.model}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Latency</p>
                    <p className="font-medium text-white">{activeModule.info.latency}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Core Focus</p>
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
        <DemoQuickStart projectId="icm-fraud-detection" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
