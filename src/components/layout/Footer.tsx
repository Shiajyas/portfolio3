"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { useGameStore } from "@/stores/gameStore";
import { Github, Linkedin, Code2, Mail, Phone, MapPin, Sparkles, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { triggerEasterEgg, easterEggFound } = useGameStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#121211] border-t border-[#3D3D38] text-[#88847B] pt-16 pb-12 overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#252522]">
          {/* Identity col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#E99B3D] text-[#121211] font-mono font-bold flex items-center justify-center text-xs">
                SA
              </div>
              <span className="font-display font-bold text-lg text-[#F2EBDD]">
                {profileData.name}
              </span>
            </div>
            <p className="text-sm text-[#A8A49C] leading-relaxed max-w-sm">
              Full-Stack JavaScript Developer building intelligent applications, WebRTC communications, and domain-driven business software.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[#D9D1C3]">
                {profileData.availabilityNote}
              </span>
            </div>
          </div>

          {/* Contact col */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[#F2EBDD] font-display font-semibold text-sm mb-4">
              Direct Contact
            </div>
            <div className="flex items-center gap-2.5 text-[#D9D1C3]">
              <Mail size={14} className="text-[#E99B3D]" />
              <a href={`mailto:${profileData.email}`} className="hover:text-[#E99B3D] transition-colors">
                {profileData.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[#D9D1C3]">
              <Phone size={14} className="text-[#E99B3D]" />
              <a href={`tel:${profileData.phone}`} className="hover:text-[#E99B3D] transition-colors">
                {profileData.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[#88847B]">
              <MapPin size={14} className="text-[#E99B3D]" />
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Social Profiles & Easter Egg */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#F2EBDD] font-display font-semibold text-sm mb-4">
              Profiles & Code
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
              >
                <Github size={14} />
                <span>github.com/Shiajyas</span>
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
              >
                <Linkedin size={14} />
                <span>linkedin.com/in/shijay-as</span>
              </a>
              <a
                href={profileData.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
              >
                <Code2 size={14} />
                <span>leetcode.com/u/shijaychachu</span>
              </a>
            </div>

            {/* Secret Easter Egg Rune */}
            <div className="pt-3">
              <button
                onClick={triggerEasterEgg}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                  easterEggFound
                    ? "bg-[#E99B3D]/10 border-[#E99B3D] text-[#E99B3D]"
                    : "border-[#3D3D38] text-[#88847B] hover:text-[#E99B3D] hover:border-[#E99B3D]/50"
                }`}
                title="Secret Developer Glyph"
              >
                <Sparkles size={12} className={easterEggFound ? "animate-spin" : ""} />
                <span>{easterEggFound ? "Matrix Breaker [Unlocked]" : "Inspect Rune (Easter Egg)"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            &copy; {new Date().getFullYear()} Shijay AS. Engineered with Next.js, TypeScript, Tailwind & Three.js.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D9D1C3] hover:text-[#E99B3D] transition-colors p-2 rounded border border-[#3D3D38]"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
