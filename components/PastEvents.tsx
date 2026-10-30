"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, X, ArrowUpRight } from "lucide-react";
import { Section, SectionHead, revealUp, stagger } from "./ui/kit";

type Category = "Hackathon" | "Dev Day" | "Meetup" | "Workshop";

interface PastEventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: string;
  category: Category;
  desc: string;
  highlights: string[];
}

/** One tone per category — resolves per theme via CSS vars. */
const TONE: Record<Category, string> = {
  Hackathon: "var(--s4)",
  "Dev Day": "var(--s2)",
  Workshop: "var(--s1)",
  Meetup: "var(--s5)",
};

const PAST_EVENTS: PastEventItem[] = [
  {
    id: 1,
    title: "TIC National Hackathon",
    date: "Apr 03, 2026",
    location: "TIT Bhopal",
    attendees: "250+ Hackers",
    category: "Hackathon",
    desc: "Technocats Innovation Challange is a 36-hour offline hackathon organised by Knowvy Technologies and Vexite Studio.",
    highlights: ["50 Teams", "₹100k Prize Pool", "National Hachathon"],
  },
  {
    id: 2,
    title: "MS Build Bhopal",
    date: "May 18, 2025",
    location: "Vexite Labs, Bhopal",
    attendees: "220+ Participants",
    category: "Dev Day",
    desc: "An flagship event bringing Microsoft technologies, Azure AI, and modern web architectures to students in Bhopal with live keynote streaming & hands-on labs.",
    highlights: ["Azure AI Workshop", "Keynote Stream", "Swag & Certification"],
  },
  {
    id: 3,
    title: "GitHub Copilot Dev Days",
    date: "Jul 12, 2025",
    location: "SIRT Campus, Bhopal",
    attendees: "180+ Developers",
    category: "Workshop",
    desc: "Interactive session exploring AI-assisted software development, rapid prototyping with GitHub Copilot, and automated unit test generation.",
    highlights: ["Copilot Pro Access", "Live PR Challenge", "Developer Badges"],
  },
  {
    id: 4,
    title: "Miro Meetup Bhopal",
    date: "Jul 05, 2026",
    location: "Interactive Startup Hub, Bhopal",
    attendees: "140+ Designers & Coders",
    category: "Meetup",
    desc: "Visual collaboration meetup focused on system design diagramming, UX wireframing, and product management workflows for student founders.",
    highlights: ["Miro Swag Kits", "System Design Slam", "Networking Dinner"],
  },
  {
    id: 5,
    title: "Hacktoberfest Bhopal 2k26",
    date: "Nov 20–21, 2025",
    location: "Bhopal / Hybrid",
    attendees: "150+ Hackers",
    category: "Hackathon",
    desc: "A day full of open-source building, communications and contributions. And an intense hackathon where student teams built autonomous multi-agent systems, LangChain workflows, and AI vector database tools.",
    highlights: ["₹1.5L Prize Pool", "VC Mentorship", "4 Funded Prototypes"],
  },
  {
    id: 6,
    title: "AWS Builder Day",
    date: "Dec 14, 2025",
    location: "Sharma Computer Academy, Bhopal",
    attendees: "160+ Participants",
    category: "Dev Day",
    desc: "Deep dive into AWS cloud architecture, container deployments, and hands-on cloud labs for student developers.",
    highlights: ["AWS Cloud Labs", "Serverless Architecture", "Cloud Credits"],
  },
  {
    id: 7,
    title: "LYZR AI Build Day",
    date: "Aug 23, 2026",
    location: "Online / Discord",
    attendees: "210+ Contributors",
    category: "Workshop",
    desc: "A room full of builder and developers for a discussion on Agentic AI and building personal Agents.",
    highlights: ["48 Agents Created", "First-time Contributor Badges", "T-Shirt Giveaways"],
  },
  {
    id: 8,
    title: "CodeSprint Bhopal",
    date: "Mar 15, 2026",
    location: "LNCT University, Bhopal",
    attendees: "300+ Coders",
    category: "Hackathon",
    desc: "Competitive programming and rapid MVP development sprint testing algorithmic efficiency and full-stack deployment skills under time limits.",
    highlights: ["Competitive Leaderboard", "Mentorship Sessions", "Placement Referrals"],
  },
];

export function PastEvents() {
  const [selected, setSelected] = useState<PastEventItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <Section id="past-events">
      <SectionHead
        index="03"
        eyebrow="Past events & highlights"
        title="Proven track record"
        aside="Explore our flagship past events, developer days, and hackathons hosted for students across Bhopal."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PAST_EVENTS.map((evt) => (
          <motion.li key={evt.id} variants={revealUp}>
            <button
              onClick={() => setSelected(evt)}
              className="u-card group flex h-full w-full flex-col justify-between p-6 text-left"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="u-label-sm shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5"
                    style={{ background: TONE[evt.category], color: "var(--bg-2)" }}
                  >
                    {evt.category}
                  </span>
                  <span className="u-label-sm inline-flex items-center gap-1.5 text-right leading-[1.6] text-muted-foreground">
                    <Users size={11} /> {evt.attendees}
                  </span>
                </div>

                <h3 className="u-display mt-7 text-[1.375rem] leading-[0.95]">
                  {evt.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {evt.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <span className="u-label-sm inline-flex items-center gap-1.5 text-muted-foreground">
                  <Calendar size={11} /> {evt.date}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                />
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Detail dialog */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-5 backdrop-blur-md"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-xl rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-lift)] md:p-9"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <X size={15} />
              </button>

              <span
                className="u-label-sm inline-block rounded-full px-2.5 py-1.5"
                style={{ background: TONE[selected.category], color: "var(--bg-2)" }}
              >
                {selected.category}
              </span>

              <h3 className="u-display mt-5 text-[clamp(1.75rem,5vw,2.5rem)] leading-[0.92]">
                {selected.title}
              </h3>

              <div className="u-label-sm mt-5 flex flex-wrap gap-x-5 gap-y-2.5 text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} /> {selected.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} /> {selected.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={12} /> {selected.attendees}
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {selected.desc}
              </p>

              <div className="mt-7 border-t border-border pt-6">
                <span className="u-label-sm text-muted-foreground">
                  Highlights & perks
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {selected.highlights.map((h) => (
                    <li key={h} className="u-chip u-label-sm text-foreground">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="u-btn u-btn-invert mt-8 w-full"
              >
                Close highlights
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
