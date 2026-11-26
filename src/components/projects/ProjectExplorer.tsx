"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { useGameStore } from "@/stores/gameStore";
import { soundEngine } from "@/lib/audio";
import { DemoShell } from "@/components/demos/DemoShell";
import { VConnectDemo } from "@/components/demos/VConnectDemo";
import { AICommerceDemo } from "@/components/demos/AICommerceDemo";
import { ThinkThankDemo } from "@/components/demos/ThinkThankDemo";
import { ImageGalleryDemo } from "@/components/demos/ImageGalleryDemo";
import { ERPDemo } from "@/components/demos/ERPDemo";
import { GymDemo } from "@/components/demos/GymDemo";
import {
  MonitorPlay,
  Github,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ArrowRight,
} from "lucide-react";

export const ProjectExplorer: React.FC = () => {
  const { activeDemoId, openDemo, closeDemo } = useGameStore();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [demoResetKey, setDemoResetKey] = useState<number>(0);

  const categories = [
    { id: "all", label: "All Flagship Missions" },
    { id: "realtime", label: "Real-Time & WebRTC" },
    { id: "ai", label: "AI & RAG Systems" },
    { id: "business", label: "Enterprise ERP & SaaS" },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "realtime") return p.id === "vconnect";
    if (selectedFilter === "ai") return p.id === "ecommerce-ai";
    if (selectedFilter === "business") return p.id === "js-informatics-erp" || p.id === "gym-saas" || p.id === "thinkthank";
    return true;
  });

  const activeProject = projectsData.find((p) => p.id === activeDemoId);

  const handleResetDemo = () => {
    setDemoResetKey((prev) => prev + 1);
  };

  const renderActiveDemoContent = () => {
    if (!activeProject) return null;
    switch (activeProject.demoType) {
      case "vconnect":
        return <VConnectDemo key={demoResetKey} />;
      case "ai-commerce":
        return <AICommerceDemo key={demoResetKey} />;
      case "thinkthank":
        return <ThinkThankDemo key={demoResetKey} />;
      case "image-gallery":
        return <ImageGalleryDemo key={demoResetKey} />;
      case "erp":
        return <ERPDemo key={demoResetKey} />;
      case "gym":
        return <GymDemo key={demoResetKey} />;
      default:
        return <div>Demo under construction</div>;
    }
  };

  return (
    <section id="missions" className="py-28 px-6 bg-[#121211] text-[#F2EBDD] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E99B3D]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
              Chapter 05 // The Missions
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EBDD]">
              Flagship Engineering Projects & Interactive Demos
            </h2>
            <p className="text-sm text-[#D9D1C3] leading-relaxed">
              Explore 6 production-grade full-stack architectures. Launch embedded interactive sandboxes directly within the portfolio without navigating away.
            </p>
          </div>

          <div className="text-xs font-mono text-[#88847B] bg-[#1A1A18] border border-[#3D3D38] px-4 py-2 rounded-xl">
            <span>Embedded Sandboxes: </span>
            <span className="text-[#E99B3D] font-bold">6 / 6 Operational</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[#3D3D38]/60">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedFilter(c.id);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                selectedFilter === c.id
                  ? "bg-[#E99B3D] text-[#121211] font-bold shadow-md"
                  : "bg-[#1A1A18] text-[#D9D1C3] border border-[#3D3D38] hover:border-[#88847B]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Project Missions List */}
        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`mission-${project.id}`}
              className="p-6 sm:p-10 rounded-2xl bg-[#1A1A18] border border-[#3D3D38] hover:border-[#E99B3D]/60 transition-all shadow-xl space-y-8 relative group"
            >
              {/* Mission Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#3D3D38]/60 pb-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#121211] bg-[#E99B3D] font-bold px-2 py-0.5 rounded">
                      MISSION {project.number}
                    </span>
                    <span className="text-xs font-mono text-[#D9D1C3] bg-[#252522] border border-[#3D3D38] px-2.5 py-0.5 rounded">
                      {project.category}
                    </span>
                    {project.id === "js-informatics-erp" && (
                      <span className="text-[10px] font-mono text-[#E99B3D] bg-[#E99B3D]/10 border border-[#E99B3D]/30 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                        Flagship ERP
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F2EBDD] group-hover:text-[#E99B3D] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm font-sans text-[#E4DCCB] leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* CTAs: Embedded Demo Launcher & Links */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => openDemo(project.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    <MonitorPlay size={15} />
                    <span>Launch Embedded Demo</span>
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      className="p-3 rounded-xl bg-[#252522] hover:bg-[#33332E] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
                      title="Inspect GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      className="p-3 rounded-xl bg-[#252522] hover:bg-[#33332E] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
                      title="Visit Live Application"
                      aria-label="Live Application"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Summary & Role Description */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs leading-relaxed">
                <div className="lg:col-span-6 space-y-3">
                  <div className="font-mono uppercase text-[#88847B] text-[11px] tracking-wider">
                    Project Overview
                  </div>
                  <p className="text-[#D9D1C3] text-sm">
                    {project.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
                    <span className="font-mono text-[#E99B3D] font-bold block text-[11px]">
                      My Engineering Role & Contribution:
                    </span>
                    <p className="text-[#A8A49C] text-xs">
                      {project.roleDescription}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div className="font-mono uppercase text-[#88847B] text-[11px] tracking-wider">
                    Key Features & Implementations
                  </div>
                  <div className="space-y-2">
                    {project.keyFeatures.slice(0, 5).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D9D1C3]">
                        <CheckCircle2 size={14} className="text-[#E99B3D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engineering Challenges & Solutions */}
              <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E99B3D] font-bold">
                  <Cpu size={14} />
                  <span>Engineering Challenges & Architectural Solutions</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.engineeringChallenges.map((chal, cIdx) => (
                    <div key={cIdx} className="text-xs text-[#A8A49C] leading-relaxed p-3 rounded-lg bg-[#1A1A18] border border-[#3D3D38]/60">
                      {chal}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#88847B]">
                  Verified Technology Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-[#252522] border border-[#3D3D38] text-[#D9D1C3]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Embedded Demo Modal */}
      {activeDemoId && activeProject && (
        <DemoShell
          title={activeProject.title}
          category={activeProject.category}
          onClose={closeDemo}
          onReset={handleResetDemo}
        >
          {renderActiveDemoContent()}
        </DemoShell>
      )}
    </section>
  );
};
