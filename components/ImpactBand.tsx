"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IMPACT, COLLABORATORS } from "@/lib/data";
import { Section, Reveal } from "./ui/kit";

export function ImpactBand() {
  return (
    <section className="relative overflow-hidden bg-[#10162F] py-20 md:py-28">
      <div className="k-grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <span className="k-mono text-[var(--stage-yellow)]">BUILD IN PROGRESS</span>
        </Reveal>

        {/* Numbers band */}
        <div className="mt-10 grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-0">
          {IMPACT.map((stat, i) => (
            <ImpactNumber key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Collaborator line */}
        <Reveal className="mt-16">
          <p className="k-mono text-muted-foreground mb-4">Ecosystems and collaborators</p>
          <div className="overflow-hidden border-t border-b border-white/8 py-5">
            <div className="k-ticker">
              {[...COLLABORATORS, ...COLLABORATORS].map((name, i) => (
                <span key={i} className="mx-6 text-lg font-medium text-[var(--warm-white)]/60 whitespace-nowrap md:mx-10 md:text-xl">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Single animated number ── */
function ImpactNumber({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = stat.value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayed(stat.value);
      return;
    }

    const target = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    const prefix = stat.value.slice(0, stat.value.indexOf(numericMatch[0]));
    const suffix = stat.value.slice(stat.value.indexOf(numericMatch[0]) + numericMatch[0].length);
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayed(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className={`${index > 0 ? "md:border-l md:border-white/8 md:pl-8" : ""}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        className="k-display block text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--warm-white)]"
      >
        {displayed}
      </motion.span>
      <span className="k-mono mt-3 block text-muted-foreground">{stat.label}</span>
    </div>
  );
}
