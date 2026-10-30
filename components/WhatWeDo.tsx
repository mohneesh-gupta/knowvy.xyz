"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead, revealUp, stagger } from "./ui/kit";

const TRACKS = [
  {
    idx: "01",
    title: "Hackathons",
    meta: "Offline & remote · Massive Prize pool",
  },
  {
    idx: "02",
    title: "Workshops",
    meta: "Hands-on · Small cohorts · Mentorship",
  },
  {
    idx: "03",
    title: "Bootcamps",
    meta: "6-week intensives · Production code",
  },
  {
    idx: "04",
    title: "Meetups",
    meta: "City-first · Monthly · Networking",
  },
  {
    idx: "05",
    title: "Tech Talks & AMA",
    meta: "Founders · Staff engineers · Architects",
  },
  {
    idx: "06",
    title: "Open Source",
    meta: "MVP · Maintainer track · PR sprints",
  },
  {
    idx: "07",
    title: "Career Sessions",
    meta: "Resume review · Mock interviews · Offers",
  },
];

export function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <SectionHead
        index="03"
        eyebrow="What we do"
        title={
          <>
            Seven ways to <span className="text-brand">ship</span> - pick your entry
            point
          </>
        }
        aside="From your first Git commit to your first funded startup. The lattice is designed so every stage of a student's journey has a room."
      />

      {/* Index rows */}
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 border-t border-border"
      >
        {TRACKS.map((track) => (
          <motion.li key={track.idx} variants={revealUp} className="border-b border-border">
            <div className="group relative flex cursor-default items-center gap-4 px-2 py-6 transition-colors duration-300 hover:bg-brand hover:text-brand-ink md:gap-8 md:px-5">
              <span className="u-label-sm w-7 shrink-0 tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-brand-ink/60">
                {track.idx}
              </span>

              <div className="min-w-0 flex-1">
                {/* leading-[0.95] rather than the global 0.88 — these titles wrap */}
                <h3 className="u-display text-[clamp(1.35rem,3.2vw,2.4rem)] leading-[0.95]">
                  {track.title}
                </h3>
                <p className="u-label-sm mt-3 text-muted-foreground transition-colors duration-300 group-hover:text-brand-ink/70 lg:hidden">
                  {track.meta}
                </p>
              </div>

              <p className="u-label-sm hidden w-[21rem] shrink-0 text-right leading-[1.9] text-muted-foreground transition-colors duration-300 group-hover:text-brand-ink/70 lg:block">
                {track.meta}
              </p>

              {track.flagship && (
                <span className="u-label-sm hidden shrink-0 rounded-full bg-pop px-2.5 py-1.5 text-pop-ink sm:inline-block">
                  Flagship
                </span>
              )}

              <ArrowUpRight
                size={20}
                className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
