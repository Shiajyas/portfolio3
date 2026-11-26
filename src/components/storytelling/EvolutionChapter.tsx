"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/skills";
import { soundEngine } from "@/lib/audio";
import { Layout, Server, Database, Radio, Cpu, Cloud, ArrowRight, ShieldCheck } from "lucide-react";

export const EvolutionChapter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout size={20} />;
      case "Server":
        return <Server size={20} />;
      case "Database":
        return <Database size={20} />;
      case "Radio":
        return <Radio size={20} />;
      case "Cpu":
        return <Cpu size={20} />;
      case "Cloud":
        return <Cloud size={20} />;
      default:
        return <Server size={20} />;
    }
  };

  const handleSelect = (id: string) => {
    soundEngine.playClick();
    setActiveCategory(id);
  };

  const scrollToSkillTree = () => {
    soundEngine.playClick();
    const treeEl = document.querySelector("#skill-tree");
    if (treeEl) {
      treeEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="evolution" className="py-28 px-6 bg-[#121211] text-[#F2EBDD] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E99B3D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
            Chapter 03 // The Evolution
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EBDD]">
            Engineering Progression Across 6 Core Pillars
          </h2>
          <p className="text-base text-[#D9D1C3] leading-relaxed">
            From building reactive user interfaces to orchestrating distributed WebRTC relay infrastructure and agentic RAG retrieval systems. Progression represents practical, verified problem-solving experience across production stacks.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#88847B]">
            <ShieldCheck size={14} className="text-[#E99B3D]" />
            <span>Honest representation: experience depth rooted in real codebases, without fabricated percentage meters.</span>
          </div>
        </div>

        {/* 6 Category Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const isSelected = cat.id === activeCategory;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#252522] border-[#E99B3D] shadow-2xl scale-[1.02]"
                    : "bg-[#1A1A18] border-[#3D3D38] hover:border-[#88847B] hover:bg-[#20201D]"
                }`}
              >
                {/* Progression Stage Number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#E99B3D] text-[#121211]"
                        : "bg-[#252522] text-[#E99B3D] group-hover:bg-[#E99B3D]/20"
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="font-mono text-xs text-[#88847B]">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-[#F2EBDD] group-hover:text-[#E99B3D] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-mono text-[#E99B3D]">
                    {cat.subtitle}
                  </div>
                  <p className="text-xs text-[#A8A49C] leading-relaxed pt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Footer connection link */}
                <div className="pt-6 mt-4 border-t border-[#3D3D38]/50 flex items-center justify-between text-xs font-mono text-[#88847B]">
                  <span>Status: Active Exploration</span>
                  <span className={`flex items-center gap-1 ${isSelected ? "text-[#E99B3D]" : "text-[#88847B]"}`}>
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation jump into Chapter 04 */}
        <div className="mt-14 p-6 rounded-2xl bg-[#1A1A18] border border-[#3D3D38] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-display font-bold text-base text-[#F2EBDD]">
              Explore the Technology Matrix in Chapter 04
            </div>
            <div className="text-xs font-mono text-[#88847B]">
              Inspect all 20+ technology nodes, project associations, and architectural roles.
            </div>
          </div>

          <button
            onClick={scrollToSkillTree}
            className="px-5 py-2.5 rounded-xl bg-[#E99B3D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#D88B2D] transition-all shrink-0 flex items-center gap-2"
          >
            <span>Open Skill Tree</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
