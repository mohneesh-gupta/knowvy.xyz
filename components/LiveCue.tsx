"use client";

import { ArrowRight } from "lucide-react";
import { NEXT_EVENT } from "@/lib/data";
import { Reveal } from "./ui/kit";

export function LiveCue() {
  const e = NEXT_EVENT;

  const statusLabel = e.status === "registration-open"
    ? "REGISTRATION OPEN"
    : e.status === "sold-out"
      ? "SOLD OUT"
      : "UPCOMING";

  const statusColor = e.status === "registration-open"
    ? "bg-[var(--stage-yellow)] text-[var(--stage-yellow-ink)]"
    : e.status === "sold-out"
      ? "bg-[var(--flash-coral)] text-white"
      : "bg-[var(--signal-blue)] text-white";

  return (
    <section className="bg-[#10162F] border-t border-b border-white/8">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            {/* Left: status + title */}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`k-mono-sm rounded-full px-2.5 py-1.5 font-bold ${statusColor}`}>
                ● {statusLabel}
              </span>
              <h3 className="k-display text-lg text-[var(--warm-white)] sm:text-xl">{e.title}</h3>
            </div>

            {/* Center: details */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="k-mono text-muted-foreground">{e.date}</span>
              <span className="k-mono text-muted-foreground">{e.location}</span>
              <span className="k-mono text-muted-foreground">{e.format}</span>
            </div>

            {/* Right: CTA */}
            <a
              href={e.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="k-btn k-btn-blue h-9 shrink-0 px-4 text-[12px]"
            >
              Reserve a seat <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
