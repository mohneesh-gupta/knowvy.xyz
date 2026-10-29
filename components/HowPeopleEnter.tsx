"use client";

import { ArrowRight } from "lucide-react";
import { Reveal, Section } from "./ui/kit";

const PATHS = [
  {
    label: "SHOW UP",
    title: "Show up",
    desc: "Attend meetups, workshops, and developer days. No application needed — just walk in.",
    cta: "See upcoming events",
    href: "#events",
  },
  {
    label: "BUILD WITH US",
    title: "Build with us",
    desc: "Join hackathons, cohorts, and open-source programs. Ship something real with a team.",
    cta: "Browse programs",
    href: "https://luma.com/knowvy",
  },
  {
    label: "BRING A ROOM",
    title: "Bring a room",
    desc: "Colleges, speakers, and companies — collaborate with us to host programs in your city.",
    cta: "Start a conversation",
    href: "mailto:knowvy.technologies@gmail.com",
  },
];

export function HowPeopleEnter() {
  return (
    <Section id="about">
      <Reveal>
        <span className="k-mono text-[var(--signal-blue)]">DEMO READY</span>
        <h2 className="k-display k-d2 mt-4 text-balance">
          Three ways<br />
          <span className="text-[var(--signal-blue)]">to enter.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PATHS.map((path, i) => (
          <Reveal key={path.label} delay={i * 0.1}>
            <div className="group flex h-full flex-col justify-between rounded-xl border border-border p-7 transition-all hover:border-[var(--signal-blue)]/40 hover:bg-[var(--signal-blue)]/5">
              <div>
                <span className="k-mono-sm text-[var(--stage-yellow)]">{path.label}</span>
                <h3 className="k-display mt-4 text-2xl md:text-3xl">{path.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{path.desc}</p>
              </div>
              <a
                href={path.href}
                target={path.href.startsWith("http") || path.href.startsWith("mailto") ? "_blank" : undefined}
                rel={path.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-1.5 k-mono text-[var(--signal-blue)] group-hover:gap-2.5 transition-all"
              >
                {path.cta} <ArrowRight size={13} />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
