"use client";

import { ArrowUpRight, Users } from "lucide-react";
import { Section, Reveal } from "./ui/kit";

/**
 * Compact call-to-action below the "Join Us" section inviting visitors
 * to apply for the core team via a Luma event page.
 *
 * Replace the LUMA_EVENT_URL with the actual Luma link once the event
 * page is created.
 */
const LUMA_EVENT_URL = "https://luma.com/t8py1f35?tk=DIh9qk";

export function CoreTeamCTA() {
  return (
    <Section id="core-team" tone="base" divider={false} className="!py-14 md:!py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-transparent to-pop/10 p-8 sm:p-10">
          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-pop/15 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            {/* icon */}
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
              <Users size={26} />
            </span>

            {/* copy */}
            <div className="flex-1">
              <h3 className="u-display text-xl sm:text-2xl">
                Join Core Team &amp; Represent the Community
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Step up as a community lead in your City or your College - organise events, mentor peers, and
                shape the future of Knowvy Technologies Globally.
              </p>
            </div>

            {/* CTA button */}
            <a
              href={LUMA_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn u-btn-pop group inline-flex h-12 shrink-0 items-center gap-2 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-pop/25 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

