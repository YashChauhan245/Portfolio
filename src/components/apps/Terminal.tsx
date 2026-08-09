import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  isDark: boolean;
}

interface Command {
  input: string;
  output: string[];
  isTyping?: boolean;
}

interface FileSystem {
  [key: string]: {
    type: "file" | "directory";
    content?: string;
    children?: string[];
  };
}

// Virtual file system based on Yash Chauhan's Resume
const FILE_SYSTEM: FileSystem = {
  "~": {
    type: "directory",
    children: [
      "about.txt",
      "projects",
      "skills",
      "experience",
      "contact",
      "resume.pdf",
      "README.md",
    ],
  },
  "~/about.txt": {
    type: "file",
    content: `Name: Yash Chauhan
Role: Full-Stack Web Developer & SDE
Location: New Delhi, India
Education: B.Tech in CSE (GGSIPU GTB4CEC, CGPA: 8.5/10)
LeetCode: 400+ Problems Solved

Final-year CSE undergraduate with hands-on experience 
building full-stack web applications, B2B SaaS platforms, 
and real-time AI systems. Completed a frontend development 
internship at DRDO (Ministry of Defence).`,
  },
  "~/README.md": {
    type: "file",
    content: `# Welcome to Yash's Portfolio Terminal

## Quick Commands
- about       - Learn about me
- projects    - View my production projects
- skills      - See my technical skills
- experience  - View work experience
- contact     - Get in touch
- resume      - Download my resume

## System Commands
- ls / dir    - List files
- cd [dir]    - Change directory
- pwd         - Print working directory
- clear       - Clear terminal
- help        - Show all commands
`,
  },
  "~/projects": {
    type: "directory",
    children: [
      "EchoDesk.txt",
      "FinSight.txt",
      "Voxora.txt",
      "Yumzo.txt",
      "PathAI.txt",
    ],
  },
  "~/projects/FinSight.txt": {
    type: "file",
    content: `FinSight - AI Financial Intelligence & Cashflow Analytics Platform
Tech: Next.js 15, React 19, NextAuth.js (v5), PostgreSQL (Neon), Prisma v6, Google Gemini AI, Inngest, Resend, Arcjet
Features: Real-time cashflow analytics, MoM anomaly detection, OCR receipt scanning, budget burn-rate alerts.`,
  },
  "~/projects/EchoDesk.txt": {
    type: "file",
    content: `EchoDesk - Enterprise B2B Support Platform & Embeddable Chatbot
Tech: Next.js, MongoDB, Mongoose, Scalekit (SSO/Passkeys), Google Gemini AI, Razorpay, pdf-parse, html-to-text
Features: Zero-dependency 1-line client widget, RAG knowledge ingestion, Scalekit SSO, Razorpay subscriptions.`,
  },
  "~/projects/Voxora.txt": {
    type: "file",
    content: `Voxora - AI-Augmented Language Exchange & WebRTC Social Platform
Tech: React 19, Vite, Tailwind CSS, TanStack Query, Zustand, Node.js, Express, MongoDB, GetStream WebRTC, Gemini AI
Features: Real-time WebSocket chat, WebRTC video rooms, inline Gemini AI tutor, native voice notes.`,
  },
  "~/projects/Yumzo.txt": {
    type: "file",
    content: `Yumzo - Production-Ready Food Delivery Platform
Tech: React 19, Vite, Tailwind CSS v4, Socket.io, Node.js, Express, Prisma ORM, Supabase PostgreSQL, JWT
Features: 3-role portal (Customer/Driver/Admin), real-time order tracking, driver GPS, group ordering.`,
  },
  "~/projects/PathAI.txt": {
    type: "file",
    content: `Path AI - AI-First Career Guidance Workspace & ATS Optimizer
Tech: Next.js 15, React 19, PostgreSQL (Neon), Prisma ORM, Auth.js (v5), Google Gemini API, Inngest, Tailwind CSS
Features: ATS resume scoring, AI cover letter generator, interactive mock interview prep, assistant chat.`,
  },
  "~/skills": {
    type: "directory",
    children: [
      "languages.txt",
      "frontend.txt",
      "backend.txt",
      "database.txt",
      "auth.txt",
      "ai.txt",
    ],
  },
  "~/skills/languages.txt": {
    type: "file",
    content: "JavaScript (ES6+), TypeScript, Python, C++, SQL, HTML5, CSS3",
  },
  "~/skills/frontend.txt": {
    type: "file",
    content: "React 19, Next.js 15 (App Router), Tailwind CSS (v3/v4), TanStack Query, Redux, Zustand, Radix UI, ShadCN, GSAP, Vite",
  },
  "~/skills/backend.txt": {
    type: "file",
    content: "Node.js, Express.js, Next.js Server Actions, REST APIs, WebSockets & Socket.io, WebRTC, GetStream SDK",
  },
  "~/skills/database.txt": {
    type: "file",
    content: "PostgreSQL, Neon (Serverless Postgres), MongoDB, Mongoose ODM, Prisma ORM (v6), SQLite",
  },
  "~/skills/auth.txt": {
    type: "file",
    content: "Clerk Auth, NextAuth.js (v5), Scalekit (SSO/Passkeys), JWT & Bcrypt, Arcjet, HMAC Verification",
  },
  "~/skills/ai.txt": {
    type: "file",
    content: "Google Gemini API, Vapi Voice SDK, Ollama AI (Phi-3 Mini), Inngest, Resend, Razorpay API",
  },
  "~/experience": {
    type: "directory",
    children: ["DRDO.txt"],
  },
  "~/experience/DRDO.txt": {
    type: "file",
    content: `Frontend Development Intern
DRDO, Scientific Analysis Group (Ministry of Defence) | June 2, 2025 - July 31, 2025

- Developed responsive frontend for IEEE Document Formatter tool with live LaTeX-compiled preview.
- Integrated backend REST APIs for AI content generation (Ollama Phi-3 Mini) and IEEE compliant PDF output.`,
  },
  "~/contact": { type: "directory", children: ["email.txt", "social.txt"] },
  "~/contact/email.txt": {
    type: "file",
    content: "yashchau.work@gmail.com",
  },
  "~/contact/social.txt": {
    type: "file",
    content:
      "Portfolio: https://iamyashchauhan.vercel.app/\nGitHub: https://github.com/YashChauhan245\nLinkedIn: https://www.linkedin.com/in/yash-chauhan-02b13a3b2\nLeetCode: https://leetcode.com/u/Yash_Chauhan24/",
  },
  "~/resume.pdf": {
    type: "file",
    content: "[Yash Chauhan Resume PDF File ready for download]",
  },
};

const WELCOME_MESSAGE = [
  "Welcome to Yash's Portfolio Terminal",
  'Type "help" to see available commands',
  "",
];

const COLOR_CODES: Record<string, string> = {
  "30": "color: #000000;",
  "31": "color: #ff5f56;",
  "32": "color: #27c93f;",
  "33": "color: #ffbd2e;",
  "34": "color: #007aff;",
  "35": "color: #af52de;",
  "36": "color: #5ac8fa;",
  "37": "color: #ffffff;",
  "90": "color: #8e8e93;",
  "1": "font-weight: bold;",
};

const parseAnsi = (text: string): { text: string; styles: string } => {
  const ansiRegex = /\x1b\[(\d+)m/g;
  let result = text;
  let styles = "";
  let match;

  while ((match = ansiRegex.exec(text)) !== null) {
    const code = match[1];
    if (COLOR_CODES[code]) {
      styles += COLOR_CODES[code];
    }
    result = result.replace(match[0], "");
  }

  return { text: result, styles };
};

export function Terminal({ isDark }: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const promptColor = "#34c759";

  useEffect(() => {
    setCommands([{ input: "", output: WELCOME_MESSAGE, isTyping: false }]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const getPath = (input: string): string => {
    if (input === ".") return currentDir;
    if (input === "..") {
      if (currentDir === "~") return "~";
      const parts = currentDir.split("/");
      return parts.length > 1 ? parts.slice(0, -1).join("/") : "~";
    }
    if (input.startsWith("~/")) return input;
    if (input.startsWith("/")) return "~" + input;
    if (input === "~") return "~";
    return currentDir === "~" ? `~/${input}` : `${currentDir}/${input}`;
  };

  const executeCommand = (input: string): string[] => {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        return [
          "╔═══════════════════════════════════════════════════╗",
          "║               AVAILABLE COMMANDS                  ║",
          "╠═══════════════════════════════════════════════════╣",
          "\x1b[36m│ Navigation:                                       │\x1b[0m",
          "\x1b[90m│   ls, dir       - List directory contents         │\x1b[0m",
          "\x1b[90m│   cd [dir]      - Change directory                │\x1b[0m",
          "\x1b[90m│   pwd           - Print working directory         │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[36m│ Portfolio:                                        │\x1b[0m",
          "\x1b[90m│   about         - Learn about me                  │\x1b[0m",
          "\x1b[90m│   projects      - View my projects                │\x1b[0m",
          "\x1b[90m│   skills        - See my technical skills         │\x1b[0m",
          "\x1b[90m│   experience    - View work experience            │\x1b[0m",
          "\x1b[90m│   contact       - Get in touch                    │\x1b[0m",
          "\x1b[90m│   resume        - Download resume                 │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[36m│ System:                                           │\x1b[0m",
          "\x1b[90m│   open [app]    - Open Apps e.g.projects, journal │\x1b[0m",
          "\x1b[90m│   clear         - Clear terminal                  │\x1b[0m",
          "\x1b[90m│   whoami        - Display user info               │\x1b[0m",
          "\x1b[90m│   date          - Show current date/time          │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
        ];

      case "ls":
      case "dir": {
        const path = getPath(args[0] || ".");
        const item = FILE_SYSTEM[path];
        if (!item)
          return [
            `\x1b[31mls: cannot access '${args[0]}': No such file or directory\x1b[0m`,
            "",
          ];
        if (item.type === "file") return [args[0]];
        const children = item.children || [];
        return [
          children
            .map((child) => {
              const childPath =
                path === "~" ? `~/${child}` : `${path}/${child}`;
              const childItem = FILE_SYSTEM[childPath];
              if (childItem?.type === "directory")
                return `\x1b[34m${child}/\x1b[0m`;
              if (child.endsWith(".txt") || child.endsWith(".md"))
                return `\x1b[32m${child}\x1b[0m`;
              return child;
            })
            .join("    "),
        ];
      }

      case "cd": {
        const target = args[0] || "~";
        const path = getPath(target);
        const item = FILE_SYSTEM[path];
        if (!item)
          return [
            `\x1b[31mcd: no such file or directory: ${target}\x1b[0m`,
            "",
          ];
        if (item.type !== "directory")
          return [`\x1b[31mcd: not a directory: ${target}\x1b[0m`, ""];
        setCurrentDir(path);
        return [];
      }

      case "pwd":
        return [`/home/yash/${currentDir.replace("~", "")}`];

      case "about":
        return FILE_SYSTEM["~/about.txt"].content?.split("\n") || [];

      case "projects":
        return [
          "\x1b[33mYash's Projects:\x1b[0m",
          "1. EchoDesk   - Enterprise B2B Support & Embeddable Chatbot Engine",
          "2. FinSight   - AI Financial Intelligence & Analytics Platform",
          "3. Voxora     - AI-Augmented Language Exchange Platform",
          "4. Yumzo      - Production Food Delivery Platform",
          "5. Path AI    - AI-First Career Guidance Workspace",
          "",
          "Use 'cd projects' then 'ls' to explore individual project files.",
        ];

      case "skills":
        return [
          "\x1b[1mMy Tech Stack:\x1b[0m",
          `\x1b[32mLanguages:\x1b[0m ${FILE_SYSTEM["~/skills/languages.txt"].content}`,
          `\x1b[32mFrontend:\x1b[0m  ${FILE_SYSTEM["~/skills/frontend.txt"].content}`,
          `\x1b[32mBackend:\x1b[0m   ${FILE_SYSTEM["~/skills/backend.txt"].content}`,
          `\x1b[32mDatabases:\x1b[0m ${FILE_SYSTEM["~/skills/database.txt"].content}`,
          `\x1b[32mAuth & Sec:\x1b[0m ${FILE_SYSTEM["~/skills/auth.txt"].content}`,
          `\x1b[32mAI Integrations:\x1b[0m ${FILE_SYSTEM["~/skills/ai.txt"].content}`,
        ];

      case "experience":
        return [
          "\x1b[1mWork Experience:\x1b[0m",
          "",
          "\x1b[33mDRDO, Scientific Analysis Group (Ministry of Defence)\x1b[0m (Frontend Intern)",
          "Developed IEEE Document Formatter tool with live LaTeX-compiled preview & AI content generation.",
        ];

      case "contact":
        return FILE_SYSTEM["~/contact/social.txt"].content?.split("\n") || [];

      case "resume":
        const link = document.createElement("a");
        link.href = "/YashChauhan_resume.pdf";
        link.download = "Yash_Chauhan_Resume.pdf";
        link.click();
        return ["\x1b[32m✓ Resumé download started!\x1b[0m", ""];

      case "open": {
        if (!args[0]) return ["\x1b[31mUsage: open [app_name]\x1b[0m", ""];
        const app = args[0].toLowerCase();
        window.dispatchEvent(new CustomEvent("openApp", { detail: app }));
        return [`\x1b[32mOpening ${app}...\x1b[0m`, ""];
      }

      case "clear":
        return ["__CLEAR__"];

      case "whoami":
        return ["yashchauhan", "Full-Stack Web Developer & SDE", "New Delhi, India", ""];

      case "date":
        return [new Date().toString(), ""];

      case "":
        return [];

      default:
        return [
          `\x1b[31mCommand not found: ${cmd}\x1b[0m`,
          'Type "help" for available commands',
          "",
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const output = executeCommand(currentInput);

    if (output[0] === "__CLEAR__") {
      setCommands([]);
    } else {
      setCommands((prev) => [
        ...prev,
        { input: currentInput, output, isTyping: false },
      ]);
    }

    setHistory((prev) => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCurrentInput(history[history.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className={`w-full h-full p-4 font-mono text-sm overflow-auto ${isDark ? "bg-[#0c0c0c]" : "bg-white"}`}
      onClick={() => inputRef.current?.focus()}
      style={{ lineHeight: "1.6" }}
    >
      <div className="space-y-0.5">
        {commands.map((cmd, i) => (
          <div key={i}>
            {cmd.input && (
              <div
                className={`flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <span style={{ color: promptColor }}>➜</span>
                <span className="text-[#5ac8fa] font-bold">{currentDir}</span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="pb-1">
              {cmd.output.map((line, j) => {
                const { text, styles } = parseAnsi(line);
                const inlineStyles = styles
                  ? Object.fromEntries(
                      styles
                        .split(";")
                        .filter((s) => s)
                        .map((s) => s.split(":").map((v) => v.trim())),
                    )
                  : {};
                return (
                  <div
                    key={j}
                    className="whitespace-pre-wrap"
                    style={inlineStyles}
                  >
                    {text || "\u00A0"}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span className="text-[#5ac8fa] font-bold">{currentDir}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none ${isDark ? "text-white" : "text-gray-900"}`}
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.53,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`w-2 h-5 ${isDark ? "bg-white" : "bg-gray-900"}`}
          />
        </form>
      </div>
    </div>
  );
}
