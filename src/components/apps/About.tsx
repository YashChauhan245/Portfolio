import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";

interface AboutProps {
  isDark: boolean;
}

import { MacOSHero } from "./HeroSection";

const SOCIAL_LINKS = [
  {
    icon: Github,
    url: "https://github.com/YashChauhan245",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    url: "https://linkedin.com/in/yash-chauhan-245",
    label: "LinkedIn",
  },
  { icon: Mail, url: "mailto:yashchau.work@gmail.com", label: "Email" },
];

const STATS = [
  { label: "Projects", value: "6+" },
  { label: "LeetCode", value: "350+" },
  { label: "CGPA", value: "8.5" },
  { label: "Hackathons", value: "15+" },
];

export function About({ isDark }: AboutProps) {
  return (
    <div
      className={`w-full h-full overflow-auto ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      {/* Hero Section */}
      <div className="relative">
        <MacOSHero isDark={isDark} />

        {/* Profile Section */}
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-32 h-32 rounded-2xl border-4 ${
                isDark
                  ? "border-[#0a0a0a] bg-[#1e1e1e]"
                  : "border-gray-50 bg-white"
              } flex items-center justify-center overflow-hidden shadow-xl`}
            >
              <div
                className={`w-full h-full flex items-center justify-center text-4xl font-bold ${
                  isDark
                    ? "bg-gradient-to-br from-[#012042] to-[#55047e] text-white"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                }`}
              >
                YC
              </div>
            </motion.div>
          </div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Yash Chauhan
            </h1>
            <p
              className={`text-lg ${isDark ? "text-white/60" : "text-gray-600"}`}
            >
              Full-Stack Web Developer & SDE
            </p>
          </motion.div>

          {/* Location & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mt-3"
          >
            <div
              className={`flex items-center gap-1 text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}
            >
              <MapPin className="w-4 h-4" />
              <span>New Delhi, India</span>
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Open to SDE Roles</span>
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>B.Tech CSE (2023 - 2027)</span>
            </div>
          </motion.div>

          {/* Social Links & Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-4 mt-4"
          >
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl transition-all duration-200 ${
                      isDark
                        ? "bg-white/10 hover:bg-white/20 text-white hover:scale-105"
                        : "bg-black/10 hover:bg-black/20 text-gray-700 hover:scale-105"
                    }`}
                    title={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openApp", { detail: "resume" })
                  )
                }
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>📄 View Resume</span>
              </button>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openApp", { detail: "projects" })
                  )
                }
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>🚀 Projects (6)</span>
              </button>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openApp", { detail: "contact" })
                  )
                }
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? "border-white/20 hover:bg-white/10 text-white"
                    : "border-black/20 hover:bg-black/5 text-gray-800"
                }`}
              >
                <span>✉️ Contact</span>
              </button>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`mt-6 p-5 rounded-2xl ${
              isDark ? "bg-white/5" : "bg-white"
            }`}
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <h2
              className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              About Me
            </h2>
            <p
              className={`leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}
            >
              Final-year CSE undergraduate (CGPA 8.5/10) with hands-on experience building full-stack web applications, B2B SaaS platforms, and real-time systems using Next.js 15, React 19, Node.js, Express, TypeScript, PostgreSQL, and MongoDB.
            </p>
            <p
              className={`leading-relaxed mt-3 ${isDark ? "text-white/70" : "text-gray-600"}`}
            >
              Completed a frontend development internship at DRDO (Ministry of Defence) and independently shipped live full-stack products spanning multi-tenant SaaS, AI dental care platforms, financial analytics, and WebRTC language exchange platforms. Solved 350+ DSA problems on LeetCode. Seeking a Software Development Engineer (SDE) role.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className={`p-4 rounded-2xl text-center ${
                  isDark ? "bg-white/5" : "bg-white"
                }`}
                style={{
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <div
                  className={`text-2xl font-bold ${isDark ? "text-[#007aff]" : "text-blue-600"}`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-gray-500"}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`mt-6 p-5 rounded-2xl ${
              isDark ? "bg-white/5" : "bg-white"
            }`}
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Education
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? "bg-[#007aff]/20" : "bg-blue-100"
                  }`}
                >
                  <GraduationCap
                    className={`w-5 h-5 ${isDark ? "text-[#007aff]" : "text-blue-600"}`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    B.Tech in Computer Science & Engineering
                  </h3>
                  <p
                    className={`text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}
                  >
                    Guru Tegh Bahadur 4th Centenary Engineering College (GGSIPU)
                  </p>
                  <p
                    className={`text-sm ${isDark ? "text-white/40" : "text-gray-500"}`}
                  >
                    CGPA: 8.5 / 10 | 2023 – 2027 | New Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`mt-6 p-5 rounded-2xl ${
              isDark ? "bg-white/5" : "bg-white"
            }`}
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            }}
          >
            <h2
              className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Achievements & Certifications
            </h2>
            <ul
              className={`space-y-3 ${isDark ? "text-white/70" : "text-gray-600"}`}
            >
              <li className="flex items-start gap-2">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-[#007aff]" : "bg-blue-500"}`}
                />
                <span>
                  DSA Supreme 3.0 — Certificate of Completion, Code Help by Love Babbar (Jan 2026, Serial No. 4147WVAI)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-[#007aff]" : "bg-blue-500"}`}
                />
                <span>
                  Solved 350+ problems on LeetCode with strong command of arrays, trees, graphs, DP, and sliding window techniques.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-[#007aff]" : "bg-blue-500"}`}
                />
                <span>
                  Participated in 15+ hackathons with Top 5 finishes in 5+, including Top 10 at CodeZen 2026 & 2025 and Top 8 at Build X: NSIT.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
