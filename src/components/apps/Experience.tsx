import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  ChevronDown,
  Code2,
  Users,
  Trophy,
} from "lucide-react";

interface Job {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  gradient: string;
  iconColor: string;
}

const EXPERIENCES: Job[] = [
  {
    id: "drdo",
    company: "DRDO, Scientific Analysis Group (Ministry of Defence)",
    role: "Frontend Development Intern",
    type: "On-site / Internship",
    location: "New Delhi, India",
    startDate: "June 2, 2025",
    endDate: "July 31, 2025",
    description: [
      "Designed and developed a responsive, multi-page frontend for an IEEE Document Formatter tool, including login/signup, file upload, and a dual-panel live editor with real-time LaTeX-compiled PDF preview.",
      "Integrated the frontend with backend REST API endpoints to enable AI-powered content generation (Ollama Phi-3 Mini) and IEEE-compliant PDF output.",
      "Collaborated cross-functionally with a team of 3 to ship production-ready UI modules following scientific documentation standards.",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "REST APIs",
      "Python",
      "LaTeX",
      "Ollama AI (Phi-3 Mini)",
    ],
    gradient: "from-primary to-blue-500",
    iconColor: "text-primary",
  },
];

interface LeadershipItem {
  icon: typeof Building2;
  title: string;
  organization: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const LEADERSHIP: LeadershipItem[] = [
  {
    icon: Trophy,
    title: "Hackathon Finalist & Top Finisher",
    organization: "CodeZen Hackathons & Build X: NSIT",
    description:
      "Participated in 15+ hackathons with Top 5 finishes in 5+, including Top 3 at CodeZen 2026 & 2025 and Top 8 at Build X: NSIT.",
    gradient: "from-warning to-orange-400",
    iconColor: "text-warning",
  },
  {
    icon: Code2,
    title: "DSA Supreme 3.0 Specialist",
    organization: "Code Help by Love Babbar",
    description:
      "Completed certification (Serial No. 4147WVAI) and solved 400+ algorithmic problems on LeetCode.",
    gradient: "from-accent to-pink-500",
    iconColor: "text-accent",
  },
  {
    icon: Users,
    title: "Full-Stack Project Architect",
    organization: "Independent Open Source Products",
    description:
      "Independently engineered and deployed live full-stack products including EchoDesk, FinSight, Voxora, Yumzo, and Path AI.",
    gradient: "from-success to-teal-400",
    iconColor: "text-success",
  },
];

export function Experience() {
  const [expandedJobs, setExpandedJobs] = useState<string[]>(["drdo"]);

  const toggleExpanded = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-auto">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Building innovative solutions and leading development teams across
            various domains.
          </p>
        </motion.header>

        {/* Timeline */}
        <section className="mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

            {/* Experience Cards */}
            <div className="space-y-6">
              {EXPERIENCES.map((job, index) => {
                const isExpanded = expandedJobs.includes(job.id);

                return (
                  <motion.article
                    key={job.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className={`absolute left-2 sm:left-4 top-6 timeline-dot border-primary ${isExpanded ? "timeline-dot-active bg-primary" : "bg-background"}`}
                      whileHover={{ scale: 1.2 }}
                      style={{ color: "hsl(var(--primary))" }}
                    />

                    {/* Card */}
                    <motion.div
                      className="glass-card-hover overflow-hidden"
                      whileHover={{ y: -2 }}
                    >
                      {/* Card Header */}
                      <button
                        onClick={() => toggleExpanded(job.id)}
                        className="w-full p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {/* Company Icon */}
                            <div
                              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${job.gradient} p-0.5 flex-shrink-0`}
                            >
                              <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                                <Building2
                                  className={`w-5 h-5 sm:w-6 sm:h-6 ${job.iconColor}`}
                                />
                              </div>
                            </div>

                            <div className="min-w-0">
                              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 leading-tight">
                                {job.role}
                              </h3>
                              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                                {job.company}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {job.startDate} — {job.endDate}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {job.location}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  {job.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/50">
                              <div className="pt-5">
                                {/* Achievements */}
                                <ul className="space-y-3 mb-6">
                                  {job.description.map((item, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="flex items-start gap-3 text-sm sm:text-base text-foreground/80"
                                    >
                                      <span
                                        className={`experience-bullet bg-gradient-to-br ${job.gradient}`}
                                      />
                                      <span className="leading-relaxed">
                                        {item}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>

                                {/* Technologies */}
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                    Technologies
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {job.technologies.map((tech, i) => (
                                      <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + i * 0.05 }}
                                        className="tech-badge"
                                      >
                                        {tech}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Leadership & Activities
            </h2>
          </div>

          <div className="grid gap-4">
            {LEADERSHIP.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="glass-card p-5 transition-all duration-300 hover:border-border/80"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 flex-shrink-0`}
                    >
                      <div className="w-full h-full rounded-[9px] bg-card flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1.5">
                        {item.organization}
                      </p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Experience;
