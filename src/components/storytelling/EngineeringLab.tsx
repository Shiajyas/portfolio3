"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { DeveloperTerminal } from "@/components/terminal/DeveloperTerminal";
import { soundEngine } from "@/lib/audio";
import {
  Network,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Server,
  Radio,
  FileCheck,
  CheckCircle,
  Terminal,
} from "lucide-react";

interface ArchNode {
  id: string;
  name: string;
  type: "client" | "gateway" | "service" | "cache" | "database" | "relay";
  description: string;
  details: string;
}

const architectures: {
  id: string;
  title: string;
  subtitle: string;
  nodes: ArchNode[];
}[] = [
  {
    id: "vconnect",
    title: "VConnect WebRTC & Socket.IO Flow",
    subtitle: "Real-Time Signaling, Redis Pub/Sub & Coturn Media Relay",
    nodes: [
      {
        id: "v-client",
        name: "React 18 + Zustand Client",
        type: "client",
        description: "Optimistic UI state, RTCPeerConnection API, Socket.IO client.",
        details: "Maintains local audio/video media streams, generates SDP offers/answers, and listens to low-latency websocket push events.",
      },
      {
        id: "v-proxy",
        name: "Nginx Reverse Proxy",
        type: "gateway",
        description: "SSL termination, WebSocket protocol upgrading, rate limiting.",
        details: "Handles incoming HTTPS/WSS connections, passes HTTP REST requests to Express and upgrades websocket handshakes seamlessly.",
      },
      {
        id: "v-server",
        name: "Express.js REST & Signal Hub",
        type: "service",
        description: "JWT validation, room partitioning, SDP offer/answer relay.",
        details: "Clean Architecture backend separating route adapters, business use cases, and repository interfaces.",
      },
      {
        id: "v-redis",
        name: "Redis Pub/Sub & Presence Cache",
        type: "cache",
        description: "Real-time user online states, socket session routing.",
        details: "Enables multi-instance horizontal scaling so socket events reach users connected to different worker processes.",
      },
      {
        id: "v-turn",
        name: "Self-Hosted Coturn TURN Server",
        type: "relay",
        description: "UDP/TCP media packet relay across symmetric NATs.",
        details: "Deployed on AWS EC2. Bridges peer connections when direct STUN handshakes are blocked by enterprise firewalls or mobile carriers.",
      },
    ],
  },
  {
    id: "ai-rag",
    title: "AI-Powered Commerce RAG Pipeline",
    subtitle: "LangGraph State Machine, ChromaDB Vector Search & Ollama LLM",
    nodes: [
      {
        id: "rag-query",
        name: "Natural Language Input",
        type: "client",
        description: "User submits complex multi-turn query about CCTV equipment.",
        details: "Captures natural language inquiries, e.g., 'Compare night-vision ranges of 4K cameras with IP67 rating'.",
      },
      {
        id: "rag-router",
        name: "LangGraph Intent Router",
        type: "service",
        description: "Classifies intent into Product Search, Spec Analysis, or Advice.",
        details: "Determines whether to trigger vector retrieval, database aggregation, or standard conversational memory fallback.",
      },
      {
        id: "rag-vector",
        name: "ChromaDB + BM25 Hybrid Index",
        type: "database",
        description: "Dense vector embeddings + sparse keyword search.",
        details: "Retrieves top-k verified technical chunks with cosine similarity, ensuring zero invented specifications.",
      },
      {
        id: "rag-llm",
        name: "Ollama / Gemini Model Runtime",
        type: "service",
        description: "Context synthesis strictly grounded in verified chunks.",
        details: "Generates structured JSON responses matching real catalog products with prices and exact camera specs.",
      },
    ],
  },
  {
    id: "js-erp",
    title: "JS Informatics ERP Architecture",
    subtitle: "CCTV Inventory, Quotation Engine & 18% GST Calculations",
    nodes: [
      {
        id: "erp-ui",
        name: "Modular Dashboard UI",
        type: "client",
        description: "Tailored for CCTV contractors and security businesses.",
        details: "Handles quotation line items, AMC contract status tracking, technician assignment, and customer directories.",
      },
      {
        id: "erp-domain",
        name: "Quotation & GST Calculator",
        type: "service",
        description: "Calculates BOM line items, labor, CGST 9% and SGST 9%.",
        details: "Implements strict Indian GST regulations, rounding precision, and automated invoice PDF generation.",
      },
      {
        id: "erp-service",
        name: "Installation & Service Ledger",
        type: "service",
        description: "Modeled directly after JS Informatics field service reports.",
        details: "Tracks technician diagnostics, spare parts consumed (cables, connectors, SMPS), and AMC renewal dates.",
      },
      {
        id: "erp-db",
        name: "PostgreSQL & Prisma Storage",
        type: "database",
        description: "Relational integrity, foreign key cascades, and audit logs.",
        details: "Enforces strong schema constraints across products, customers, quotes, and financial invoices.",
      },
    ],
  },
];

export const EngineeringLab: React.FC = () => {
  const [activeArchIndex, setActiveArchIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<ArchNode>(architectures[0].nodes[0]);

  const activeArch = architectures[activeArchIndex];

  const handleSelectArch = (index: number) => {
    soundEngine.playClick();
    setActiveArchIndex(index);
    setSelectedNode(architectures[index].nodes[0]);
  };

  const handleNodeClick = (node: ArchNode) => {
    soundEngine.playNodeSelect();
    setSelectedNode(node);
  };

  return (
    <section id="engineering-lab" className="py-28 px-6 bg-[#1A1A18] text-[#F2EBDD] relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
            Chapter 06 // The Engineering Lab
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EBDD]">
            System Architecture Diagrams & Developer Console
          </h2>
          <p className="text-sm text-[#D9D1C3] leading-relaxed">
            Inspect verified component interaction flows across real-time WebRTC, hybrid RAG pipelines, and ERP workflows. Execute console commands in the interactive developer terminal.
          </p>
        </div>

        {/* SECTION 1: ARCHITECTURE DIAGRAMS */}
        <div className="space-y-8 mb-20">
          {/* Architecture Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#3D3D38]/60 pb-4">
            {architectures.map((arch, idx) => {
              const isSelected = activeArchIndex === idx;
              return (
                <button
                  key={arch.id}
                  onClick={() => handleSelectArch(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-[#E99B3D] text-[#121211] font-bold shadow-md"
                      : "bg-[#252522] text-[#D9D1C3] border border-[#3D3D38] hover:border-[#88847B]"
                  }`}
                >
                  {arch.title.split(" ")[0]} Flow
                </button>
              );
            })}
          </div>

          {/* Active Flow Title */}
          <div>
            <h3 className="text-xl font-display font-bold text-[#F2EBDD]">
              {activeArch.title}
            </h3>
            <p className="text-xs font-mono text-[#E99B3D] mt-0.5">
              {activeArch.subtitle}
            </p>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Visual Node Chain */}
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase text-[#88847B]">
                Interactive Component Flow (Click node to inspect layer)
              </div>
              <div className="space-y-2">
                {activeArch.nodes.map((node, nIdx) => {
                  const isNodeSelected = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`cursor-pointer p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isNodeSelected
                          ? "bg-[#252522] border-[#E99B3D] ring-2 ring-[#E99B3D]/30 shadow-lg scale-[1.01]"
                          : "bg-[#1E1E1B] border-[#3D3D38] hover:border-[#88847B] hover:bg-[#252522]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                            isNodeSelected
                              ? "bg-[#E99B3D] text-[#121211]"
                              : "bg-[#1A1A18] text-[#D9D1C3] border border-[#3D3D38]"
                          }`}
                        >
                          {nIdx + 1}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-[#F2EBDD]">
                            {node.name}
                          </div>
                          <div className="text-[11px] text-[#88847B]">
                            {node.description}
                          </div>
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        className={`transition-colors ${
                          isNodeSelected ? "text-[#E99B3D]" : "text-[#3D3D38]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Inspector Card */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-[#252522] border-2 border-[#E99B3D] shadow-xl space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-0.5 rounded border border-[#E99B3D]/30">
                  Layer Type: {selectedNode.type}
                </span>
                <h4 className="text-xl font-display font-bold text-[#F2EBDD] mt-1">
                  {selectedNode.name}
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-mono text-[#88847B] uppercase text-[10px]">
                  Architectural Role & Function
                </div>
                <p className="text-[#D9D1C3] leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A18] border border-[#3D3D38] space-y-1 text-xs">
                <div className="font-mono text-[#E99B3D] font-bold text-[11px]">
                  Design Implementation Details:
                </div>
                <p className="text-[#A8A49C] leading-relaxed">
                  {selectedNode.details}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: DEVELOPER TERMINAL */}
        <div className="space-y-6 pt-12 border-t border-[#3D3D38]/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E99B3D]">
                <Terminal size={14} />
                <span>Command Line Exploration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F2EBDD] mt-1">
                Technical Command Terminal
              </h3>
            </div>
            <span className="text-xs font-mono text-[#88847B]">
              Accessible CLI: type &apos;help&apos;, &apos;skills&apos;, &apos;projects&apos;, &apos;resume&apos;
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Terminal Window */}
            <div className="lg:col-span-8">
              <DeveloperTerminal />
            </div>

            {/* Quick Accessible Actions Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#252522] border border-[#3D3D38] space-y-4">
              <h4 className="font-display font-bold text-sm text-[#F2EBDD]">
                Prefer standard buttons over CLI?
              </h4>
              <p className="text-xs text-[#88847B] leading-relaxed">
                Click any direct action below to inspect data or download credentials immediately:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <a
                  href="#missions"
                  onClick={() => soundEngine.playClick()}
                  className="w-full p-2.5 rounded-lg bg-[#1A1A18] hover:bg-[#20201D] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] flex items-center justify-between transition-colors block"
                >
                  <span>Explore 6 Flagship Missions</span>
                  <ArrowRight size={13} />
                </a>

                <a
                  href="#skill-tree"
                  onClick={() => soundEngine.playClick()}
                  className="w-full p-2.5 rounded-lg bg-[#1A1A18] hover:bg-[#20201D] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] flex items-center justify-between transition-colors block"
                >
                  <span>Inspect Tech Skill Tree</span>
                  <ArrowRight size={13} />
                </a>

                <a
                  href="#origin"
                  onClick={() => soundEngine.playClick()}
                  className="w-full p-2.5 rounded-lg bg-[#1A1A18] hover:bg-[#20201D] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] flex items-center justify-between transition-colors block"
                >
                  <span>Career & Education Timeline</span>
                  <ArrowRight size={13} />
                </a>

                <a
                  href="/resume/Shijay_AS_Resume.pdf"
                  download="Shijay_AS_Resume.pdf"
                  onClick={() => soundEngine.playClick()}
                  className="w-full p-2.5 rounded-lg bg-[#E99B3D] text-[#121211] font-bold flex items-center justify-between hover:bg-[#D88B2D] transition-colors block"
                >
                  <span>Download Verified Resume (PDF)</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
