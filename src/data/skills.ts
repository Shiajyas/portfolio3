import { SkillNode } from "@/types";

export interface SkillCategoryInfo {
  id: "frontend" | "backend" | "database" | "realtime" | "ai" | "devops";
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const skillCategories: SkillCategoryInfo[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Component Architecture & Responsive Interfaces",
    description:
      "Crafting performant, accessible, and reactive user interfaces using React, Next.js, and TypeScript with strict separation of presentational and domain state.",
    iconName: "Layout",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    subtitle: "Clean Architecture & Scalable Web Services",
    description:
      "Engineering modular API backends adhering to Clean Architecture and SOLID principles, featuring decoupled controllers, use cases, and repositories.",
    iconName: "Server",
  },
  {
    id: "database",
    title: "Database & Data Management",
    subtitle: "Relational, Document & In-Memory Stores",
    description:
      "Designing resilient schemas, indexing strategies, vector embeddings for similarity search, and high-throughput Redis caching layers.",
    iconName: "Database",
  },
  {
    id: "realtime",
    title: "Real-Time Communication",
    subtitle: "WebSockets, P2P & NAT Traversal",
    description:
      "Architecting low-latency bidirectional messaging engines with Socket.IO and high-throughput peer-to-peer audio/video calling using WebRTC and Coturn TURN servers.",
    iconName: "Radio",
  },
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    subtitle: "RAG Pipelines & Agentic Workflows",
    description:
      "Constructing Retrieval-Augmented Generation (RAG) pipelines, semantic vector search, LangChain chains, LangGraph state machines, and local Ollama model orchestration.",
    iconName: "Cpu",
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    subtitle: "Containerization, CI/CD & Cloud Infrastructure",
    description:
      "Automating development lifecycles with Docker Compose multi-container stacks, GitHub Actions CI/CD pipelines, AWS EC2/S3/CloudFront, and reverse-proxied Nginx environments.",
    iconName: "Cloud",
  },
];

export const skillNodes: SkillNode[] = [
  // Frontend
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    experienceLevel: "Production",
    description:
      "Core library for reactive component systems, custom hooks, virtual DOM optimization, and modular UI engineering.",
    context:
      "Applied across all web applications, structuring reusable component trees, state boundaries, and optimistic UI transitions.",
    relatedProjectIds: ["vconnect", "ecommerce-ai", "thinkthank", "image-gallery", "js-informatics-erp"],
    connections: ["nextjs", "typescript", "zustand", "tailwind"],
  },
  {
    id: "nextjs",
    name: "Next.js (App Router)",
    category: "frontend",
    experienceLevel: "Production",
    description:
      "Full-stack React framework featuring Server Components, streaming SSR, API routes, and optimized routing.",
    context:
      "Architected this interactive portfolio and modern web portals utilizing App Router layouts, metadata, and dynamic routing.",
    relatedProjectIds: ["portfolio", "vconnect"],
    connections: ["react", "typescript", "tailwind"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    experienceLevel: "Production",
    description:
      "Strict static typing, generic interfaces, Discriminated Unions, and end-to-end type safety from database to UI.",
    context:
      "Used across all recent codebases to enforce contract validation, eliminate runtime type errors, and power refactor confidence.",
    relatedProjectIds: ["vconnect", "gym-saas", "image-gallery", "portfolio"],
    connections: ["react", "nextjs", "nodejs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    experienceLevel: "Production",
    description:
      "Utility-first styling with design token systems, responsive breakpoints, dynamic color schemes, and seamless dark modes.",
    context:
      "Designed modern responsive interfaces, custom cream-and-charcoal visual identities, and fluid typography systems.",
    relatedProjectIds: ["vconnect", "image-gallery", "portfolio", "js-informatics-erp"],
    connections: ["react", "nextjs"],
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    experienceLevel: "Production",
    description:
      "Event-driven asynchronous runtime powering scalable server-side business logic, streaming I/O, and micro-services.",
    context:
      "Core foundation for all backend microservices, REST controllers, real-time socket gateways, and automation workers.",
    relatedProjectIds: ["vconnect", "ecommerce-ai", "thinkthank", "gym-saas", "image-gallery"],
    connections: ["express", "clean-arch", "socketio", "mongodb", "postgresql"],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    experienceLevel: "Production",
    description:
      "Minimalist web framework for crafting robust HTTP REST APIs, middleware pipelines, and authentication barriers.",
    context:
      "Engineered backend servers with custom rate limiting, JWT validation middleware, error-handling interceptors, and file upload pipelines.",
    relatedProjectIds: ["vconnect", "ecommerce-ai", "thinkthank", "gym-saas", "image-gallery"],
    connections: ["nodejs", "clean-arch", "jwt"],
  },
  {
    id: "clean-arch",
    name: "Clean Architecture & SOLID",
    category: "backend",
    experienceLevel: "Advanced",
    description:
      "Structural paradigm separating domain business entities, use cases, interface adapters, and external frameworks.",
    context:
      "Enforced in VConnect and Gym SaaS backends to ensure repository abstraction, easy unit testability, and framework independence.",
    relatedProjectIds: ["vconnect", "gym-saas", "image-gallery"],
    connections: ["nodejs", "express", "typescript"],
  },
  {
    id: "jwt",
    name: "JWT & OAuth2",
    category: "backend",
    experienceLevel: "Production",
    description:
      "Stateless authorization tokens, refresh token rotation, session invalidation, and third-party Google/GitHub OAuth2 flows.",
    context:
      "Secured 500+ simulated concurrent sessions with token rotation, HTTP-only cookies, and role-based access control (RBAC).",
    relatedProjectIds: ["vconnect", "thinkthank", "gym-saas"],
    connections: ["express", "nodejs"],
  },

  // Database
  {
    id: "mongodb",
    name: "MongoDB & Mongoose",
    category: "database",
    experienceLevel: "Production",
    description:
      "Document database with flexible schemas, aggregation pipelines, compound indexing, and real-time change streams.",
    context:
      "Constructed multi-stage aggregation pipelines for sales reports, product catalog filtering, and conversation thread modeling.",
    relatedProjectIds: ["vconnect", "ecommerce-ai", "thinkthank", "image-gallery"],
    connections: ["nodejs", "express", "redis"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL & Prisma",
    category: "database",
    experienceLevel: "Production",
    description:
      "ACID-compliant relational database with foreign key constraints, transactional integrity, and Prisma ORM migrations.",
    context:
      "Selected for Gym SaaS to strictly isolate organization data via tenant schemas, transactional booking, and relational membership audits.",
    relatedProjectIds: ["gym-saas", "image-gallery"],
    connections: ["nodejs", "clean-arch"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "database",
    experienceLevel: "Production",
    description:
      "In-memory key-value cache, Pub/Sub message broker, distributed locks, and BullMQ task queue storage.",
    context:
      "Cached frequent API queries to slash retrieval latency by 40%, stored online user presence, and powered BullMQ background jobs in Gym SaaS.",
    relatedProjectIds: ["vconnect", "ecommerce-ai", "gym-saas"],
    connections: ["nodejs", "socketio"],
  },
  {
    id: "chromadb",
    name: "ChromaDB & Vector DB",
    category: "database",
    experienceLevel: "Advanced",
    description:
      "Open-source embedding database for high-dimensional similarity search and cosine similarity retrieval.",
    context:
      "Stored vector embeddings for 100+ product catalogues in AI-Powered Commerce, enabling semantic similarity matching for conversational shopping.",
    relatedProjectIds: ["ecommerce-ai"],
    connections: ["langchain", "rag", "ollama"],
  },

  // Real-Time
  {
    id: "socketio",
    name: "Socket.IO",
    category: "realtime",
    experienceLevel: "Production",
    description:
      "Event-based bidirectional communication protocol with automatic WebSocket fallback, room partitioning, and heartbeats.",
    context:
      "Implemented real-time 1-on-1 and group messaging in VConnect, typing indicators, read receipts, and live notification broadcasting.",
    relatedProjectIds: ["vconnect"],
    connections: ["nodejs", "webrtc", "redis"],
  },
  {
    id: "webrtc",
    name: "WebRTC",
    category: "realtime",
    experienceLevel: "Advanced",
    description:
      "Browser-native peer-to-peer real-time media exchange protocol for audio, video, and bidirectional data channels.",
    context:
      "Engineered direct peer-to-peer audio and video calling between social media users with ICE candidate exchange and SDP negotiation.",
    relatedProjectIds: ["vconnect"],
    connections: ["socketio", "coturn"],
  },
  {
    id: "coturn",
    name: "Coturn (STUN / TURN)",
    category: "realtime",
    experienceLevel: "Production",
    description:
      "Self-hosted VoIP media traffic relay server solving NAT traversal and symmetric firewall restrictions.",
    context:
      "Configured and deployed a self-hosted Coturn server on AWS EC2, guaranteeing WebRTC media packet relay when symmetric NATs block direct P2P connections.",
    relatedProjectIds: ["vconnect"],
    connections: ["webrtc", "docker", "aws-ec2"],
  },

  // AI & RAG
  {
    id: "langchain",
    name: "LangChain & LangGraph",
    category: "ai",
    experienceLevel: "Production",
    description:
      "Orchestration framework for LLM chains, agentic state machines, cyclical graphs, dynamic memory, and tool invocation.",
    context:
      "Engineered multi-node agent workflows in E-Commerce platform for query classification, semantic search, catalog retrieval, and response synthesis.",
    relatedProjectIds: ["ecommerce-ai"],
    connections: ["ollama", "rag", "chromadb"],
  },
  {
    id: "ollama",
    name: "Ollama Local LLMs",
    category: "ai",
    experienceLevel: "Advanced",
    description:
      "Self-hosted local inference runtime running lightweight open-source models (Llama 3, Mistral, Gemma) with zero API billing costs.",
    context:
      "Integrated Ollama into the shopping assistant pipeline for private, zero-latency local development and offline inference validation.",
    relatedProjectIds: ["ecommerce-ai"],
    connections: ["langchain", "rag"],
  },
  {
    id: "rag",
    name: "RAG & Vector Pipelines",
    category: "ai",
    experienceLevel: "Production",
    description:
      "Retrieval-Augmented Generation combining BM25 keyword matching and dense vector embeddings to ground LLM responses in real data.",
    context:
      "Achieved 95% retrieval accuracy on product technical specifications, preventing hallucinations while maintaining conversational context.",
    relatedProjectIds: ["ecommerce-ai"],
    connections: ["langchain", "chromadb", "ollama"],
  },

  // Cloud & DevOps
  {
    id: "docker",
    name: "Docker & Docker Compose",
    category: "devops",
    experienceLevel: "Production",
    description:
      "OS-level container virtualization and multi-service orchestration for reproducible development, testing, and production environments.",
    context:
      "Containerized VConnect (frontend, backend, Redis, Coturn) and Gym SaaS (Express, PostgreSQL, Redis, BullMQ) for deterministic one-command bootstrapping.",
    relatedProjectIds: ["vconnect", "gym-saas", "thinkthank"],
    connections: ["github-actions", "aws-ec2"],
  },
  {
    id: "aws-ec2",
    name: "AWS (EC2, S3, CloudFront)",
    category: "devops",
    experienceLevel: "Production",
    description:
      "Scalable cloud infrastructure: Linux virtual servers (EC2), object storage with presigned URLs (S3), and global CDN caching (CloudFront).",
    context:
      "Hosted production Node.js services on EC2 behind Nginx reverse proxies, configured S3 bucket CORS for direct uploads, and served assets via CloudFront.",
    relatedProjectIds: ["vconnect", "thinkthank", "image-gallery"],
    connections: ["docker", "nginx"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions CI/CD",
    category: "devops",
    experienceLevel: "Production",
    description:
      "Declarative continuous integration pipelines automating linting, test suites, Docker image builds, and automated server deployments.",
    context:
      "Configured automated workflows triggering on main branch pushes to validate TypeScript types, run unit tests, and deploy changes seamlessly.",
    relatedProjectIds: ["vconnect", "gym-saas"],
    connections: ["docker", "aws-ec2"],
  },
  {
    id: "nginx",
    name: "Nginx & Reverse Proxy",
    category: "devops",
    experienceLevel: "Production",
    description:
      "High-performance HTTP server, SSL/TLS termination, reverse proxying, gzip compression, and rate limiting.",
    context:
      "Routed client requests to backend Node.js processes, terminated SSL certificates via Certbot, and handled WebSocket protocol upgrades.",
    relatedProjectIds: ["vconnect", "thinkthank"],
    connections: ["aws-ec2", "docker"],
  },
];
