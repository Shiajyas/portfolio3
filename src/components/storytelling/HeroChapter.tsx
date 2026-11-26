"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { PortalScene } from "@/components/three/PortalScene";
import { soundEngine } from "@/lib/audio";
import { ArrowDown, Github, Linkedin, Code2, FileDown, Sparkles } from "lucide-react";

export const HeroChapter: React.FC = () => {
  const scrollToOrigin = () => {
    soundEngine.playClick();
    const originEl = document.querySelector("#origin");
    if (originEl) {
      originEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMissions = () => {
    soundEngine.playClick();
    const missionsEl = document.querySelector("#missions");
    if (missionsEl) {
      missionsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="entrance"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden bg-[#121211]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E99B3D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-charcoal-grain opacity-60 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-10">
        {/* Left Column: Editorial Typography & Positioning */}
        <div className="lg:col-span-7 space-y-6">
          {/* Chapter Metadata & Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30">
              Chapter 01 // The Entrance
            </span>
            {profileData.availableForOpportunities && (
              <span className="flex items-center gap-2 font-mono text-xs text-[#D9D1C3] bg-[#252522] border border-[#3D3D38] px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{profileData.availabilityNote}</span>
              </span>
            )}
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-[#F2EBDD] leading-[1.05]">
              I TURN IDEAS INTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EBDD] via-[#E99B3D] to-[#F5A623]">
                WORKING SOFTWARE.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#D9D1C3] max-w-xl font-sans leading-relaxed">
            {profileData.subheadline}
          </p>

          {/* Brief honest narrative positioning */}
          <div className="p-4 rounded-xl bg-[#1A1A18]/80 border border-[#3D3D38]/80 max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E99B3D]">
              <Sparkles size={14} />
              <span>Full-Stack Architecture & AI Integration</span>
            </div>
            <p className="text-xs text-[#88847B] leading-relaxed">
              Synthesizing systems engineering, real-time WebRTC communications, RAG agent pipelines, and enterprise ERP software built on Clean Architecture and SOLID foundations.
            </p>
          </div>

          {/* CTAs & Social Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToMissions}
              className="px-6 py-3.5 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Explore Missions (Projects)</span>
            </button>

            <a
              href={profileData.resumeUrl}
              download="Shijay_AS_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="px-5 py-3.5 rounded-xl bg-[#252522] hover:bg-[#33332E] text-[#F2EBDD] border border-[#3D3D38] font-mono text-xs font-medium tracking-wide transition-all flex items-center gap-2"
            >
              <FileDown size={14} className="text-[#E99B3D]" />
              <span>Download Resume</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1A1A18] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D]/50 transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1A1A18] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D]/50 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={profileData.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1A1A18] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D]/50 transition-all"
                aria-label="LeetCode Profile"
              >
                <Code2 size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Portal Sculpture */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
          <div className="w-full h-full relative">
            <PortalScene />
            {/* Interactive hint */}
            <div className="absolute bottom-2 right-4 px-3 py-1 rounded bg-[#1A1A18]/80 border border-[#3D3D38] text-[10px] font-mono text-[#88847B] pointer-events-none">
              Interactive 3D Portal // Drag or Hover
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll-To-Explore Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-[#88847B] border-t border-[#252522] relative z-10">
        <div className="flex items-center gap-4">
          <span>COORDINATES: 10.5276° N, 76.2144° E</span>
          <span className="hidden sm:inline text-[#3D3D38]">|</span>
          <span className="hidden sm:inline text-[#D9D1C3]">THRISSUR, KERALA</span>
        </div>

        <button
          onClick={scrollToOrigin}
          className="flex items-center gap-2 text-[#D9D1C3] hover:text-[#E99B3D] transition-colors group"
        >
          <span>Scroll to explore Chapter 02</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
