import { TimelineItem } from "@/types";

export const timelineData: TimelineItem[] = [
  {
    id: "origin-roots",
    year: "2014 — 2016",
    period: "Higher Secondary Education",
    title: "Computer Science Foundation",
    organization: "Sreekrishna Govt. HSS, Guruvayoor",
    location: "Guruvayoor, Kerala",
    type: "education",
    summary:
      "First formal foundation in computing, algorithms, procedural logic, and digital systems that sparked a lasting fascination with technology.",
    highlights:
      [
        "Fundamentals of programming, data structures, and algorithmic logic.",
        "Computer organization, digital logic gates, and software concepts.",
        "Sparked interest in automated systems and engineering.",
      ],
    skills: ["Computer Science", "Algorithms", "Logic Design", "C++"],
  },
  {
    id: "electronics-diploma",
    year: "2018 — 2020",
    period: "Technical Diploma",
    title: "Diploma in Electronics & Communication",
    organization: "Govt. ITI Chalakudy",
    location: "Chalakudy, Kerala",
    type: "education",
    summary:
      "Deep dive into hardware circuits, signal processing, microcontrollers, low-level networking, and embedded logic.",
    highlights:
      [
        "Comprehensive study of analog and digital electronic circuits.",
        "Signal propagation, telecommunications, and structured low-voltage wiring.",
        "Developed a concrete appreciation for hardware constraints, memory limits, and physical system architecture.",
      ],
    skills: [
      "Electronics & Comm",
      "Network Protocols",
      "Signal Processing",
      "Circuit Analysis",
    ],
  },
  {
    id: "systems-infrastructure",
    year: "2020 — 2023",
    period: "Industry Experience",
    title: "CCTV, Security & Network Systems Engineer",
    organization: "APT Systems & THINK THANX",
    location: "Bangalore & Ernakulam",
    type: "experience",
    summary:
      "Hands-on engineering of commercial CCTV surveillance, IP networks, NVR systems, access control, and low-voltage electrical infrastructure.",
    highlights:
      [
        "Configured enterprise IP camera surveillance, managed NVR arrays, and deployed secure LAN/WAN subnets.",
        "Diagnosed restrictive NAT boundaries, firewall traversal challenges, and packet routing in real-world facilities.",
        "Gained deep operational understanding of security equipment businesses—the exact domain that later inspired JS Informatics ERP.",
      ],
    skills: [
      "IP Networking",
      "NVR / CCTV Architecture",
      "NAT Traversal",
      "Hardware Diagnostics",
      "Access Control",
    ],
  },
  {
    id: "brototype-engineering",
    year: "2023 — Present",
    period: "Intensive Engineering Bootcamp",
    title: "Advanced Full-Stack & AI Engineering",
    organization: "Brototype",
    location: "Kochi, Kerala",
    type: "transition",
    summary:
      "Immersive, project-driven software engineering mastery focused on scalable full-stack architectures, Clean Architecture, and modern AI engineering.",
    highlights:
      [
        "Architected enterprise-grade full-stack web applications using Node.js, TypeScript, React, and Next.js.",
        "Implemented Clean Architecture and SOLID principles, decoupling core business logic from frameworks and external services.",
        "Engineered real-time P2P communication layers with WebRTC and Socket.IO, accompanied by self-hosted Coturn TURN infrastructure.",
        "Built intelligent RAG pipelines combining LangChain, LangGraph, Ollama, and ChromaDB vector indexing.",
        "Containerized multi-service stacks with Docker and automated testing and releases via GitHub Actions CI/CD.",
      ],
    skills: [
      "Full-Stack MERN",
      "Clean Architecture",
      "SOLID Principles",
      "WebRTC & Socket.IO",
      "RAG & LangChain",
      "Docker & CI/CD",
    ],
  },
];
