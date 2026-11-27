"use client";

import React, { useState, useEffect } from "react";
import { profileData } from "@/data/profile";
import { chapters } from "@/data/navigation";
import { useGameStore } from "@/stores/gameStore";
import { soundEngine } from "@/lib/audio";
import { Volume2, VolumeX, FileDown, Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, toggleSound, currentChapter } = useGameStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (anchor: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1A1A18]/90 backdrop-blur-md border-b border-[#3D3D38]/60 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Identity */}
          <a
            href="#entrance"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#entrance");
            }}
            className="group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded bg-[#E99B3D] text-[#121211] font-mono font-bold flex items-center justify-center text-sm tracking-tighter shadow-md group-hover:scale-105 transition-transform">
              SA
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base text-[#F2EBDD] tracking-tight group-hover:text-[#E99B3D] transition-colors">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono text-[#88847B] tracking-wider uppercase">
                Full-Stack JS & AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {chapters.map((ch) => {
              const isActive = currentChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleNavClick(ch.anchor)}
                  className={`text-xs font-mono uppercase tracking-wider transition-colors py-1 relative ${
                    isActive
                      ? "text-[#E99B3D] font-semibold"
                      : "text-[#D9D1C3]/80 hover:text-[#F2EBDD]"
                  }`}
                >
                  <span className="opacity-40 mr-1">{ch.number}</span>
                  {ch.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E99B3D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Opportunities indicator */}
            {/* {profileData.availableForOpportunities && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E99B3D]/10 border border-[#E99B3D]/30 text-[#E99B3D] text-xs font-mono"
                title={profileData.availabilityNote}
              >
                <span className="w-2 h-2 rounded-full bg-[#E99B3D] animate-ping" />
                <span className="hidden xl:inline text-[11px]">Available for Roles</span>
              </div>
            )} */}

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled
                  ? "bg-[#E99B3D]/20 border-[#E99B3D] text-[#E99B3D]"
                  : "bg-[#252522] border-[#3D3D38] text-[#88847B] hover:text-[#F2EBDD]"
              }`}
              title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio (Web Audio)"}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Resume Download CTA */}
            <a
              href={profileData.resumeUrl}
              download="Shijay_AS_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95"
            >
              <FileDown size={14} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu & Sound Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleSound}
              className={`p-2 rounded border ${
                soundEnabled
                  ? "bg-[#E99B3D]/20 border-[#E99B3D] text-[#E99B3D]"
                  : "bg-[#252522] border-[#3D3D38] text-[#88847B]"
              }`}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#252522] border border-[#3D3D38] text-[#F2EBDD]"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#121211]/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#88847B] mb-2">
              Chapters Index
            </div>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleNavClick(ch.anchor)}
                className="w-full text-left py-3 border-b border-[#3D3D38]/50 flex items-center justify-between text-base font-display font-medium text-[#F2EBDD]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#E99B3D]">{ch.number}</span>
                  <span>{ch.title}</span>
                </div>
                <ArrowUpRight size={16} className="text-[#88847B]" />
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-[#3D3D38]">
            <a
              href={profileData.resumeUrl}
              download="Shijay_AS_Resume.pdf"
              className="w-full py-3 rounded-lg bg-[#E99B3D] text-[#121211] font-mono text-center font-bold text-sm flex items-center justify-center gap-2"
            >
              <FileDown size={16} />
              Download Full Resume (PDF)
            </a>
            <div className="text-center text-xs font-mono text-[#88847B]">
              {profileData.location}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
