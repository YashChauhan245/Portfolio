"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  year: string;
  github?: string;
  demo?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  highlights: string[];
  gradient: string;
  iconColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "toothly",
    name: "Toothly",
    description: "AI-powered dental care platform with 24/7 EchoDesk AI Chatbot, appointment booking & voice assistant",
    longDescription:
      "A production-ready AI dental care platform built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Prisma, PostgreSQL, and Clerk Authentication. Integrated with EchoDesk AI Chatbot platform for 24/7 inquiries. Features a streamlined appointment booking flow, dentist availability management, subscription-gated AI voice calls (Vapi SDK), admin operational dashboard, and transactional email confirmations.",
    image: "/projects/toothly.png",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "EchoDesk AI",
      "Prisma",
      "PostgreSQL",
      "Clerk Auth",
      "Vapi Voice SDK",
      "Resend API",
    ],
    category: "AI/ML",
    year: "2026",
    github: "https://github.com/YashChauhan245/Toothly",
    demo: "https://toothly-ai.vercel.app/",
    metrics: [
      { label: "Voice Latency", value: "< 250ms" },
      { label: "Framework", value: "Next.js 15" },
    ],
    featured: true,
    highlights: [
      "Integrated 24/7 AI Customer Support Chatbot powered by custom EchoDesk platform for patient triage & doctor inquiries",
      "AI voice assistant with real-time transcription and fluid audio UX via Vapi SDK",
      "Appointment booking flow with dentist selection, time slots, and automated email confirmations",
      "Subscription-gated AI access (ai_basic, ai_pro) integrated with Clerk billing",
    ],
    gradient: "from-primary to-blue-500",
    iconColor: "text-primary",
  },

  {
    id: "finsight",
    name: "FinSight",
    description: "AI-powered financial intelligence & cashflow analytics platform",
    longDescription:
      "A production-grade personal finance application built with Next.js 15, React 19, NextAuth.js (v5) authentication, PostgreSQL (Neon), Prisma v6, and Google Gemini AI. It provides real-time cashflow analytics, automated MoM anomaly detection, OCR receipt scanning, budget burn-rate tracking with automated Resend email alerts, and context-aware financial Q&A.",
    image: "/projects/finsight.png",
    techStack: [
      "Next.js 15",
      "React 19",
      "NextAuth.js (v5)",
      "Tailwind CSS",
      "Prisma ORM (v6)",
      "PostgreSQL (Neon)",
      "Google Gemini AI",
      "Inngest",
      "Resend API",
      "Arcjet",
    ],
    category: "AI/ML",
    year: "2026",
    github: "https://github.com/YashChauhan245/FinSight",
    demo: "https://finsight-finance-ai.vercel.app",
    metrics: [
      { label: "Anomaly Spike", value: "> 30%" },
      { label: "ORM", value: "Prisma v6" },
    ],
    featured: true,
    highlights: [
      "Engineered financial analytics application using Next.js 15 Server Actions & NextAuth.js (v5) with Zod validation",
      "Automated Month-over-Month Anomaly Engine detecting spending spikes over 30%",
      "Context-aware AI assistant utilizing Google Gemini to analyze 90 days of user transaction data",
      "Inngest background job queues for automated monthly budget burn-rate alerts via Resend API",
    ],
    gradient: "from-success to-emerald-400",
    iconColor: "text-success",
  },
  {
    id: "echodesk",
    name: "EchoDesk",
    description: "Enterprise B2B support platform & embeddable AI chatbot engine",
    longDescription:
      "A modern B2B SaaS platform that enables businesses to train intelligent customer support chatbots on custom knowledge bases (PDF documents & web URLs) and deploy them to any website in minutes via a single line of client script. Built with Next.js, MongoDB, Scalekit SSO/Passkeys, Google Gemini AI, and Razorpay subscriptions.",
    image: "/projects/echodesk.png",
    techStack: [
      "Next.js",
      "MongoDB",
      "Mongoose",
      "Scalekit (SSO/Passkeys)",
      "Google Gemini AI",
      "Razorpay API",
      "html-to-text",
      "pdf-parse",
    ],
    category: "SaaS",
    year: "2026",
    github: "https://github.com/YashChauhan245/EchoDesk",
    demo: "https://echodesk-platform.vercel.app/",
    metrics: [
      { label: "Deployment", value: "1-Line Script" },
      { label: "Auth", value: "Scalekit SSO" },
    ],
    featured: true,
    highlights: [
      "Zero-dependency client-side embeddable JavaScript widget (chatbot.js) deployed on live platforms like Toothly",
      "Designed a 5-tier Gemini Model Fallback Chain with local keyword matcher for 99.99% chatbot uptime",
      "Knowledge-ingestion engine parsing PDFs (pdf-parse) and crawling URLs into context-aware payloads",
      "Enterprise Scalekit SSO and WebAuthn/Passkey authentication with Edge Middleware isolation",
      "Razorpay subscription billing validated using SHA-256 HMAC cryptographic signatures",
    ],
    gradient: "from-purple-600 to-indigo-600",
    iconColor: "text-purple-500",
  },
  {
    id: "voxora",
    name: "Voxora",
    description: "AI-augmented language exchange & WebRTC video platform",
    longDescription:
      "A real-time language exchange platform designed to bridge the gap between static vocabulary memorization and spoken fluency. Enables language learners to connect for WebRTC video calls and WebSocket text messaging, assisted by an inline AI tutor powered by Google Gemini for real-time translation, grammar correction, and voice note analysis.",
    image: "/projects/voxora.png",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Node.js",
      "Express",
      "MongoDB",
      "GetStream SDKs",
      "Google Gemini AI",
    ],
    category: "Full Stack",
    year: "2026",
    github: "https://github.com/YashChauhan245/Voxora",
    demo: "https://voxora-ulyj.onrender.com",
    metrics: [
      { label: "Real-Time", value: "WebRTC / WS" },
      { label: "Palette", value: "Obsidian" },
    ],
    featured: false,
    highlights: [
      "Real-time WebSocket chat and WebRTC P2P video call rooms powered by GetStream SFU network",
      "Built-in Google Gemini AI Language Assistant for tone-aware translations and grammar explanations",
      "Native browser audio recorder compiling WebM Blobs into playable inline voice note attachments",
      "Obsidian-purple dark theme with permanent subtle outlines and Framer Motion micro-animations",
    ],
    gradient: "from-accent to-purple-500",
    iconColor: "text-accent",
  },
  {
    id: "yumzo",
    name: "Yumzo",
    description: "Production-ready food delivery platform with collaborative group ordering",
    longDescription:
      "A complete multi-role food delivery platform built with Node.js, Express, Prisma, Supabase PostgreSQL, React 19, and Tailwind CSS v4. Features role-bounded customer/driver/admin workflows, WebSockets real-time order status tracking, background GPS coordinates emitting for drivers, and collaborative group ordering rooms.",
    image: "/projects/yumzo.png",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "Socket.io",
      "Node.js",
      "Express",
      "Prisma ORM",
      "Supabase PostgreSQL",
      "JWT",
    ],
    category: "Full Stack",
    year: "2026",
    github: "https://github.com/YashChauhan245/Yumzo",
    demo: "https://yumzo-09or.onrender.com",
    metrics: [
      { label: "Roles", value: "Customer/Driver/Admin" },
      { label: "Sockets", value: "Socket.io" },
    ],
    featured: false,
    highlights: [
      "Role-bounded order lifecycle flow enforced through middleware and JWT auth boundaries",
      "Collaborative group ordering rooms with shareable codes and host-controlled split-bill checkout",
      "Driver GPS coordinate emission with real-time client delivery map tracking",
      "Food reels video feed supporting interactive likes, comments, and dish recommendations",
    ],
    gradient: "from-orange-500 to-yellow-500",
    iconColor: "text-orange-500",
  },
  {
    id: "path-ai",
    name: "Path AI",
    description: "AI-first career guidance workspace & ATS resume optimizer",
    longDescription:
      "An AI-driven career guidance workspace designed to accelerate professional job search and career progression. Built on Next.js 15 (App Router), PostgreSQL (Neon), and Google Gemini API, it provides real-time ATS resume scoring, AI cover letter generation, interactive mock interviews with instant evaluations, and career assistant chat.",
    image: "/projects/pathai.png",
    techStack: [
      "Next.js 15",
      "React 19",
      "PostgreSQL (Neon)",
      "Prisma ORM",
      "Auth.js (v5)",
      "Google Gemini API",
      "Inngest",
      "Tailwind CSS",
    ],
    category: "SaaS",
    year: "2026",
    github: "https://github.com/YashChauhan245/Path_AI",
    demo: "https://mypath-ai.vercel.app",
    metrics: [
      { label: "Scoring Engine", value: "Gemini AI" },
      { label: "Jobs Engine", value: "Inngest" },
    ],
    featured: false,
    highlights: [
      "ATS-Optimized Resume Builder providing real-time score feedback and actionable suggestions",
      "AI Cover Letter Generator creating targeted applications from specific job descriptions",
      "Interactive Mock Interview module with automated AI scoring and improvement metrics",
      "Context-aware Career Assistant Chat providing dynamic career roadmaps and skill advice",
    ],
    gradient: "from-rose-500 to-red-500",
    iconColor: "text-rose-500",
  },
];

const CATEGORIES = [
  "All",
  "Featured",
  "AI/ML",
  "SaaS",
  "Full Stack",
] as const;

function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer glass-card-hover overflow-hidden flex flex-col h-full"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-t-lg bg-secondary">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          className="w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Lighter dark gradient overlay - starts from 60% down */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% via-black/30 to-black/50 transition-opacity duration-500 group-hover:to-black/60 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/90 text-foreground backdrop-blur-sm border border-border/50">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/50">
          <div className="flex gap-1.5 flex-wrap flex-1 min-w-0">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-badge text-[11px] py-0.5 px-2">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[11px] text-muted-foreground self-center">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1"
                title="Live Demo"
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all"
                title="GitHub Repo"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={onClose}
            aria-label="Back to projects"
            className="p-2 rounded-xl hover:bg-secondary text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-foreground truncate">
            {project.name}
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative  overflow-hidden mb-8 "
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full  border rounded-xl object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                About the Project
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {project.longDescription}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-success" />
                    <span className="text-foreground/80">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
              {project.demo !== "" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 cursor-pointer rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-70" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-secondary/80 border border-border transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Metrics
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {project.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Featured") return project.featured;
      return project.category === activeCategory;
    });
  }, [activeCategory]);

  const selectedProject = useMemo(() => {
    return PROJECTS.find((p) => p.id === selectedProjectId);
  }, [selectedProjectId]);

  const handleCloseDetails = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-success/5 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {selectedProjectId && selectedProject ? (
          <ProjectDetails
            key="details"
            project={selectedProject}
            onClose={handleCloseDetails}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
                      Projects
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      A selection of my recent work and side projects.
                    </p>
                  </div>
                  <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    {filteredProjects.length} projects
                  </span>
                </div>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProjectId(project.id)}
                  />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  No projects found in this category.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
