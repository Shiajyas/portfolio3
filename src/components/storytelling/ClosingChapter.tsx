"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { soundEngine } from "@/lib/audio";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
  FileDown,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const ClosingChapter: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundEngine.playClick();
    setIsSubmitting(true);

    // Simulate sending with clear feedback
    setTimeout(() => {
      soundEngine.playChime();
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <section
      id="next-quest"
      className="py-28 px-6 bg-[#121211] text-[#F2EBDD] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#E99B3D]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-charcoal-grain opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16 text-center sm:text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E99B3D] px-2.5 py-1 rounded bg-[#E99B3D]/10 border border-[#E99B3D]/30 inline-block">
            Chapter 07 // The Next Quest
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F2EBDD] leading-[1.05]">
            THE NEXT CHAPTER IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EBDD] via-[#E99B3D] to-[#F5A623]">
              YET TO BE BUILT.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#D9D1C3] leading-relaxed max-w-2xl font-sans">
            I&apos;m always interested in meaningful engineering challenges, scalable full-stack architectures, and opportunities to build high-impact real-world products.
          </p>
        </div>

        {/* Contact Information & Interactive Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Credentials & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#1A1A18] border border-[#3D3D38] space-y-6">
              <h3 className="font-display font-bold text-lg text-[#F2EBDD]">
                Get in Touch
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D]/60 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E99B3D]/10 text-[#E99B3D] flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#88847B] uppercase">Email Address</div>
                    <div className="font-bold">{profileData.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${profileData.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D]/60 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E99B3D]/10 text-[#E99B3D] flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#88847B] uppercase">Phone / WhatsApp</div>
                    <div className="font-bold">{profileData.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3]">
                  <div className="w-8 h-8 rounded-lg bg-[#E99B3D]/10 text-[#E99B3D] flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#88847B] uppercase">Location</div>
                    <div className="font-bold">{profileData.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-[#3D3D38] space-y-3">
                <div className="text-xs font-mono uppercase text-[#88847B]">
                  Verified Developer Profiles
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D] text-center transition-all flex flex-col items-center gap-1.5"
                  >
                    <Github size={18} />
                    <span className="text-[10px] font-mono">GitHub</span>
                  </a>
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D] text-center transition-all flex flex-col items-center gap-1.5"
                  >
                    <Linkedin size={18} />
                    <span className="text-[10px] font-mono">LinkedIn</span>
                  </a>
                  <a
                    href={profileData.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#252522] border border-[#3D3D38] text-[#D9D1C3] hover:text-[#E99B3D] hover:border-[#E99B3D] text-center transition-all flex flex-col items-center gap-1.5"
                  >
                    <Code2 size={18} />
                    <span className="text-[10px] font-mono">LeetCode</span>
                  </a>
                </div>
              </div>

              {/* Direct Resume Download */}
              <div className="pt-2">
                <a
                  href={profileData.resumeUrl}
                  download="Shijay_AS_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  className="w-full py-3 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <FileDown size={16} />
                  <span>Download Verified Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1A18] border border-[#3D3D38] space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F2EBDD]">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-mono text-[#88847B] mt-0.5">
                  Have an engineering opportunity or want to collaborate? Send a note below.
                </p>
              </div>

              {isSent ? (
                <div className="p-8 rounded-xl bg-[#252522] border border-emerald-500/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F2EBDD]">
                    Message Received!
                  </h4>
                  <p className="text-xs text-[#88847B] max-w-sm mx-auto">
                    Thank you for reaching out. I&apos;ll get back to you promptly at your email address.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 rounded-lg bg-[#1A1A18] border border-[#3D3D38] text-xs font-mono text-[#D9D1C3] hover:text-[#E99B3D]"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#88847B]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-[#252522] border border-[#3D3D38] rounded-xl px-4 py-2.5 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#88847B]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-[#252522] border border-[#3D3D38] rounded-xl px-4 py-2.5 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#88847B]">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Full-Stack Engineer Role / Technical Project Discussion"
                      className="w-full bg-[#252522] border border-[#3D3D38] rounded-xl px-4 py-2.5 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#88847B]">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Shijay, I reviewed your VConnect, AI Commerce, and JS Informatics ERP demos..."
                      className="w-full bg-[#252522] border border-[#3D3D38] rounded-xl p-4 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-sans leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? "Dispatching Message..." : "Dispatch Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
