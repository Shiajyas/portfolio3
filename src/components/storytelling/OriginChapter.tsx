"use client";

import React, { useState } from "react";
import Image from "next/image";
import { timelineData } from "@/data/experience";
import { soundEngine } from "@/lib/audio";
import { Milestone, BookOpen, Wrench, Terminal, CheckCircle2 } from "lucide-react";

export const OriginChapter: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>(timelineData[timelineData.length - 1].id);

  const handleSelect = (id: string) => {
    soundEngine.playClick();
    setSelectedMilestone(id);
  };

  const activeItem = timelineData.find((t) => t.id === selectedMilestone) || timelineData[0];

  const getIconForType = (type: string) => {
    switch (type) {
      case "education":
        return <BookOpen size={16} className="text-[#E99B3D]" />;
      case "experience":
        return <Wrench size={16} className="text-[#E99B3D]" />;
      case "transition":
        return <Terminal size={16} className="text-[#E99B3D]" />;
      default:
        return <Milestone size={16} className="text-[#E99B3D]" />;
    }
  };

  return (
    <section id="origin" className="py-28 px-6 bg-[#1A1A18] text-[#F2EBDD] relative overflow-hidden">
      {/* Background grain & ambient glow */}
      <div className="absolute inset-0 bg-charcoal-grain opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#E99B3D]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
            Chapter 02 // The Origin
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F2EBDD]">
            From Hardware Foundations to Software Architecture
          </h2>
          <p className="text-base sm:text-lg text-[#D9D1C3] leading-relaxed italic border-l-2 border-[#E99B3D] pl-4">
            &ldquo;My journey into technology began with curiosity about computers and how things work. My background in Electronics and Communication gave me an appreciation for systems, physical constraints, and practical problem-solving. Over time, I moved towards software engineering and began building applications that solve real problems.&rdquo;
          </p>
        </div>

        {/* Narrative & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Narrative Context */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#3D3D38] bg-[#252522] shadow-2xl p-3">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#121211]">
                <Image
                  src="/images/profile.jpeg"
                  alt="Shijay AS - Full-Stack Developer"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F2EBDD]">
                  <span className="bg-[#121211]/80 px-2 py-1 rounded border border-[#3D3D38]">
                    Shijay AS
                  </span>
                  <span className="text-[#E99B3D]">Full-Stack Developer</span>
                </div>
              </div>

              {/* Verified Education & Credentials summary */}
              <div className="mt-4 p-4 rounded-xl bg-[#121211]/60 border border-[#3D3D38]/50 space-y-2 text-xs">
                <div className="font-mono text-[#E99B3D] uppercase text-[10px] tracking-wider">
                  Verified Academic Credentials
                </div>
                <div className="text-[#D9D1C3]">
                  • Advanced Web Dev (MERN & AI Integration) — Brototype (2023–Present)
                </div>
                <div className="text-[#D9D1C3]">
                  • Diploma in Electronics & Communication — Govt. ITI Chalakudy (2018–2020)
                </div>
                <div className="text-[#D9D1C3]">
                  • HSE Computer Science — Sreekrishna Govt. HSS, Guruvayoor (2014–2016)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Timeline & Milestone Inspector */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#88847B] flex items-center justify-between">
              <span>Timeline Milestones</span>
              <span>Click a stage to inspect</span>
            </div>

            {/* Timeline selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timelineData.map((item) => {
                const isSelected = item.id === selectedMilestone;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#252522] border-[#E99B3D] text-[#F2EBDD] shadow-md"
                        : "bg-[#1A1A18] border-[#3D3D38] text-[#88847B] hover:text-[#D9D1C3] hover:border-[#88847B]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-[#E99B3D]">{item.year.split(" ")[0]}</span>
                      {getIconForType(item.type)}
                    </div>
                    <div className="text-xs font-display font-bold truncate">{item.title}</div>
                    <div className="text-[10px] text-[#88847B] truncate">{item.organization}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Detail View */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#252522] border border-[#3D3D38] shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3D38] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-0.5 rounded border border-[#E99B3D]/30">
                      {activeItem.year}
                    </span>
                    <span className="text-xs font-mono text-[#88847B]">
                      {activeItem.period}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F2EBDD] mt-1">
                    {activeItem.title}
                  </h3>
                  <div className="text-xs font-mono text-[#D9D1C3]">
                    {activeItem.organization} // {activeItem.location}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#1A1A18] border border-[#3D3D38] flex items-center justify-center">
                  {getIconForType(activeItem.type)}
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-[#D9D1C3] leading-relaxed">
                {activeItem.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#88847B]">
                  Key Engineering Milestones & Takeaways
                </div>
                <div className="space-y-2">
                  {activeItem.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A8A49C]">
                      <CheckCircle2 size={14} className="text-[#E99B3D] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Domains & Skills */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                {activeItem.skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#1A1A18] border border-[#3D3D38] text-[#D9D1C3]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
