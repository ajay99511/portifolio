/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { 
  Folder, 
  FileCode2, 
  TerminalSquare, 
  Play, 
  Cpu,
  ChevronRight,
  ChevronDown,
  Info,
  Network,
  Activity,
  Layers,
  Zap,
  BarChart,
  BrainCircuit,
  PanelRightClose,
  PanelRightOpen
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
  termSimulation: (step: number, epoch: number, currentLoss: number) => string;
  maxEpochs: number;
  info: {
    title: string;
    description: string;
    dataset: string;
    params: string;
    cpuTime: string;
    keyConcept: string;
    algorithms: string[];
    insight: string;
  };
};

const MODULES: ModuleData[] = [
  {
    id: "backprop",
    label: "MLP",
    icon: Network,
    files: [
      { name: "backprop", type: "dir", isOpen: true, children: [{ name: "model.py", type: "file" }, { name: "train.py", type: "file" }, { name: "data.py", type: "file" }] },
      { name: "shared", type: "dir", children: [{ name: "config.py", type: "file" }] }
    ],
    codeFilename: "model.py",
    codeSnippet: `import torch.nn as nn

class MLP(nn.Module):
    """Multi-layer perceptron for regression."""
    def __init__(self, input_dim: int, hidden_dims: list[int], dropout: float):
        super().__init__()
        layers = []
        in_dim = input_dim
        for hidden_dim in hidden_dims:
            layers.append(nn.Linear(in_dim, hidden_dim))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(p=dropout))
            in_dim = hidden_dim
        layers.append(nn.Linear(in_dim, 1))
        self.network = nn.Sequential(*layers)

def initialize_weights(model: MLP, strategy: str):
    for module in model.modules():
        if isinstance(module, nn.Linear):
            if strategy == "kaiming":
                nn.init.kaiming_normal_(module.weight, nonlinearity="relu")
            elif strategy == "xavier":
                nn.init.xavier_uniform_(module.weight)
            elif strategy == "normal":
                nn.init.normal_(module.weight, mean=0.0, std=0.01)
            if module.bias is not None:
                nn.init.zeros_(module.bias)`,
    termCommand: "python -m backprop.train --init kaiming",
    termSimulation: (step, epoch, loss) => `[Epoch ${epoch}/50] Step ${step}/522 | loss: ${loss.toFixed(4)} | RMSE: ${(loss*0.8).toFixed(4)} | R²: ${(0.4 + (epoch/100)).toFixed(2)}`,
    maxEpochs: 50,
    info: {
      title: "MLP Training Loop",
      description: "Training loop from scratch with 3 init strategies.",
      dataset: "California Housing",
      params: "18,305",
      cpuTime: "< 5 min",
      keyConcept: "Weight Initialization",
      algorithms: ["AdamW", "Cosine LR w/ Warmup", "Kaiming Init", "Gradient Accumulation"],
      insight: "Weight initialization determines convergence — Kaiming is correct for ReLU."
    }
  },
  {
    id: "pretrain",
    label: "GPT Pretrain",
    icon: BrainCircuit,
    files: [
      { name: "pretrain", type: "dir", isOpen: true, children: [{ name: "model.py", type: "file" }, { name: "train.py", type: "file" }, { name: "tokenizer.py", type: "file" }] }
    ],
    codeFilename: "model.py",
    codeSnippet: `class CausalSelfAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int, dropout: float, context_length: int):
        super().__init__()
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        self.scale = math.sqrt(self.d_head)
        
        self.qkv_proj = nn.Linear(d_model, 3 * d_model, bias=False)
        self.out_proj = nn.Linear(d_model, d_model, bias=False)
        
        mask = torch.triu(torch.ones(context_length, context_length, dtype=torch.bool), diagonal=1)
        self.register_buffer("causal_mask", mask)

    def forward(self, x):
        B, T, d_model = x.shape
        qkv = self.qkv_proj(x)
        q, k, v = qkv.split(d_model, dim=-1)

        q = q.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
        k = k.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
        v = v.view(B, T, self.n_heads, self.d_head).transpose(1, 2)

        attn = torch.matmul(q, k.transpose(-2, -1)) / self.scale
        attn = attn.masked_fill(self.causal_mask[:T, :T].unsqueeze(0).unsqueeze(0), float("-inf"))
        return self.out_proj(torch.matmul(F.softmax(attn, dim=-1), v))`,
    termCommand: "python -m pretrain.train",
    termSimulation: (step, epoch, loss) => `[Step ${step+(epoch*500)}/10000] | loss: ${loss.toFixed(4)} | perplexity: ${Math.exp(loss).toFixed(2)} | lr: 3.00e-4`,
    maxEpochs: 20,
    info: {
      title: "GPT-style Transformer",
      description: "Decoder-only transformer from scratch.",
      dataset: "TinyStories (2.1M docs)",
      params: "3.5M",
      cpuTime: "~30 min",
      keyConcept: "Causal Masking & Attention",
      algorithms: ["Causal Self-Attention", "Fused QKV", "Pre-LayerNorm", "Weight Tying", "BPE Tokenizer"],
      insight: "Attention is learned dynamic routing — causal mask makes it autoregressive."
    }
  },
  {
    id: "finetune",
    label: "RLHF",
    icon: Activity,
    files: [
      { name: "finetune", type: "dir", isOpen: true, children: [{ name: "rlhf.py", type: "file" }, { name: "sft.py", type: "file" }, { name: "reward_model.py", type: "file" }] }
    ],
    codeFilename: "rlhf.py",
    codeSnippet: `def ppo_step(policy, ref_policy, reward_model, batch, config, logger):
    input_ids = batch["input_ids"]
    attention_mask = batch["attention_mask"]

    # 1. Generate responses
    generated_ids = _generate_responses(policy, input_ids, max_new_tokens=64)
    gen_mask = torch.ones_like(generated_ids)

    # 2. Score with reward model
    with torch.no_grad():
        rewards = reward_model(generated_ids, gen_mask)
        rewards = rewards.clamp(-config.reward_clip_bound, config.reward_clip_bound)

    # 3. Compute KL divergence
    kl = _compute_token_kl(policy, ref_policy, generated_ids, gen_mask)

    # 4. Adjusted reward
    adjusted_reward = rewards - config.kl_coeff * kl

    # 5. Policy gradient update (REINFORCE)
    policy_outputs = policy(input_ids=generated_ids, attention_mask=gen_mask, labels=generated_ids)
    policy_loss = -(adjusted_reward.detach() * (-policy_outputs.loss)).mean()
    policy_loss.backward()`,
    termCommand: "python -m finetune.rlhf",
    termSimulation: (step, epoch, loss) => `[PPO Step ${step+(epoch*100)}/2000] | reward: ${(2.5 - loss/3).toFixed(4)} | kl: ${(loss*0.1).toFixed(4)} | policy_loss: ${loss.toFixed(4)}`,
    maxEpochs: 20,
    info: {
      title: "Alignment: SFT + RLHF",
      description: "Full alignment pipeline teaching GPT-2 to follow instructions.",
      dataset: "Stanford Alpaca + HH-RLHF",
      params: "117M (GPT-2 Base)",
      cpuTime: "~90 min",
      keyConcept: "KL-Penalized RL",
      algorithms: ["Bradley-Terry Loss", "REINFORCE", "Token-level KL Divergence", "RLAIF"],
      insight: "KL penalty prevents reward hacking — the alignment tax is real."
    }
  },
  {
    id: "visiontx",
    label: "Vision TX",
    icon: Layers,
    files: [
      { name: "visiontx", type: "dir", isOpen: true, children: [{ name: "model.py", type: "file" }, { name: "baseline.py", type: "file" }, { name: "attention_viz.py", type: "file" }] }
    ],
    codeFilename: "model.py",
    codeSnippet: `class PatchEmbedding(nn.Module):
    """Splits image into non-overlapping patches and projects to d_model."""
    def __init__(self, image_size: int, patch_size: int, n_channels: int, d_model: int):
        super().__init__()
        self.projection = nn.Conv2d(
            in_channels=n_channels, out_channels=d_model,
            kernel_size=patch_size, stride=patch_size
        )

    def forward(self, x: Tensor) -> Tensor:
        x = self.projection(x)
        x = x.flatten(2).transpose(1, 2)
        return x

class ViT(nn.Module):
    def forward(self, x: Tensor) -> Tensor:
        B = x.shape[0]
        x = self.patch_embed(x)
        
        cls_tokens = self.cls_token.expand(B, -1, -1)
        x = torch.cat([cls_tokens, x], dim=1)
        
        x = x + self.pos_embed
        for block in self.blocks:
            x = block(x)
            
        x = self.ln_f(x)
        return self.head(x[:, 0])`,
    termCommand: "python -m visiontx.train --model vit",
    termSimulation: (step, epoch, loss) => `[Epoch ${epoch}/30] | loss: ${loss.toFixed(4)} | train_acc: ${(100 - loss*10).toFixed(1)}% | val_acc: ${(95 - loss*12).toFixed(1)}%`,
    maxEpochs: 30,
    info: {
      title: "Vision Transformer",
      description: "ViT + ResNet-18 from scratch with attention visualization.",
      dataset: "CIFAR-10",
      params: "1.8M (ViT) / 11.2M (ResNet)",
      cpuTime: "~45 min",
      keyConcept: "Patch Embeddings",
      algorithms: ["Patch Embedding", "Class Token", "Attention Rollout", "Residual Blocks"],
      insight: "Images are sequences of patches — same transformer works for vision."
    }
  },
  {
    id: "infer",
    label: "Inference",
    icon: Zap,
    files: [
      { name: "infer", type: "dir", isOpen: true, children: [{ name: "kv_cache.py", type: "file" }, { name: "inference.py", type: "file" }, { name: "reasoning.py", type: "file" }] }
    ],
    codeFilename: "kv_cache.py",
    codeSnippet: `class KVCache:
    """Stores past key/value tensors to avoid recomputation."""
    def __init__(self, n_layers: int, n_heads: int, d_head: int, max_seq_len: int):
        self.n_layers = n_layers
        self._k_cache = [torch.empty(1, n_heads, 0, d_head) for _ in range(n_layers)]
        self._v_cache = [torch.empty(1, n_heads, 0, d_head) for _ in range(n_layers)]

    def update(self, layer_idx: int, k: Tensor, v: Tensor) -> tuple[Tensor, Tensor]:
        """Append new k/v and return full cached k/v for this layer."""
        self._k_cache[layer_idx] = torch.cat([self._k_cache[layer_idx], k], dim=2)
        self._v_cache[layer_idx] = torch.cat([self._v_cache[layer_idx], v], dim=2)
        return self._k_cache[layer_idx], self._v_cache[layer_idx]

def benchmark_kv_cache(model, prompts, tokenizer, config):
    # Uncached: O(T^2) complexity
    # Cached: O(T) complexity
    pass`,
    termCommand: "python -m infer.benchmark",
    termSimulation: (step, epoch, loss) => `[Benchmarking...] tokens/sec cached: ${(80 + (epoch*2)).toFixed(1)} | uncached: ${(12 - loss).toFixed(1)} | speedup: ${(6 + loss/2).toFixed(1)}x`,
    maxEpochs: 15,
    info: {
      title: "Inference & KV Cache",
      description: "Complete inference stack with KV cache and decoding strategies.",
      dataset: "GSM8K + BIG-Bench Hard",
      params: "N/A",
      cpuTime: "Varies",
      keyConcept: "Autoregressive Caching",
      algorithms: ["Greedy", "Beam Search", "Nucleus Sampling", "KV Cache", "Chain-of-Thought"],
      insight: "KV cache provides quadratic speedup — not optional for production."
    }
  },
  {
    id: "evaluate",
    label: "Evaluation",
    icon: BarChart,
    files: [
      { name: "evaluate", type: "dir", isOpen: true, children: [{ name: "evaluate.py", type: "file" }, { name: "calibration.py", type: "file" }, { name: "weight_analysis.py", type: "file" }] }
    ],
    codeFilename: "evaluate.py",
    codeSnippet: `def run_evaluation(model_name: str, tasks: dict[str, int], config, logger):
    """Wrap lm_eval.simple_evaluate() to run benchmark evaluation."""
    lm = lm_eval.models.get_model("hf")(pretrained=model_name, device="cpu")
    results = {}

    for task_name, num_fewshot in tasks.items():
        try:
            output = lm_eval.simple_evaluate(
                model=lm, tasks=[task_name], num_fewshot=num_fewshot, device="cpu"
            )
            task_results = output.get("results", {}).get(task_name, {})
            
            # Extract normalised accuracy or mc2 (for TruthfulQA)
            accuracy = (
                task_results.get("acc_norm,none")
                or task_results.get("acc,none")
                or task_results.get("mc2,none") 
            )
            results[task_name] = accuracy
        except Exception as exc:
            logger.log({"type": "task_eval_error", "task": task_name})
            results[task_name] = None

    return results`,
    termCommand: "python -m evaluate.evaluate --models gpt2,pythia-160m",
    termSimulation: (step, epoch, loss) => `[Eval] Task: ${["arc_challenge", "hellaswag", "mmlu", "truthfulqa_mc"][epoch % 4]} | Few-shot: ${epoch % 5} | Score: ${(0.3 + loss/20).toFixed(4)}`,
    maxEpochs: 20,
    info: {
      title: "Benchmark Evaluation",
      description: "Professional benchmark pipeline and weight/activation analysis.",
      dataset: "HF Open LLM Leaderboard",
      params: "Multiple",
      cpuTime: "~2 hrs",
      keyConcept: "Rigorous Metrics",
      algorithms: ["ECE Calibration", "SVD Weight Analysis", "Few-shot Sensitivity", "Activation Analysis"],
      insight: "Benchmark score alone is meaningless without calibration and statistical significance."
    }
  }
];

export default function DLAlgorithmsDemo() {
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "dl-algorithms");
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  
  const activeModule = MODULES[activeModuleIdx];

  useEffect(() => {
    setLogs([
      "Loading config...",
      "Initializing environment...",
      "Ready."
    ]);
    setIsRunning(false);
  }, [activeModuleIdx]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    let epoch = 1;
    let step = 0;
    let currentLoss = 6.8;
    
    setLogs([`$ ${activeModule.termCommand}`, "Starting..."]);

    const interval = setInterval(() => {
      step += 100;
      currentLoss = currentLoss - (Math.random() * 0.15); 
      if (currentLoss < 1.5) currentLoss = 1.5 + (Math.random() * 0.2); 
      
      const newLog = activeModule.termSimulation(step, epoch, currentLoss);
      
      setLogs(prev => {
        const next = [...prev, newLog];
        return next.length > 50 ? next.slice(next.length - 50) : next;
      });
      
      if (step >= 500) {
        epoch++;
        step = 0;
        if (epoch > activeModule.maxEpochs) {
          setIsRunning(false);
          setLogs(prev => [...prev, "Process complete. Checkpoint saved."]);
          clearInterval(interval);
        }
      }
    }, 600);
    
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
            Explorer
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
                .replace(/\b(class|def|import|from|return|if|else|elif|for|in|while|try|except|with|as|pass|super)\b/g, `<span style="color: ${THEME.keyword}">$1</span>`)
                .replace(/\b(nn\.Module|Tensor|int|float|bool|str|list|dict|tuple)\b/g, `<span style="color: ${THEME.class}">$1</span>`)
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
                <TerminalSquare size={14} /> Terminal
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
                  <Info size={16} style={{ color: THEME.accent }} />
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
                    <p style={{ color: THEME.textMuted }}>Params</p>
                    <p className="font-medium text-white">{activeModule.info.params}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>CPU Time</p>
                    <p className="font-medium text-white">{activeModule.info.cpuTime}</p>
                  </div>
                  <div className="border rounded-md p-2" style={{ borderColor: THEME.border }}>
                    <p style={{ color: THEME.textMuted }}>Concept</p>
                    <p className="font-medium text-white truncate" title={activeModule.info.keyConcept}>{activeModule.info.keyConcept}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.textMuted }}>Key Algorithms</p>
                <ul className="text-xs space-y-1.5" style={{ color: THEME.textMain }}>
                  {activeModule.info.algorithms.map((alg, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: THEME.accent }}></span>
                      <span className="leading-tight">{alg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {!quickStartDone && projectData?.quickStartSteps && projectData.quickStartSteps.length > 0 && (
        <DemoQuickStart projectId="dl-algorithms" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
