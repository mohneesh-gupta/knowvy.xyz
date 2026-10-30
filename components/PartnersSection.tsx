"use client";

import { motion } from "framer-motion";
import { Section, SectionHead, revealUp, stagger } from "./ui/kit";

const COLLABORATORS = [
  { name: "Google for Developers", tone: "var(--s1)" },
  { name: "Microsoft for Students", tone: "var(--s2)" },
  { name: "GitHub Education", tone: "var(--s3)" },
  { name: "MLH", tone: "var(--s4)" },
  { name: "Colleges & Universities", tone: "var(--s5)" },
  { name: "Unstop", tone: "var(--s1)" },
  { name: "HeyGen", tone: "var(--s2)" },
  { name: "Miro", tone: "var(--s3)" },
  { name: "LYZR AI", tone: "var(--s4)" },
  { name: "GMI Cloud", tone: "var(--s5)" },
  { name: "GSSOC", tone: "var(--s1)" },
  { name: "Qwenwork", tone: "var(--s2)" },
  { name: "AWS", tone: "var(--s3)" },
];

export function PartnersSection() {
  // Duplicated once so the -50% marquee translate loops seamlessly
  const track = [...COLLABORATORS, ...COLLABORATORS];

  return (
    <Section id="partners" className="!pb-10 md:!pb-14">
      <SectionHead
        index="10"
        eyebrow="Partners & Collaborators"
        title={
          <>
            Collaborated with <span className="text-brand">leading organizations</span> &
            companies
          </>
        }
      />

      {/* Type marquee */}
      <div
        className="u-marquee-host relative mt-6 overflow-hidden border-y border-border py-7"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="u-marquee items-center gap-10">
          {track.map((p, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="u-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-none text-muted-foreground transition-colors duration-300 hover:text-foreground">
                {p.name}
              </span>
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ background: p.tone }}
              />
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
