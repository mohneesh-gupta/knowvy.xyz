"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Users, Calendar, TrendingUp, ShieldCheck } from "lucide-react";
import { Section, Reveal, revealUp, stagger } from "./ui/kit";

const MILESTONES = [
  {
    value: "4,500+",
    label: "Active Members",
    desc: "Students & developers across Bhopal colleges.",
    icon: Users,
  },
  {
    value: "35+",
    label: "Events Hosted",
    desc: "Workshops, Dev Days, and community meetups.",
    icon: Calendar,
  },
  {
    value: "3",
    label: "Hackathon Wins",
    desc: "National level hackathons won by members.",
    icon: Trophy,
  },
  {
    value: "₹5L+",
    label: "Prizes Won",
    desc: "Distributed in hackathons & bug bounties.",
    icon: Award,
  },
  {
    value: "15+",
    label: "Colleges Reached",
    desc: "Active campus ambassador networks.",
    icon: ShieldCheck,
  },
  {
    value: "48+",
    label: "Merged PRs",
    desc: "Open source contributions to major repos.",
    icon: TrendingUp,
  },
];

/* On the lime block everything reads off the ink colour, not the theme tokens. */
const HAIRLINE = "rgba(20,19,26,0.18)";

export function Achievements() {
  return (
    <Section id="achievements" tone="pop" divider={false}>
      <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="u-label inline-flex items-center gap-2.5">
            <span className="inline-block size-1.5 shrink-0 rounded-full bg-current" />
            <span className="opacity-45 tabular-nums">06</span>
            <span>Achievements & milestones</span>
          </span>
          <h2 className="u-display u-d2 mt-6 text-balance">
            Numbers that define our community footprint
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-sm leading-relaxed opacity-70 lg:text-right">
            We measure our growth by the impact created for students in Bhopal —
            from building projects to winning hackathons.
          </p>
        </div>
      </Reveal>

      {/* Numbers grid — hairline separated, no card chrome */}
      <motion.dl
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderTop: `1px solid ${HAIRLINE}` }}
      >
        {MILESTONES.map((item, i) => (
          <motion.div
            key={item.label}
            variants={revealUp}
            className="group px-0 py-9 sm:px-7"
            style={{
              borderBottom: `1px solid ${HAIRLINE}`,
              borderLeft: i % 3 !== 0 ? `1px solid ${HAIRLINE}` : undefined,
            }}
          >
            <div className="flex items-center justify-between">
              <item.icon size={18} strokeWidth={2.2} className="opacity-70" />
              <span className="u-label-sm tabular-nums opacity-45">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <dt className="sr-only">{item.label}</dt>
            <dd className="u-display mt-7 text-[clamp(2.75rem,6vw,4.25rem)] leading-[0.85] transition-transform duration-500 ease-out group-hover:-translate-y-1">
              {item.value}
            </dd>
            <dd className="u-label mt-5">{item.label}</dd>
            <dd className="mt-2.5 text-[0.8125rem] leading-relaxed opacity-65">
              {item.desc}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
}
