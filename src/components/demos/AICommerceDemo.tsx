"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { formatINR } from "@/lib/utils";
import {
  Send,
  Bot,
  Sparkles,
  Database,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCircle2,
  Cpu,
} from "lucide-react";

interface SampleProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  specs: string;
  resolution: string;
  matchScore: number;
}

const mockCatalog: SampleProduct[] = [
  {
    id: "p1",
    name: "Hikvision 4K UltraHD ColorVu Bullet Camera",
    category: "Outdoor CCTV",
    price: 4850,
    specs: "F1.0 Super Aperture, 40m White Light Night Vision, IP67 Weatherproof, Built-in Mic",
    resolution: "8MP (3840 x 2160)",
    matchScore: 98,
  },
  {
    id: "p2",
    name: "CP Plus 5MP Full-Color Starlight Dome Camera",
    category: "Indoor / Dome",
    price: 2650,
    specs: "Starlight low-light sensor, 30m IR, audio over coaxial cable, metal casing",
    resolution: "5MP (2560 x 1920)",
    matchScore: 89,
  },
  {
    id: "p3",
    name: "Dahua 8-Channel 4K AI WizSense NVR",
    category: "NVR Recorders",
    price: 8900,
    specs: "H.265+ decoding, 8 PoE ports, face recognition, perimeter protection AI",
    resolution: "Up to 12MP decoding",
    matchScore: 94,
  },
  {
    id: "p4",
    name: "Seagate SkyHawk 4TB Surveillance Hard Drive",
    category: "Surveillance Storage",
    price: 7400,
    specs: "24x7 workload rating, 1M hours MTBF, ImagePerfect firmware for zero frame drops",
    resolution: "N/A",
    matchScore: 82,
  },
];

interface ChatTurn {
  sender: "user" | "assistant";
  text: string;
  intent?: string;
  ragChunks?: string[];
  products?: SampleProduct[];
}

export const AICommerceDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      sender: "assistant",
      text: "Hello! I am your AI Hardware Assistant. You can ask me for product recommendations, compare technical specs (e.g. night-vision range, NVR channels), or ask about surveillance storage.",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    "Recommend a 4K outdoor night-vision camera for a boundary wall",
    "What is the best 8-channel NVR with AI perimeter protection?",
    "Do you have a dedicated surveillance HDD with 24x7 reliability?",
  ];

  const handleQuery = (query: string) => {
    if (!query.trim() || isProcessing) return;
    soundEngine.playClick();
    setIsProcessing(true);

    const userTurn: ChatTurn = { sender: "user", text: query };
    setMessages((prev) => [...prev, userTurn]);
    setInputQuery("");

    // Simulate LangGraph multi-step reasoning
    setTimeout(() => {
      soundEngine.playNodeSelect();
      let matchedIntent = "PRODUCT_RECOMMENDATION";
      let relevantProducts = mockCatalog.slice(0, 2);
      let answerText = "";
      let retrievedChunks = [
        "Chunk #1: Hikvision ColorVu F1.0 aperture produces 24/7 full-color video even in 0 lux darkness.",
        "Chunk #2: Dahua WizSense NVR provides AI perimeter protection with false-alarm filtering for humans/vehicles.",
      ];

      const qLower = query.toLowerCase();
      if (qLower.includes("nvr") || qLower.includes("recorder") || qLower.includes("channel")) {
        matchedIntent = "HARDWARE_SPEC_ANALYSIS";
        relevantProducts = [mockCatalog[2]];
        answerText =
          "Based on your requirements, the Dahua 8-Channel 4K WizSense NVR is ideal. It features built-in PoE ports, H.265+ compression to save up to 70% storage, and onboard AI perimeter protection.";
      } else if (qLower.includes("hdd") || qLower.includes("hard drive") || qLower.includes("storage")) {
        matchedIntent = "STORAGE_RECOMMENDATION";
        relevantProducts = [mockCatalog[3]];
        answerText =
          "For 24/7 continuous surveillance recording, desktop hard drives fail quickly. We recommend the Seagate SkyHawk 4TB with ImagePerfect firmware designed specifically for NVR/DVR continuous write cycles.";
      } else {
        matchedIntent = "PERIMETER_SURVEILLANCE_SEARCH";
        relevantProducts = [mockCatalog[0], mockCatalog[1]];
        answerText =
          "For an outdoor boundary wall, you need high weather resistance and strong night-vision. The Hikvision 4K UltraHD ColorVu Bullet is the highest rated match with IP67 rating and full-color 40m night illumination.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: answerText,
          intent: matchedIntent,
          ragChunks: retrievedChunks,
          products: relevantProducts,
        },
      ]);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Notice Banner */}
      <div className="p-3 rounded-xl bg-[#252522] border border-[#E99B3D]/30 flex items-center justify-between text-xs font-mono text-[#D9D1C3]">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-[#E99B3D]" />
          <span>LangGraph + ChromaDB Vector RAG Pipeline Simulator</span>
        </div>
        <span className="text-[10px] text-[#88847B] hidden sm:inline">
          Local Mock Inference // No External API Key Required
        </span>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-[#88847B]">Try queries:</span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(p)}
            className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-[#1A1A18] hover:bg-[#252522] text-[#D9D1C3] border border-[#3D3D38] hover:border-[#E99B3D] transition-all text-left truncate max-w-xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat & Reasoning Container */}
      <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] flex flex-col overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((turn, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                turn.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-2xl p-4 rounded-xl text-xs space-y-3 ${
                  turn.sender === "user"
                    ? "bg-[#E99B3D] text-[#121211] font-medium"
                    : "bg-[#252522] text-[#F2EBDD] border border-[#3D3D38]"
                }`}
              >
                {/* Header for assistant */}
                {turn.sender === "assistant" && (
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#E99B3D]">
                    <Sparkles size={12} />
                    <span>AI Shopping Assistant</span>
                  </div>
                )}

                <p className="leading-relaxed">{turn.text}</p>

                {/* If RAG metadata exists */}
                {turn.intent && (
                  <div className="pt-2 border-t border-[#3D3D38] space-y-2 text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-[#E99B3D]">
                      <Cpu size={12} />
                      <span>Classified Intent: {turn.intent}</span>
                    </div>

                    {turn.ragChunks && (
                      <div className="bg-[#1A1A18] p-2.5 rounded border border-[#3D3D38] space-y-1 text-[#88847B]">
                        <div className="text-[10px] uppercase font-bold text-[#D9D1C3]">
                          Retrieved ChromaDB Context Chunks (Top Similarity):
                        </div>
                        {turn.ragChunks.map((chunk, cIdx) => (
                          <div key={cIdx} className="text-[10px]">
                            • {chunk}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Recommended Product Cards */}
                {turn.products && turn.products.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-mono text-[#D9D1C3] font-bold">
                      Recommended Products from Verified Catalog:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {turn.products.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-3 rounded-lg bg-[#121211] border border-[#3D3D38] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#E99B3D]">
                              {prod.category}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              {prod.matchScore}% match
                            </span>
                          </div>
                          <div className="font-display font-bold text-xs text-[#F2EBDD]">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-[#88847B]">{prod.specs}</div>
                          <div className="pt-1 flex items-center justify-between font-mono text-xs">
                            <span className="text-[#E99B3D] font-bold">
                              {formatINR(prod.price)}
                            </span>
                            <span className="text-[10px] text-[#A8A49C]">{prod.resolution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 p-3 bg-[#252522] rounded-xl border border-[#3D3D38] text-xs font-mono text-[#E99B3D] max-w-sm">
              <span className="w-2 h-2 rounded-full bg-[#E99B3D] animate-ping" />
              <span>LangGraph state machine synthesizing ChromaDB context...</span>
            </div>
          )}
        </div>

        {/* Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(inputQuery);
          }}
          className="p-3 bg-[#252522] border-t border-[#3D3D38] flex gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AI shopping assistant about cameras, storage, or NVRs..."
            className="flex-1 bg-[#1A1A18] border border-[#3D3D38] rounded-lg px-3 py-2 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-mono"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] text-xs font-bold disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
