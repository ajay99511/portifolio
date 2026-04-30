"use client";

import { useState, useEffect } from "react";
import { 
  Folder, 
  FileCode2, 
  TerminalSquare, 
  Play, 
  ChevronRight,
  ChevronDown,
  Activity,
  BrainCircuit,
  PanelRightClose,
  PanelRightOpen,
  Microscope,
  Server,
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
    metrics: string;
    keyConcept: string;
    highlights: string[];
    insight: string;
  };
};

const MODULES: ModuleData[] = [
  {
    id: "training",
    label: "Optimization",
    icon: BrainCircuit,
    files: [
      { name: "src", type: "dir", isOpen: true, children: [{ name: "train.py", type: "file" }] },
      { name: "data", type: "dir", children: [{ name: "diabetes.csv", type: "file" }] }
    ],
    codeFilename: "train.py",
    codeSnippet: `def objective(trial):
    # Bayesian Optimization with Optuna
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 500),
        'max_depth': trial.suggest_int('max_depth', 3, 7),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.2, log=True),
    }

    pipeline = ImbPipeline([
        ('imputer', KNNImputer(n_neighbors=5)),
        ('scaler', StandardScaler()),
        ('smote', SMOTE(random_state=42)),
        ('model', XGBClassifier(**params))
    ])

    cv = StratifiedKFold(n_splits=5, shuffle=True)
    score = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring='roc_auc').mean()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)`,
    termCommand: "python train.py",
    termSimulation: (step) => `[Trial ${step}] Finished with value: ${(0.81 + (step/1000)).toFixed(4)} | Best is trial ${Math.max(1, step-5)} with value: 0.8342`,
    maxSteps: 20,
    info: {
      title: "Learning Optimization",
      description: "My exploration into using Optuna to find the best hyperparameters for medical diagnosis.",
      dataset: "PIMA Indians",
      model: "XGBoost + Optuna",
      metrics: "83.4% ROC-AUC",
      keyConcept: "Search Space",
      highlights: ["Cross-Validation", "SMOTE Imbalance Correction", "KNN Imputation"],
      insight: "I learned that automated tuning is much more reliable than manual guessing for complex models."
    }
  },
  {
    id: "explainability",
    label: "Explainable AI",
    icon: Microscope,
    files: [
      { name: "src", type: "dir", isOpen: true, children: [{ name: "main.py", type: "file" }] }
    ],
    codeFilename: "main.py",
    codeSnippet: `@app.post("/predict")
def predict(input_data: DiabetesInput):
    # 1. Pipeline Processing
    features_df = feature_engineering(input_data.dict())
    prediction = pipeline.predict(features_df)[0]
    
    # 2. XAI: SHAP Calculation
    transformed_df = pipeline[:-1].transform(features_df)
    shap_values = explainer.shap_values(transformed_df)
    
    # 3. Identify Top Risk Drivers
    feature_impact = dict(zip(feature_names, shap_values[0]))
    sorted_factors = sorted(feature_impact.items(), key=lambda x: abs(x[1]), reverse=True)
    
    return {
        "diagnosis": "Diabetic" if prediction == 1 else "Healthy",
        "medical_reasoning": [
            f"{f} ({'increased' if v > 0 else 'decreased'} risk)" 
            for f, v in sorted_factors[:3]
        ]
    }`,
    termCommand: "curl -X POST /predict -d '{\"Glucose\": 148, \"BMI\": 33.6, ...}'",
    termSimulation: () => `{"prediction": "Diabetic", "confidence": "89.42%", "medical_analysis": {"primary_drivers": ["Glucose (increased risk)", "Age (increased risk)", "BMI (increased risk)"]}}`,
    maxSteps: 10,
    info: {
      title: "Reasoning with XAI",
      description: "I wanted to see exactly 'why' the model flagged a patient, so I integrated SHAP values for transparency.",
      dataset: "Diagnostic Data",
      model: "SHAP TreeExplainer",
      metrics: "Transparent Logic",
      keyConcept: "Shapley Values",
      highlights: ["Feature Contribution", "Risk Factor Ranking", "Physiological Context"],
      insight: "Visualizing the 'why' makes AI feel much more like a tool and less like a black box."
    }
  },
  {
    id: "api",
    label: "FastAPI",
    icon: Server,
    files: [
      { name: "root", type: "dir", isOpen: true, children: [{ name: "Dockerfile", type: "file" }, { name: "main.py", type: "file" }] }
    ],
    codeFilename: "Dockerfile",
    codeSnippet: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    termCommand: "docker build -t diabetes-api .",
    termSimulation: (step) => `Step ${step}/7 : COPY . . \n ---> ${Math.random().toString(16).substring(2, 10)}\nSuccessfully built diabetes-api:latest`,
    maxSteps: 7,
    info: {
      title: "Learning Deployment",
      description: "My first time containerizing an ML service with Docker to ensure it runs anywhere.",
      dataset: "N/A",
      model: "Containerized",
      metrics: "100ms Latency",
      keyConcept: "Portability",
      highlights: ["Docker Multistage", "Pydantic Validation", "Uvicorn Async"],
      insight: "Docker solved the 'it works on my machine' problem for my complex Python environment."
    }
  }
];

export default function DbPredDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "db-pred");
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Initializing Medical ML Environment...",
    "Loading PIMA Indians Dataset...",
    "Ready."
  ]);
  const [showInfo, setShowInfo] = useState(true);
  
  const activeModule = MODULES[activeModuleIdx];

  useEffect(() => {
    setTimeout(() => {
      setLogs([
        "Initializing Medical ML Environment...",
        "Loading PIMA Indians Dataset...",
        "Ready."
      ]);
      setIsRunning(false);
    }, 0);
  }, [activeModuleIdx]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    let step = 0;
    let val = 0.82;
    
    setTimeout(() => {
      setLogs([`$ ${activeModule.termCommand}`, "Execution started..."]);
    }, 0);

    const interval = setInterval(() => {
      step++;
      val = val + (Math.random() * 0.005);
      
      const newLog = activeModule.termSimulation(step, 0, val);
      
      setLogs(prev => {
        const next = [...prev, newLog];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      
      if (step >= activeModule.maxSteps) {
        setIsRunning(false);
        setLogs(prev => [...prev, "Process completed successfully."]);
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
            File Explorer
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
                .replace(/\b(class|def|import|from|return|if|else|elif|for|in|while|try|except|with|as|pass|super|async|await|FROM|WORKDIR|COPY|RUN|EXPOSE|CMD)\b/g, `<span style="color: ${THEME.keyword}">$1</span>`)
                .replace(/\b(pd\.DataFrame|XGBClassifier|StandardScaler|KNNImputer|SMOTE|ImbPipeline|DiabetesInput|int|float|bool|str|list|dict|tuple)\b/g, `<span style="color: ${THEME.class}">$1</span>`)
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
                <TerminalSquare size={14} /> Output
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
                  <Activity size={16} style={{ color: THEME.accent }} />
                  <h3 className="font-semibold text-white">{activeModule.info.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
                  {activeModule.info.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="border rounded-md p-3" style={{ borderColor: THEME.border, background: "rgba(0,0,0,0.2)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: THEME.textMuted }}>Medical Insight</p>
                  <p className="text-sm font-medium leading-snug" style={{ color: THEME.accent }}>{activeModule.info.insight}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Pipeline Specs</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Dataset</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.dataset}>{activeModule.info.dataset}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Stack</p>
                    <p className="font-medium text-white">{activeModule.info.model}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Result</p>
                    <p className="font-medium text-white">{activeModule.info.metrics}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Focus</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.keyConcept}>{activeModule.info.keyConcept}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Key Technologies</p>
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
        <DemoQuickStart projectId="db-pred" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
