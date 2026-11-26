"use client";

import React, { useState } from "react";
import { skillNodes } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { useGameStore } from "@/stores/gameStore";
import { soundEngine } from "@/lib/audio";
import { SkillNode } from "@/types";
import { Sparkles, Network, ArrowRight, ExternalLink, X, CheckCircle, Layers } from "lucide-react";

export const SkillTree: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { selectedSkill, setSelectedSkill, discoveredSkills } = useGameStore();

  const categories = [
    { id: "all", label: "All Disciplines" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Databases" },
    { id: "realtime", label: "Real-Time" },
    { id: "ai", label: "AI & RAG" },
    { id: "devops", label: "Cloud & DevOps" },
  ];

  const filteredNodes =
    selectedCategory === "all"
      ? skillNodes
      : skillNodes.filter((node) => node.category === selectedCategory);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedSkill(node);
  };

  const jumpToProject = (projectId: string) => {
    soundEngine.playClick();
    setSelectedSkill(null);
    const projEl = document.querySelector(`#mission-${projectId}`) || document.querySelector("#missions");
    if (projEl) {
      projEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="skill-tree" className="py-28 px-6 bg-[#1A1A18] text-[#F2EBDD] relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
              Chapter 04 // The Skill Tree
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EBDD]">
              Interactive Technology Matrix
            </h2>
            <p className="text-sm text-[#D9D1C3] leading-relaxed">
              Explore technologies, architectural roles, and associated projects. Click any node to inspect implementation context.
            </p>
          </div>

          {/* Discovered Counter */}
          <div className="flex items-center gap-3 bg-[#252522] border border-[#3D3D38] px-4 py-2.5 rounded-xl text-xs font-mono shrink-0">
            <Network size={16} className="text-[#E99B3D]" />
            <div>
              <span className="text-[#88847B]">Nodes Discovered: </span>
              <span className="text-[#E99B3D] font-bold">
                {discoveredSkills.size} / {skillNodes.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#3D3D38]/60">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? "bg-[#E99B3D] text-[#121211] font-bold shadow-md"
                    : "bg-[#252522] text-[#D9D1C3] border border-[#3D3D38] hover:border-[#88847B]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid of Skill Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNodes.map((node) => {
            const isDiscovered = discoveredSkills.has(node.id);
            const isSelected = selectedSkill?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNodeClick(node);
                  }
                }}
                className={`cursor-pointer p-4 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#252522] border-[#E99B3D] ring-2 ring-[#E99B3D]/30 shadow-xl scale-[1.02]"
                    : "bg-[#1E1E1B] border-[#3D3D38] hover:border-[#E99B3D]/60 hover:bg-[#252522]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-0.5 rounded border border-[#E99B3D]/20">
                      {node.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#88847B] border border-[#3D3D38] px-1.5 py-0.5 rounded">
                      {node.experienceLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-[#F2EBDD] group-hover:text-[#E99B3D] transition-colors">
                    {node.name}
                  </h3>

                  <p className="text-xs text-[#88847B] line-clamp-2 mt-1">
                    {node.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3D3D38]/50 flex items-center justify-between text-[11px] font-mono text-[#88847B]">
                  <span>
                    {node.relatedProjectIds.length} Project{node.relatedProjectIds.length > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1 text-[#E99B3D] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Detail Inspector Drawer / Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 bg-[#121211]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#252522] border-2 border-[#E99B3D] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-scale-up space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-[#1A1A18] text-[#88847B] hover:text-[#F2EBDD] border border-[#3D3D38]"
                aria-label="Close Inspector"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-0.5 rounded border border-[#E99B3D]/30">
                    {selectedSkill.category}
                  </span>
                  <span className="text-xs font-mono text-[#D9D1C3] bg-[#1A1A18] px-2 py-0.5 rounded border border-[#3D3D38]">
                    Experience: {selectedSkill.experienceLevel}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F2EBDD]">
                  {selectedSkill.name}
                </h3>
              </div>

              {/* Description & Context */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-[#88847B]">
                  Technical Role & Purpose
                </div>
                <p className="text-sm text-[#D9D1C3] leading-relaxed">
                  {selectedSkill.description}
                </p>
                <div className="p-4 rounded-xl bg-[#1A1A18] border border-[#3D3D38] text-xs text-[#A8A49C] leading-relaxed">
                  <span className="text-[#E99B3D] font-mono font-bold block mb-1">
                    Implementation Context:
                  </span>
                  {selectedSkill.context}
                </div>
              </div>

              {/* Related Projects */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-[#88847B]">
                  Applied In Missions (Projects)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSkill.relatedProjectIds.map((projId) => {
                    const proj = projectsData.find((p) => p.id === projId);
                    if (!proj) return null;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => jumpToProject(proj.id)}
                        className="p-3 rounded-lg bg-[#1A1A18] border border-[#3D3D38] hover:border-[#E99B3D] text-left transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-display font-bold text-[#F2EBDD] group-hover:text-[#E99B3D]">
                            {proj.title}
                          </div>
                          <div className="text-[10px] font-mono text-[#88847B]">
                            {proj.category}
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-[#88847B] group-hover:text-[#E99B3D]" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Companion Connections */}
              <div className="space-y-2 pt-2 border-t border-[#3D3D38]">
                <div className="text-xs font-mono uppercase text-[#88847B]">
                  Connected Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.connections.map((connId) => (
                    <span
                      key={connId}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-[#1A1A18] text-[#D9D1C3] border border-[#3D3D38]"
                    >
                      {connId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
