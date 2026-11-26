"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  Send,
  Video,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  Shield,
  Server,
  Radio,
  User,
  CheckCheck,
  Info,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "me" | "peer";
  text: string;
  time: string;
}

export const VConnectDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "webrtc" | "turn">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "peer", text: "Hey Shijay! How is the WebRTC peer connection holding up?", time: "14:20" },
    { id: "2", sender: "me", text: "ICE candidates exchanged! Coturn TURN relay is standing by for NAT traversal.", time: "14:21" },
    { id: "3", sender: "peer", text: "Awesome, let's initiate an audio/video call test.", time: "14:22" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isInCall, setIsInCall] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    soundEngine.playClick();
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulated peer auto-reply
    setTimeout(() => {
      soundEngine.playNodeSelect();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "peer",
          text: "Packet received via Socket.IO gateway with ~24ms latency. Audio stream synchronized.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  const toggleCall = () => {
    soundEngine.playClick();
    setIsInCall(!isInCall);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3D38] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "chat"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            Live Socket.IO Messaging
          </button>
          <button
            onClick={() => setActiveTab("webrtc")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "webrtc"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            WebRTC P2P Call Simulator
          </button>
          <button
            onClick={() => setActiveTab("turn")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "turn"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            Coturn TURN Architecture
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#88847B] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Socket: Connected (Simulated)</span>
        </div>
      </div>

      {/* Tab 1: Live Chat Simulator */}
      {activeTab === "chat" && (
        <div className="flex-1 flex flex-col bg-[#1A1A18] rounded-xl border border-[#3D3D38] overflow-hidden">
          {/* Peer Header */}
          <div className="p-3 bg-[#252522] border-b border-[#3D3D38] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E99B3D]/20 border border-[#E99B3D] flex items-center justify-center text-[#E99B3D] font-mono text-xs font-bold">
                JD
              </div>
              <div>
                <div className="text-xs font-display font-bold text-[#F2EBDD]">
                  Alex Rivera (Simulated Peer)
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  Online // WebRTC Available
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab("webrtc");
                setIsInCall(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E99B3D] text-[#121211] font-mono text-xs font-bold hover:bg-[#D88B2D]"
            >
              <Video size={13} />
              <span>Start Video Call</span>
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "me" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-md px-3.5 py-2 rounded-xl text-xs ${
                    msg.sender === "me"
                      ? "bg-[#E99B3D] text-[#121211] font-medium"
                      : "bg-[#252522] text-[#F2EBDD] border border-[#3D3D38]"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#88847B] mt-0.5 px-1">
                  <span>{msg.time}</span>
                  {msg.sender === "me" && <CheckCheck size={12} className="text-[#E99B3D]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={sendMessage} className="p-3 bg-[#252522] border-t border-[#3D3D38] flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send real-time Socket.IO test message..."
              className="flex-1 bg-[#1A1A18] border border-[#3D3D38] rounded-lg px-3 py-2 text-xs text-[#F2EBDD] focus:outline-none focus:border-[#E99B3D] font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] text-xs font-bold"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: WebRTC Video Call Simulator */}
      {activeTab === "webrtc" && (
        <div className="flex-1 flex flex-col bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-4 space-y-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Remote Peer Stream */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#252522] border border-[#3D3D38] flex flex-col items-center justify-center p-6 text-center">
              {isInCall ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#E99B3D]/20 border border-[#E99B3D] flex items-center justify-center text-[#E99B3D] mb-3 animate-pulse">
                    <User size={28} />
                  </div>
                  <div className="text-sm font-display font-bold text-[#F2EBDD]">
                    Alex Rivera (Remote Peer)
                  </div>
                  <div className="text-xs font-mono text-emerald-400 mt-1">
                    WebRTC Media Stream Active (720p @ 30fps)
                  </div>
                  {/* Simulated Waveform */}
                  <div className="flex items-center gap-1 mt-4">
                    {[12, 28, 16, 32, 24, 18, 30, 14].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#E99B3D] rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#88847B]">
                    No active call stream
                  </div>
                  <button
                    onClick={toggleCall}
                    className="px-4 py-2 rounded-lg bg-[#E99B3D] text-[#121211] font-mono text-xs font-bold"
                  >
                    Initiate WebRTC Call
                  </button>
                </div>
              )}
            </div>

            {/* Local Client Stream */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#121211] border border-[#3D3D38] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#3D3D38] flex items-center justify-center text-[#D9D1C3] mb-2">
                <User size={20} />
              </div>
              <div className="text-xs font-display font-bold text-[#F2EBDD]">
                Local Client (You)
              </div>
              <div className="text-[11px] font-mono text-[#88847B] mt-1">
                {videoMuted ? "Camera Muted" : "Camera Ready"} // {micMuted ? "Mic Muted" : "Mic Active"}
              </div>

              {/* SDP & ICE Status badge */}
              <div className="mt-4 p-2 rounded bg-[#1A1A18] border border-[#3D3D38] text-[10px] font-mono text-[#D9D1C3] text-left w-full space-y-1">
                <div>ICE Connection: <span className="text-emerald-400">Completed (relay)</span></div>
                <div>SDP Exchange: <span className="text-[#E99B3D]">Offer / Answer OK</span></div>
                <div>Relay Host: <span className="text-[#D9D1C3]">turn:coturn.vconnect.net:3478</span></div>
              </div>
            </div>
          </div>

          {/* Call Controls */}
          {isInCall && (
            <div className="p-3 bg-[#252522] rounded-xl border border-[#3D3D38] flex items-center justify-center gap-4">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-3 rounded-full border transition-all ${
                  micMuted ? "bg-rose-500/20 border-rose-500 text-rose-400" : "bg-[#1A1A18] border-[#3D3D38] text-[#F2EBDD]"
                }`}
                title={micMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {micMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <button
                onClick={() => setVideoMuted(!videoMuted)}
                className={`p-3 rounded-full border transition-all ${
                  videoMuted ? "bg-rose-500/20 border-rose-500 text-rose-400" : "bg-[#1A1A18] border-[#3D3D38] text-[#F2EBDD]"
                }`}
                title={videoMuted ? "Enable Video" : "Disable Video"}
              >
                {videoMuted ? <VideoOff size={16} /> : <Video size={16} />}
              </button>

              <button
                onClick={toggleCall}
                className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold flex items-center gap-2"
              >
                <PhoneOff size={16} />
                <span>End Call</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Coturn Architecture Explanation */}
      {activeTab === "turn" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E99B3D]/10 border border-[#E99B3D] flex items-center justify-center text-[#E99B3D] shrink-0">
              <Server size={24} />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-[#F2EBDD]">
                Why a Self-Hosted Coturn TURN Server Was Essential
              </h4>
              <p className="text-xs text-[#88847B] font-mono mt-0.5">
                Solving Symmetric NAT Traversal & Carrier-Grade Firewalls
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#D9D1C3]">
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-2">
              <div className="text-sm font-display font-bold text-[#E99B3D]">
                1. The Direct P2P Limitation
              </div>
              <p>
                In ideal conditions, WebRTC clients use STUN to discover their public IP and establish direct peer-to-peer UDP connections. However, over 30% of real users sit behind Symmetric NATs (common in cellular networks and corporate Wi-Fi) which allocate distinct external ports for every destination socket, causing direct P2P handshakes to fail completely.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-2">
              <div className="text-sm font-display font-bold text-[#E99B3D]">
                2. Coturn Relay Solution
              </div>
              <p>
                By provisioning a self-hosted Coturn TURN (Traversal Using Relays around NAT) server on an AWS EC2 instance with ephemeral port ranges and HMAC credentials, media packets fallback to secure relay routing when direct P2P paths fail. This lifted WebRTC connection success rates to over 98%.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121211] border border-[#3D3D38] font-mono text-xs text-[#88847B] space-y-1">
            <div className="text-[#E99B3D] font-bold">Coturn Configuration Highlight:</div>
            <div>listening-port=3478</div>
            <div>tls-listening-port=5349</div>
            <div>min-port=49152 | max-port=65535</div>
            <div>realm=vconnect.net | use-auth-secret</div>
          </div>
        </div>
      )}
    </div>
  );
};
