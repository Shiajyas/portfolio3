# Shijay AS — Interactive Developer Portfolio & Engineering World

> **Full-Stack JavaScript Developer** building intelligent applications, real-time communications, and domain-driven business software.  
> **Headline:** *"I TURN IDEAS INTO WORKING SOFTWARE."*

---

## 1. Overview & Architectural Philosophy

This project is a high-performance, game-inspired developer portfolio and interactive software showcase built for **Shijay AS**. Rather than a conventional static brochure, it presents a 7-chapter narrative world combining editorial typography, an interactive 3D abstract portal sculpture, an RPG-inspired technology skill tree, interactive architecture flowcharts, a developer command terminal, and **six embedded, functional project sandboxes** that operate directly within the site without navigating visitors away.

### Core Stack
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) with static pre-rendering
- **UI Engine:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a dedicated cream-and-charcoal design token system
- **3D Graphics:** [Three.js](https://threejs.org/) (pure canvas lifecycle with WebGL detection & CSS geometric fallbacks)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for journey progression, achievements, and sandboxes
- **Audio Engine:** Pure synthetic Web Audio API (zero audio file dependencies, disabled by default)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 2. Visual Design System

The application strictly implements the requested editorial cream-and-charcoal visual identity:

| Token | Hex Code | Visual Application |
|---|---|---|
| **Cream** | `#F2EBDD` | Primary text, titles, prominent foreground accents |
| **Cream Pure** | `#FAF6EF` | Invoice parchment backgrounds, light preview card surfaces |
| **Charcoal** | `#252522` | Card surfaces, module panels, secondary backgrounds |
| **Deep Charcoal** | `#121211` | Root canvas atmosphere, dark environments |
| **Portfolio Orange** | `#E99B3D` | Key highlights, primary CTAs, active status, node selections |
| **Muted Gray** | `#88847B` | Secondary annotations, technical metadata, labels |
| **Soft Border** | `#D9D1C3` | Light borders, invoice grid lines, subtle dividers |
| **Dark Border** | `#3D3D38` | Structural containment lines, terminal borders |

---

## 3. Seven Storytelling Chapters

1. **Chapter 01 — The Entrance (`#entrance`)**
   - Immersive hero section featuring headline: *"I TURN IDEAS INTO WORKING SOFTWARE."*
   - Interactive Three.js 3D abstract portal sculpture with mouse parallax, rotating polyhedral nodes, and ambient orange illumination (with graceful CSS fallback).
   - Real-time "Available for Opportunities" status indicator (configurable centrally).
   - Direct download link for the verified resume (`Shijay_AS_Resume.pdf`).

2. **Chapter 02 — The Origin (`#origin`)**
   - Narrative journey from Electronics & Communication foundations (Govt. ITI Chalakudy) and physical CCTV/IP networking infrastructure (APT Systems & THINK THANX) to modern full-stack software architecture (Brototype).
   - Interactive timeline milestone explorer with verified credentials and photographic card.

3. **Chapter 03 — The Evolution (`#evolution`)**
   - 6 interconnected engineering progression pillars:
     1. Frontend Engineering
     2. Backend Engineering
     3. Database & Data Management
     4. Real-Time Communication
     5. AI & Intelligent Systems
     6. Cloud, DevOps & Tools
   - Honest representation: represents verified code experience without fabricated percentage gauges.

4. **Chapter 04 — The Skill Tree (`#skill-tree`)**
   - Interactive RPG-inspired technology matrix.
   - Filterable by discipline with 20+ detailed technology nodes (React, Next.js, Node.js, Express, Clean Architecture, MongoDB, PostgreSQL, Redis, ChromaDB, WebRTC, Coturn, LangChain, LangGraph, Ollama, Docker, AWS, GitHub Actions).
   - Detailed inspector drawer displaying implementation context and associated missions.
   - Tracks discovered nodes and unlocks the *"Tech Tree Scholar"* achievement.

5. **Chapter 05 — The Missions (`#missions`)**
   - Deep-dive technical project cards and embedded sandboxes for all 6 flagship projects:
     - **Mission 01: VConnect** — Real-time social media with WebRTC calling, Socket.IO messaging, and Coturn TURN server architecture.
     - **Mission 02: AI-Powered Commerce** — Intelligent shopping assistant with LangGraph multi-step reasoning, ChromaDB vector search, and BM25 hybrid RAG.
     - **Mission 03: ThinkThank** — CCTV & security store with Razorpay webhooks, stock ledger, admin dashboard, and pdfkit tax invoices.
     - **Mission 04: Image Gallery** — Cloud media manager with AWS SDK v3 direct-to-S3 presigned uploads, drag-and-drop reordering, and optimistic UI updates.
     - **Mission 05: JS Informatics ERP (Flagship)** — Complete 7-module business platform for CCTV/ELV contractors (Dashboard, Inventory, Customer Directory, Quotation Builder with 18% GST, GST Invoice Preview, Installation/Service Workflow inspired by real service reports, and Financial Analytics).
     - **Mission 06: Gym Management SaaS** — Multi-tenant fitness SaaS with organization isolation, gym admin portal, and responsive member mobile pass with dynamic QR turnstile scanning.

6. **Chapter 06 — The Engineering Lab (`#engineering-lab`)**
   - Interactive architecture diagrams for VConnect, AI RAG, and JS Informatics ERP.
   - Functional developer command terminal supporting: `help`, `about`, `skills`, `projects`, `experience`, `contact`, `resume`, and `clear`.
   - Accessible quick-action cards for non-CLI visitors.

7. **Chapter 07 — The Next Quest (`#next-quest`)**
   - Memorable closing section: *"THE NEXT CHAPTER IS YET TO BE BUILT."*
   - Centralized contact links (Email, Phone, WhatsApp, GitHub, LinkedIn, LeetCode, Resume PDF).
   - Interactive message dispatch form with immediate status feedback.

---

## 4. Centralized Data Architecture

All content is managed in central data files (`src/data/`)—ensuring **zero hardcoding** of contact information, URLs, or project details across UI components:

```
src/data/
├── profile.ts      # Name, headline, email, phone, bio, status, social links
├── experience.ts   # Academic credentials, industry milestones, timeline
├── skills.ts       # 6 categories, 20+ skill nodes with architectural context
├── projects.ts     # 6 flagship projects, engineering challenges, architecture layers
└── navigation.ts   # 7 chapters configuration, anchors, numbers
```

To update contact details or availability, edit `src/data/profile.ts`:
```typescript
export const profileData: ProfileData = {
  name: "Shijay AS",
  role: "Full-Stack JavaScript Developer",
  email: "shijayaalath@gmail.com",
  phone: "+91 9526161805",
  availableForOpportunities: true,
  availabilityNote: "Available for Full-Stack & AI Engineering Roles",
  githubUrl: "https://github.com/Shiajyas",
  linkedinUrl: "https://www.linkedin.com/in/shijay-as",
  leetcodeUrl: "https://leetcode.com/u/shijaychachu/",
  resumeUrl: "/resume/Shijay_AS_Resume.pdf",
  // ...
};
```

---

## 5. Local Setup & Build Commands

### Prerequisites
- Node.js `v18.17+` or `v20+` (tested on Node `v26.13.0`)
- npm `v9+` or `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/Shiajyas/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with hot module reloading.

### Production Build & Verification
```bash
# Type check without emitting
npx tsc --noEmit

# Compile production bundle
npm run build

# Start production server locally
npm run start
```

---

## 6. Vercel Deployment

The project is structured for zero-configuration deployment to [Vercel](https://vercel.com/):

1. Push this repository to GitHub (`github.com/Shiajyas/portfolio`).
2. Log into **Vercel** and select **Add New Project**.
3. Import the repository.
4. Verify build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **Deploy**. The site will be built and served globally on Vercel's Edge Network with automatic HTTPS.

---

## 7. Verified Assets Included

- **Resume PDF:** `public/resume/Shijay_AS_Resume.pdf` (and `public/Shijay_AS_Resume.pdf`)
- **Profile Portrait:** `public/images/profile.jpeg`
- **Field Service Report Reference:** `public/docs/JS_Informatics_Service_Report.pdf`
