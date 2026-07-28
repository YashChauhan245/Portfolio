import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  Smile,
  Zap,
  BookOpen,
  Plus,
  Search,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
  mood: "happy" | "productive" | "reflective" | "excited" | "challenging";
}

interface JournalProps {
  isDark: boolean;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "1",
    date: "2026-06-15",
    title: "Toothly & EchoDesk Shipped to Production!",
    category: "SaaS Launch",
    content: `Shipped two major SaaS applications today:

1. Toothly (AI Dental Platform):
- Integrated real-time voice calls via Vapi SDK with audio latency under 250ms and live transcription.
- Implemented appointment booking flows with dentist availability management and transactional email confirmations via Resend.
- Role-bounded Admin dashboard and subscription-gated AI tiers (ai_basic, ai_pro) powered by Clerk billing.

2. EchoDesk (Enterprise B2B Support Platform):
- Built a zero-dependency client-side embeddable JavaScript widget (chatbot.js) for live customer websites.
- Engineered knowledge ingestion parsing PDFs (pdf-parse) and web URLs into context-aware AI payloads.
- Scalekit WebAuthn/Passkey SSO and Razorpay HMAC signature subscription verification.`,
    mood: "excited",
  },
  {
    id: "2",
    date: "2026-05-10",
    title: "FinSight Analytics & MoM Anomaly Engine",
    category: "Architecture",
    content: `Architected FinSight personal finance application using Next.js 15 Server Actions, PostgreSQL (Neon), and Prisma v6 ORM:

- Engineered an automated Month-over-Month Anomaly Detection Engine identifying spending spikes over 30%.
- Context-aware financial assistant leveraging Google Gemini AI to analyze 90 days of transaction data with zero-latency streaming.
- Inngest background job queues for automated monthly budget burn-rate alerts via Resend API and Arcjet rate-limiting security.`,
    mood: "productive",
  },
  {
    id: "3",
    date: "2026-03-28",
    title: "Voxora WebRTC & AI Tutor Integration",
    category: "Real-Time Systems",
    content: `Engineered Voxora real-time language exchange platform:

- P2P video call rooms and WebSocket text chat powered by GetStream SFU network.
- Integrated Google Gemini AI for real-time tone-aware translation and grammar explanation.
- Native browser audio recorder compiling WebM Blobs into playable inline voice note attachments.
- Designed obsidian-purple dark theme with permanent subtle outlines and Framer Motion micro-animations.`,
    mood: "excited",
  },
  {
    id: "4",
    date: "2026-02-20",
    title: "Top 3 Finish at CodeZen 2026 & Build X: NSIT!",
    category: "Hackathons",
    content: `Secured Top 3 finish at CodeZen 2026 and Top 8 at Build X: NSIT!

- Built and pitched full-stack AI prototypes under intense 36-hour time constraints.
- Integrated Google Gemini streaming APIs and WebSocket state synchronization under real-time hackathon judging criteria.
- Total hackathon track record: 15+ hackathons participated with 5+ Top 5 finishes.`,
    mood: "happy",
  },
  {
    id: "5",
    date: "2026-01-15",
    title: "400+ LeetCode Solved & DSA Supreme 3.0 Certified",
    category: "Algorithms & DSA",
    content: `Earned DSA Supreme 3.0 certification by Love Babbar (Serial No. 4147WVAI) and crossed 400+ solved problems on LeetCode!

- Deep dive into Graph algorithms (Dijkstra, Tarjan, Topo Sort), Dynamic Programming (Knapsack, LCS, Bitmasking), Segment Trees, and Sliding Window techniques.
- Practiced low-level & high-level system design patterns for scalable Web systems.`,
    mood: "productive",
  },
  {
    id: "6",
    date: "2025-06-02",
    title: "Day 1 at DRDO — Scientific Analysis Group (Ministry of Defence)",
    category: "Internship",
    content: `Today was Day 1 of my Frontend Development Internship at DRDO (Scientific Analysis Group, Ministry of Defence) in New Delhi! (June 2, 2025 – July 31, 2025)

- Joined the team for developing an IEEE Document Formatter tool for researchers and defense scientists.
- Designed and built a responsive multi-page UI including login/signup, file upload, and dual-panel live editor with real-time LaTeX-compiled PDF previews.
- Integrated REST API endpoints with Ollama Phi-3 Mini AI model for automated abstract summarization and IEEE-compliant PDF output.`,
    mood: "reflective",
  },
];

const moodIcons = {
  happy: Smile,
  productive: Zap,
  reflective: BookOpen,
  excited: Sparkles,
  challenging: Zap,
};

const moodColors = {
  happy: "#34c759",
  productive: "#007aff",
  reflective: "#af52de",
  excited: "#ff9500",
  challenging: "#ff3b30",
};

export default function Journal({ isDark }: JournalProps) {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(JOURNAL_ENTRIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const filteredEntries = JOURNAL_ENTRIES.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div
      className={`flex w-full h-full overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed inset-y-0 left-0 z-50 w-80 border-r flex flex-col
          md:relative md:translate-x-0 md:z-0
          ${isDark ? "border-white/10 bg-[#1e1e1e]" : "border-black/10 bg-white"}
        `}
      >
        {/* Header */}
        <div
          className={`p-4 border-b ${isDark ? "border-white/10" : "border-black/10"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Engineering Journal
            </h2>
            <div className="flex items-center gap-1">
              <button
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-gray-600"}`}
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg md:hidden ${isDark ? "text-white/70" : "text-gray-600"}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? "bg-white/5" : "bg-black/5"}`}
          >
            <Search
              className={`w-4 h-4 ${isDark ? "text-white/40" : "text-black/40"}`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries & tech..."
              className={`flex-1 bg-transparent outline-none text-sm ${
                isDark
                  ? "text-white placeholder:text-white/30"
                  : "text-gray-900 placeholder:text-black/40"
              }`}
            />
          </div>
        </div>

        {/* Scrollable Entry List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredEntries.map((entry) => {
            const MoodIcon = moodIcons[entry.mood];
            const isSelected = selectedEntry?.id === entry.id;

            return (
              <button
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className={`w-full p-4 text-left border-b transition-all border-transparent ${
                  isDark ? "border-b-white/5" : "border-b-black/5"
                } ${
                  isSelected
                    ? isDark
                      ? "bg-white/10 border-l-4 border-l-blue-500"
                      : "bg-blue-50 border-l-4 border-l-blue-500"
                    : isDark
                      ? "hover:bg-white/5"
                      : "hover:bg-black/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${moodColors[entry.mood]}15` }}
                  >
                    <MoodIcon
                      className="w-5 h-5"
                      style={{ color: moodColors[entry.mood] }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3
                        className={`font-semibold text-sm truncate ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {entry.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                        {entry.category}
                      </span>
                      <span className={`text-[11px] font-mono ${isDark ? "text-white/40" : "text-gray-400"}`}>
                        {entry.date}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDark ? "text-white/50" : "text-gray-600"}`}
                    >
                      {entry.content}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div
          className={`flex items-center justify-between p-4 border-b md:hidden ${isDark ? "border-white/10 bg-[#0a0a0a]" : "border-black/10 bg-white"}`}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg ${isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-black/5"}`}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Engineering Journal
          </span>
          <div className="w-10" />
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedEntry ? (
              <motion.div
                key={selectedEntry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <button
                  onClick={() => setSelectedEntry(null)}
                  className={`md:hidden flex items-center gap-2 mb-6 text-sm font-medium ${isDark ? "text-white/60" : "text-gray-500"}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to List
                </button>

                <header className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${moodColors[selectedEntry.mood]}20`,
                      }}
                    >
                      {(() => {
                        const Icon = moodIcons[selectedEntry.mood];
                        return (
                          <Icon
                            className="w-7 h-7"
                            style={{ color: moodColors[selectedEntry.mood] }}
                          />
                        );
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">
                        {selectedEntry.category}
                      </span>
                      <h1
                        className={`text-2xl sm:text-3xl font-bold tracking-tight mt-2 ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {selectedEntry.title}
                      </h1>
                      <div
                        className={`flex items-center gap-2 mt-1.5 text-xs font-mono ${isDark ? "text-white/40" : "text-gray-500"}`}
                      >
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {formatDate(selectedEntry.date)}
                      </div>
                    </div>
                  </div>
                </header>

                <article
                  className={`text-base leading-relaxed whitespace-pre-wrap ${isDark ? "text-white/80" : "text-gray-700"}`}
                >
                  {selectedEntry.content}
                </article>

                <div className="mt-12 pt-8 border-t border-dashed border-gray-200 dark:border-white/10">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${moodColors[selectedEntry.mood]}20`,
                      color: moodColors[selectedEntry.mood],
                    }}
                  >
                    Mood: {selectedEntry.mood}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${isDark ? "bg-white/5 text-white/20" : "bg-black/5 text-black/20"}`}
                >
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-white/60" : "text-gray-400"}`}
                >
                  Select an entry to start reading
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
