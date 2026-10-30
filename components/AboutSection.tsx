"use client";

import { motion } from "framer-motion";
import { Target, MapPin, Code, Calendar } from "lucide-react";
import { Section, SectionHead, Reveal, revealUp, stagger } from "./ui/kit";

const HIGHLIGHTS = [
  {
    title: "Workshops & Hackathons",
    desc: "Hands-on coding sessions and competitive hackathons where you build real projects, solve challenges, and win prizes — all in a high-energy, collaborative environment.",
    icon: MapPin,
    tone: "var(--s1)",
  },
  {
    title: "Events & Meetups",
    desc: "Regular offline gatherings, tech talks, and networking events that connect you with like-minded developers, industry speakers, and the broader tech ecosystem.",
    icon: Calendar,
    tone: "var(--s2)",
  },
  {
    title: "Mentorship & Guidance",
    desc: "One-on-one mentorship from senior developers, open-source maintainers, and startup founders who help you navigate your career and level up faster.",
    icon: Target,
    tone: "var(--s4)",
  },
  {
    title: "Shaping the Leaders",
    desc: "We nurture the next wave of tech leaders by encouraging public building, open-source contributions, and ownership — turning learners into creators who lead by example.",
    icon: Code,
    tone: "var(--s3)",
  },
];

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHead
        index="01"
        eyebrow="About us"
        title={
          <>
            India&rsquo;s student <span className="text-brand">developer</span>{" "}
            ecosystem
          </>
        }
        aside="We are a developer community in India, hosting events, meetups, and hackathons for students and tech enthusiasts looking to build, learn, and grow together. We help the enthusiasts with all essential support required to grow"
      />

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Story */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xl font-medium leading-snug text-foreground md:text-[1.625rem]">
              We believe that college shouldn&rsquo;t limit your engineering
              potential. Knowvy turns curiosity into{" "}
              <span className="text-brand underline decoration-brand/35 underline-offset-[6px]">
                real-world impact
              </span>{" "}
              through community-driven learning.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Founded by students in Bhopal, Knowvy Technologies organizes hands-on
              dev days, flagship hackathons, open-source cohorts, and community
              meetups. Whether you are coding your first line of JavaScript or
              building AI agents, Knowvy gives you the stage, mentorship, and peer
              network to succeed.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap gap-2 border-t border-border pt-7">
              <span className="u-chip u-label-sm">Student-led & community-first</span>
              <span className="u-chip u-label-sm">Free & subsidized learning</span>
              <span className="u-chip u-label-sm">Open-source driven</span>
              <span className="u-chip u-label-sm">Global Target</span>
              <span className="u-chip u-label-sm">Beginner friendly</span>
              <span className="u-chip u-label-sm">Real-world projects</span>
            </div>
          </Reveal>
        </div>

        {/* Highlight cards */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7"
        >
          {HIGHLIGHTS.map((card, i) => (
            <motion.li
              key={card.title}
              variants={revealUp}
              className="u-card group flex min-h-[210px] flex-col justify-between p-6"
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6"
                  style={{ background: card.tone, color: "var(--bg-2)" }}
                >
                  <card.icon size={17} strokeWidth={2.2} />
                </span>
                <span className="u-label-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-base font-bold leading-snug">{card.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {card.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
