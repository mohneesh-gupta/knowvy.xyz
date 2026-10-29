"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";

const STATS = [
  { value: "1,500+", label: "Active Members", highlight: "Across India" },
  { value: "30+", label: "Events & Meetups", highlight: "Hosted" },
  { value: "3", label: "Hackathons Hosted", highlight: "National" },
  { value: "10+", label: "National Presence", highlight: "Cities" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Headline words animate up from behind a mask, line by line */
const LINE = {
  hidden: { y: "108%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.08 + i * 0.09 },
  }),
};

const FADE = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.42 + i * 0.09 },
  }),
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pb-20 pt-32 md:pb-24 md:pt-40"
    >
      {/* Faint construction grid instead of blur blobs */}
      <div className="u-grid-bg pointer-events-none absolute inset-0 z-0 opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="u-label inline-flex items-center gap-2.5">
            <span className="u-pulse inline-block size-1.5 rounded-full bg-pop" />
            India
          </span>
          <span className="u-label text-muted-foreground">
            Student developer community
          </span>
          <span className="u-label text-muted-foreground">Est. 2024</span>
        </motion.div>

        {/* Display headline */}
        <h1 className="u-display u-d1 select-none">
          {["Building the", "premier student", "developer hub."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                custom={i}
                variants={LINE}
                initial="hidden"
                animate="visible"
                className={`block ${i === 1 ? "text-brand" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Motto + CTAs / collage */}
        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            custom={0}
            variants={FADE}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <div className="border-l-2 border-brand pl-5">
              <span className="u-label-sm text-muted-foreground">Our motto</span>
              <p className="mt-3 text-xl font-medium leading-snug text-foreground md:text-2xl">
                “Perks with Purpose, Events with Impact.”
              </p>
            </div>

            <p className="u-measure mt-7 text-[0.9375rem] leading-relaxed text-muted-foreground">
              A student community in Bhopal hosting events, meetups, and hackathons
              for students and tech enthusiasts looking to build, learn, and grow
              together.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#join" className="u-btn u-btn-primary">
                Join community <ArrowUpRight size={16} />
              </Link>
              <Link href="#gallery" className="u-btn u-btn-ghost">
                <Images size={15} /> View gallery
              </Link>
            </div>
          </motion.div>

          {/* Collage */}
          <motion.div
            custom={1}
            variants={FADE}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <figure className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
              <img
                src="/hero-collage.png"
                alt="Highlights from Knowvy community events across Bhopal"
                className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="u-label-sm absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-3.5 py-2 text-white backdrop-blur-md">
                Community floor · Bhopal, MP
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Stat rail */}
        <motion.dl
          custom={2}
          variants={FADE}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 border-t border-border md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-border px-1 py-7 md:px-6 ${
                i % 2 === 0 ? "" : "border-l"
              } ${i < 2 ? "border-b md:border-b-0" : ""} ${
                i === 2 ? "md:border-l" : ""
              }`}
            >
              <dt className="u-label-sm text-brand">{stat.highlight}</dt>
              <dd className="u-display mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-none">
                {stat.value}
              </dd>
              <dd className="u-label-sm mt-3 text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
