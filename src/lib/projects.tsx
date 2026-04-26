import { Project } from "@/types";
import React from "react";

export const projects: Project[] = [
  {
    id: "e-commerce-engine",
    batchId: "BATCH_01",
    title: "E-Commerce Core",
    description: "High-performance headless commerce engine.",
    longDescription: "A sophisticated headless commerce solution built for scale. Focuses on atomic consistency, real-time inventory management, and sub-100ms response times for global storefronts.",
    techStack: ["Next.js", "Redis", "PostgreSQL", "Stripe", "Framer Motion"],
    stats: {
      nodes: 1240,
      complexity: "O(log N)"
    },
    walkthroughSteps: [
      {
        title: "Product Discovery",
        description: "Optimized faceted search and real-time filtering logic.",
        mockState: (
          <div className="w-full max-w-md space-y-4">
            <div className="h-10 bg-zinc-900 border border-zinc-800 rounded flex items-center px-4 text-zinc-500 text-xs font-mono">
              Search artifacts...
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded" />
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        title: "Atomic Checkout",
        description: "Ensuring transaction integrity during high-concurrency events.",
        mockState: (
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <span className="font-mono text-xs uppercase text-zinc-500">Subtotal</span>
              <span className="font-bold font-mono">$1,240.00</span>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded animate-pulse w-2/3" />
            </div>
            <button className="w-full py-3 bg-brand-orange text-black font-bold uppercase text-xs tracking-tighter">
              Execute_Transaction
            </button>
          </div>
        )
      },
      {
        title: "Inventory Sync",
        description: "WebSocket-driven updates across global edge nodes.",
        mockState: (
          <div className="w-full max-w-md bg-black border border-zinc-800 p-4 font-mono">
            <div className="flex items-center gap-2 mb-4 text-green-500 text-[10px]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              STREAMS_ACTIVE: 4 nodes synchronized
            </div>
            <div className="space-y-1">
              {[
                { l: "LDN-1", v: "84 units" },
                { l: "NYC-4", v: "82 units" },
                { l: "TKY-2", v: "84 units" },
                { l: "SGP-1", v: "84 units" }
              ].map(n => (
                <div key={n.l} className="flex justify-between text-[10px] text-zinc-400 border-b border-zinc-900 py-1">
                  <span>NODE_{n.l}</span>
                  <span className="text-white">{n.v}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }
    ]
  }
];

export function getProjectById(id: string) {
  return projects.find(p => p.id === id);
}
