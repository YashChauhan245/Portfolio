import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
  CheckCircle,
  ExternalLink,
  Globe,
} from "lucide-react";

/* =========================
   Types
========================= */

interface ResumeProps {
  isDark: boolean;
}

type ResumeListItem = {
  heading: string;
  subHeading: string;
  period: string;
  location?: string;
  liveUrl?: string;
  githubUrl?: string;
  bullets?: string[];
};

type ResumeSection =
  | {
    id: string;
    title: string;
    type: "text";
    content: string;
  }
  | {
    id: string;
    title: string;
    type: "list";
    items: ResumeListItem[];
  }
  | {
    id: string;
    title: string;
    type: "skills";
    categories: { label: string; value: string }[];
  }
  | {
    id: string;
    title: string;
    type: "bullets";
    bullets: string[];
  };

/* =========================
   Resume Data
========================= */

const RESUME_DATA: ResumeSection[] = [
  {
    id: "summary",
    title: "Executive Summary",
    type: "text",
    content:
      "Final-year CSE undergraduate (CGPA 8.5/10) with hands-on experience building full-stack web applications, B2B SaaS platforms, and real-time systems using Next.js 15, React 19, Node.js, Express, TypeScript, PostgreSQL, and MongoDB. Completed a frontend development internship at DRDO (Ministry of Defence) and independently shipped live full-stack products spanning multi-tenant SaaS and financial analytics. Solved 400+ DSA problems on LeetCode. Seeking a Software Development Engineer (SDE) role.",
  },
  {
    id: "education",
    title: "Education",
    type: "list",
    items: [
      {
        heading: "Guru Tegh Bahadur 4th Centenary Engineering College (GGSIPU)",
        subHeading: "B.Tech in Computer Science & Engineering | CGPA: 8.5 / 10",
        period: "2023 – 2027",
        location: "New Delhi, India",
      },
    ],
  },
  {
    id: "skills",
    title: "Core Competencies",
    type: "skills",
    categories: [
      { label: "Languages", value: "JavaScript (ES6+), TypeScript, Python, C++, SQL, HTML5, CSS3" },
      {
        label: "Frontend & UI",
        value: "React 19, Next.js 15 (App Router), Redux, Zustand, TanStack Query, Tailwind CSS, Radix UI, ShadCN UI, GSAP, Vite",
      },
      {
        label: "Backend & Real-Time",
        value: "Node.js, Express.js, REST APIs, Server Actions, WebSockets, Socket.io, WebRTC, Stream API, MVC Architecture",
      },
      {
        label: "Databases & ORMs",
        value: "PostgreSQL, Neon (Serverless Postgres), MongoDB, Mongoose, Prisma ORM (v6), SQLite",
      },
      {
        label: "Auth & Security",
        value: "Clerk Auth, NextAuth, Scalekit (SSO/Passkeys), JWT, bcrypt, Arcjet, HMAC Signature Verification",
      },
      {
        label: "Platforms & Tools",
        value: "Git, Vercel, Render, Inngest, Postman, Figma, Razorpay API, Resend, Gemini AI",
      },
    ],
  },
  {
    id: "experience",
    title: "Professional Experience",
    type: "list",
    items: [
      {
        heading: "Frontend Development Intern",
        subHeading: "DRDO, Scientific Analysis Group (Ministry of Defence)",
        period: "June 2025 – July 2025",
        location: "New Delhi, India",
        bullets: [
          "Designed and developed a responsive, multi-page frontend for an IEEE Document Formatter tool, including login/signup, file upload, and a dual-panel live editor with real-time LaTeX-compiled PDF preview.",
          "Integrated the frontend with backend REST API endpoints to enable AI-powered content generation (Ollama Phi-3 Mini) and IEEE-compliant PDF output.",
          "Collaborated cross-functionally with a team of 3 to ship production-ready scientific documentation UI modules.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Strategic Projects",
    type: "list",
    items: [
      {
        heading: "EchoDesk — Enterprise B2B Support & Embeddable Chatbot Engine",
        subHeading: "Next.js, MongoDB, Mongoose, Scalekit (SSO/Passkeys), Razorpay, Google Gemini AI",
        period: "Live SaaS Platform",
        liveUrl: "https://echodesk-platform.vercel.app/",
        githubUrl: "https://github.com/YashChauhan245/EchoDesk",
        bullets: [
          "Built a multi-tenant B2B SaaS platform enabling custom RAG chatbot deployment via zero-dependency client widget (chatbot.js).",
          "Developed server-side knowledge engine parsing PDFs (pdf-parse) and crawling external URLs (html-to-text).",
          "Integrated Scalekit enterprise SSO and passwordless WebAuthn/Passkey authentication paired with Edge Middleware.",
        ],
      },
      {
        heading: "FinSight — AI Financial Intelligence & Analytics Platform",
        subHeading: "Next.js 15, NextAuth.js (v5), PostgreSQL, Neon, Prisma ORM, Inngest, Google Gemini AI, Resend API",
        period: "Live Platform",
        liveUrl: "https://finsight-finance-ai.vercel.app",
        githubUrl: "https://github.com/YashChauhan245/FinSight",
        bullets: [
          "Engineered financial analytics application using Next.js 15 Server Actions, NextAuth.js (v5) authentication, PostgreSQL, and Prisma ORM v6 with Zod validation.",
          "Developed automated Month-over-Month (MoM) Anomaly Engine detecting spending spikes exceeding 30%.",
          "Implemented Inngest event-driven background queues for automated monthly budget burn-rate tracking & Resend email alerts.",
        ],
      },
    ],
  },
  {
    id: "achievements",
    title: "Achievements & Certifications",
    type: "bullets",
    bullets: [
      "DSA Supreme 3.0 — Certificate of Completion, Code Help by Love Babbar (Jan 2026, Serial No. 4147WVAI).",
      "Solved 400+ problems on LeetCode with strong command of arrays, trees, graphs, DP, and sliding window techniques.",
      "Participated in 15+ hackathons with Top 5 finishes in 5+, including Top 3 at CodeZen 2026 & 2025 and Top 8 at Build X: NSIT.",
    ],
  },
];

/* =========================
   Component
========================= */

export function Resume({ isDark }: ResumeProps) {
  return (
    <div
      className={`w-full h-full overflow-auto pb-20 ${isDark ? "bg-[#0a0a0a] text-gray-300" : "bg-white text-gray-800"
        }`}
    >
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Header */}
        <header className="mb-12 border-b border-current/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">Yash Chauhan</h1>
              <p className="text-xl mt-2 font-medium text-blue-600">
                Full-Stack Web Developer & SDE
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/YashChauhan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center h-fit w-fit gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all ${
                  isDark
                    ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                View PDF
              </a>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/YashChauhan_resume.pdf";
                  link.download = "Yash_Chauhan_Resume.pdf";
                  link.click();
                }}
                className="flex items-center h-fit w-fit gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 mt-8 text-sm opacity-80">
            <a
              href="mailto:yashchau.work@gmail.com"
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              yashchau.work@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              +91 9711384254
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              New Delhi, India
            </div>
            <a
              href="https://iamyashchauhan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
            >
              <Globe className="w-4 h-4" />
              Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/yash-chauhan-02b13a3b2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/Yash_Chauhan24/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
            >
              <Code2 className="w-4 h-4" />
              LeetCode
            </a>
            <a
              href="https://github.com/YashChauhan245"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {RESUME_DATA.map((section) => (
            <section
              key={section.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-50">
                {section.title}
              </h3>

              <div className="md:col-span-3">
                {section.type === "text" && (
                  <p className="leading-relaxed">{section.content}</p>
                )}

                {section.type === "list" &&
                  section.items.map((item, i) => (
                    <div key={i} className="mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        {item.liveUrl ? (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-base hover:text-blue-500 flex items-center gap-1.5 transition-colors group"
                          >
                            <span>{item.heading}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </a>
                        ) : (
                          <h4 className="font-bold text-base">{item.heading}</h4>
                        )}

                        <div className="flex items-center gap-2">
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-md transition-all"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {item.period}
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-xs font-semibold ${isDark ? "text-gray-300 bg-white/10 hover:bg-white/20" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                                } px-2.5 py-1 rounded-md transition-all`}
                            >
                              <Github className="w-3 h-3" />
                              GitHub
                            </a>
                          )}
                          {!item.liveUrl && (
                            <span className="text-xs opacity-50">
                              {item.period}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mb-2">
                        <p className="text-blue-600 font-semibold text-sm">
                          {item.subHeading}
                        </p>
                        {item.location && (
                          <span className="text-xs italic opacity-50">
                            {item.location}
                          </span>
                        )}
                      </div>
                      {item.bullets && (
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, j) => (
                            <li key={j} className="flex gap-3 text-sm">
                              <span className="w-1.5 h-1.5 mt-2 bg-current rounded-full opacity-40 flex-shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                {section.type === "skills" &&
                  section.categories.map((cat, i) => (
                    <div key={i} className="mb-6">
                      <p className="text-xs uppercase opacity-50 font-semibold mb-1">
                        {cat.label}
                      </p>
                      <p className="text-sm">{cat.value}</p>
                    </div>
                  ))}

                {section.type === "bullets" && (
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
