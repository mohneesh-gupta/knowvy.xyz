"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  Play,
  Pause,
  Sparkles,
  Maximize2,
  Grid,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GALLERY_IMAGES, type GalleryCategory, type GalleryImage } from "@/lib/data";
import { Section, SectionHead, Reveal } from "./ui/kit";

/* ─────────────────────────────────────────────────────────────
   Category Accent Colors & Tags
───────────────────────────────────────────────────────────── */
const CATEGORIES: ("All" | GalleryCategory)[] = [
  "All",
  "The Build",
  "The Stage",
  "The Crowd",
  "The Handoff",
  "After the Session",
];

const CATEGORY_TONE: Record<string, string> = {
  "The Stage": "var(--s2)", // Cyan
  "The Build": "var(--s4)", // Coral / Orange
  "The Crowd": "var(--s1)", // Violet / Brand
  "The Handoff": "var(--s5)", // Amber / Gold
  "After the Session": "var(--s3)", // Lime / Pop
};

/* Curated initial item count for the bento grid before "Show All" */
const INITIAL_DISPLAY_COUNT = 12;

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<"All" | GalleryCategory>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [seed, setSeed] = useState(0);

  // Split gallery photos into two distinct marquee rows for continuous kinetic ribbons
  const { marqueeRow1, marqueeRow2 } = useMemo(() => {
    const half = Math.ceil(GALLERY_IMAGES.length / 2);
    return {
      marqueeRow1: GALLERY_IMAGES.slice(0, half),
      marqueeRow2: GALLERY_IMAGES.slice(half),
    };
  }, []);

  // Filtered & optionally shuffled photos for the interactive photo wall
  const filteredPhotos = useMemo(() => {
    let list =
      activeCategory === "All"
        ? [...GALLERY_IMAGES]
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

    if (seed > 0) {
      // Deterministic pseudorandom shuffle based on seed
      list = [...list].sort((a, b) => {
        const hashA = (a.src.charCodeAt(10) || 0) * (seed + 7) % 31;
        const hashB = (b.src.charCodeAt(10) || 0) * (seed + 7) % 31;
        return hashA - hashB;
      });
    }
    return list;
  }, [activeCategory, seed]);

  // Displayed photos (sliced if not expanded)
  const displayedPhotos = useMemo(() => {
    if (expanded || filteredPhotos.length <= INITIAL_DISPLAY_COUNT) {
      return filteredPhotos;
    }
    return filteredPhotos.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredPhotos, expanded]);

  // Step through photos in lightbox
  const step = useCallback(
    (dir: -1 | 1) => {
      setLightboxIdx((current) => {
        if (current === null) return null;
        return (current + dir + filteredPhotos.length) % filteredPhotos.length;
      });
    },
    [filteredPhotos.length]
  );

  // Keyboard navigation & body lock for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIdx(null);
        setIsPlaying(false);
      } else if (e.key === "ArrowRight") {
        step(1);
      } else if (e.key === "ArrowLeft") {
        step(-1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, step]);

  // Slideshow auto-advance
  useEffect(() => {
    if (lightboxIdx === null || !isPlaying) return;

    const interval = setInterval(() => {
      step(1);
    }, 3600);

    return () => clearInterval(interval);
  }, [lightboxIdx, isPlaying, step]);

  const activePhoto = lightboxIdx !== null ? filteredPhotos[lightboxIdx] : null;

  // Open lightbox from any photo in GALLERY_IMAGES
  const openFromGlobal = (photo: GalleryImage) => {
    const idx = filteredPhotos.findIndex((p) => p.src === photo.src);
    if (idx !== -1) {
      setLightboxIdx(idx);
    } else {
      setActiveCategory("All");
      setTimeout(() => {
        const resetIdx = GALLERY_IMAGES.findIndex((p) => p.src === photo.src);
        setLightboxIdx(resetIdx !== -1 ? resetIdx : 0);
      }, 50);
    }
  };

  return (
    <Section id="gallery" className="select-none overflow-hidden">
      {/* ── Section Header ── */}
      <SectionHead
        index="05"
        eyebrow="Community Archive"
        title={
          <>
            Capturing the energy <span className="text-brand">across every</span> floor
          </>
        }
        aside="A unified archive of hackathons, dev days, keynotes, live code challenges, and late-night builds across Bhopal, Delhi, Gwalior, Jabalpur, Mumbai, and Jhansi."
      />

      {/* ── Key Metrics Ribbon ── */}
      <Reveal className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-4">
        <span className="u-label-sm inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground">
          <span className="size-2 rounded-full bg-brand animate-ping" />
          <strong className="text-foreground">{GALLERY_IMAGES.length}+</strong> Moments Captured
        </span>
        <span className="u-label-sm inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground">
          <span className="size-2 rounded-full bg-[var(--s2)]" />
          <strong className="text-foreground">10+</strong> Cities Reached
        </span>
        <span className="u-label-sm inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground">
          <span className="size-2 rounded-full bg-[var(--s4)]" />
          <strong className="text-foreground">4,500+</strong> Builders & Creators
        </span>
        <span className="u-label-sm inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground">
          <span className="size-2 rounded-full bg-[var(--s3)]" />
          <strong className="text-foreground">100%</strong> Offline Real Energy
        </span>
      </Reveal>

      {/* ─────────────────────────────────────────────────────────────
         ANIMATION 1: Kinetic Infinite Drifting Marquee Ribbons
         Two continuous opposing streams with pause-on-hover & click-to-expand
      ───────────────────────────────────────────────────────────── */}
      <div className="relative mt-12 overflow-hidden py-3">
        {/* Soft edge fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />

        {/* Row 1: Drifting Left */}
        <div className="u-marquee-host flex overflow-hidden">
          <div className="u-marquee gap-4 py-2">
            {[...marqueeRow1, ...marqueeRow1].map((photo, i) => (
              <figure
                key={`row1-${photo.src}-${i}`}
                onClick={() => openFromGlobal(photo)}
                className="group relative aspect-[16/10] w-[260px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg sm:w-[320px]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Event tag */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-md">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: CATEGORY_TONE[photo.category] || "var(--brand)" }}
                  />
                  <span className="u-label-sm text-[0.625rem] text-white">
                    {photo.event}
                  </span>
                </div>

                {/* Caption reveal on hover */}
                <figcaption className="u-label-sm absolute bottom-3 left-3 right-3 translate-y-2 truncate text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Row 2: Drifting Right */}
        <div className="u-marquee-host mt-3 flex overflow-hidden">
          <div className="u-marquee-reverse gap-4 py-2">
            {[...marqueeRow2, ...marqueeRow2].map((photo, i) => (
              <figure
                key={`row2-${photo.src}-${i}`}
                onClick={() => openFromGlobal(photo)}
                className="group relative aspect-[16/10] w-[260px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg sm:w-[320px]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Event tag */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-md">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: CATEGORY_TONE[photo.category] || "var(--brand)" }}
                  />
                  <span className="u-label-sm text-[0.625rem] text-white">
                    {photo.event}
                  </span>
                </div>

                {/* Caption reveal on hover */}
                <figcaption className="u-label-sm absolute bottom-3 left-3 right-3 translate-y-2 truncate text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE BAR: Vibe Filters, Shuffle, & Slideshow Launcher
      ───────────────────────────────────────────────────────────── */}
      <div className="mt-16 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Vibe Pills */}
        <div className="u-no-bar flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const count =
              cat === "All"
                ? GALLERY_IMAGES.length
                : GALLERY_IMAGES.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpanded(false);
                }}
                className={`relative shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-200 ${isActive
                  ? "border-transparent bg-foreground text-background shadow-sm"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="gallery-active-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat !== "All" && (
                    <span
                      className="size-2 rounded-full"
                      style={{ background: CATEGORY_TONE[cat] }}
                    />
                  )}
                  {cat}
                  <span className={`u-label-sm ${isActive ? "opacity-60" : "opacity-45"}`}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Shuffle & Slideshow */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          {/* Shuffle Button */}
          <button
            onClick={() => setSeed((s) => s + 1)}
            title="Randomize photo order with spring physics"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[0.8125rem] font-semibold text-muted-foreground transition-all duration-200 hover:border-border-strong hover:text-foreground active:scale-95"
          >
            <Shuffle size={14} className="text-brand transition-transform hover:rotate-45" />
            <span>Shuffle</span>
          </button>

          {/* Slideshow Button */}
          <button
            onClick={() => {
              setLightboxIdx(0);
              setIsPlaying(true);
            }}
            title="Start automated full-screen slideshow"
            className="u-btn-primary inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <Play size={13} fill="currentColor" />
            <span>Play Slideshow</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         ANIMATION 2: Staggered Asymmetrical Mosaic Bento Wall
         Photos fluidly rearrange via Framer Motion's layout prop
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {displayedPhotos.map((photo, i) => {
            // Give every 5th or 7th card a wide landscape or tall portrait presence for dynamic bento rhythm
            const isWide = i % 7 === 0 || i % 11 === 4;
            const aspectClass = isWide
              ? "aspect-[16/10] sm:col-span-2"
              : i % 5 === 2
                ? "aspect-[4/3]"
                : "aspect-[4/3]";

            return (
              <motion.figure
                layout
                key={photo.src}
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i * 0.035, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setLightboxIdx(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 hover:border-brand/70 hover:shadow-xl ${aspectClass}`}
              >
                {/* Image with smooth micro-scale on hover */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette & Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Badges: Event Pill + Zoom Indicator */}
                <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-white backdrop-blur-md">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: CATEGORY_TONE[photo.category] || "var(--brand)" }}
                    />
                    <span className="u-label-sm text-[0.625rem] text-white">
                      {photo.event}
                    </span>
                  </span>

                  <span className="grid size-7 place-items-center rounded-full border border-white/20 bg-black/60 text-white/80 opacity-0 backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:opacity-100">
                    <Maximize2 size={12} />
                  </span>
                </div>

                {/* Bottom Caption & Location metadata */}
                <div className="absolute bottom-3 left-3.5 right-3.5 translate-y-1 transition-all duration-300 group-hover:translate-y-0">
                  <p className="line-clamp-2 text-[0.8125rem] font-medium leading-snug text-white/95 drop-shadow-sm">
                    {photo.caption}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="u-label-sm text-white/70">
                      {photo.city} · {photo.year}
                    </span>
                    <span className="size-1 rounded-full bg-white/40" />
                    <span className="u-label-sm text-white/70">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── "Show All Photos" Expansion Toggle ── */}
      {filteredPhotos.length > INITIAL_DISPLAY_COUNT && (
        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-6 py-3 text-[0.875rem] font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-border-strong hover:bg-surface-2 active:scale-95"
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="text-brand transition-transform group-hover:-translate-y-0.5" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} className="text-brand transition-transform group-hover:translate-y-0.5" />
                <span>
                  View All {filteredPhotos.length} Photos ({filteredPhotos.length - INITIAL_DISPLAY_COUNT} More)
                </span>
              </>
            )}
          </button>
          <p className="u-label-sm text-muted-foreground">
            Showing {displayedPhotos.length} of {filteredPhotos.length} captures
          </p>
        </Reveal>
      )}

      {/* ─────────────────────────────────────────────────────────────
         ANIMATION 3: Immersive Fullscreen Lightbox with Autoplay Mode
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePhoto && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              setLightboxIdx(null);
              setIsPlaying(false);
            }}
            className="fixed inset-0 z-[70] flex select-text flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-2xl sm:p-6"
          >
            {/* Top Lightbox Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-5xl items-center justify-between gap-4 py-2 text-white"
            >
              {/* Event & Category Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="u-label-sm rounded-full px-3 py-1 font-semibold text-black"
                  style={{ background: CATEGORY_TONE[activePhoto.category] || "var(--brand)" }}
                >
                  {activePhoto.category}
                </span>
                <span className="text-sm font-bold tracking-tight text-white/95">
                  {activePhoto.event}
                </span>
                <span className="hidden text-xs text-white/50 sm:inline">
                  {activePhoto.city} · {activePhoto.year}
                </span>
              </div>

              {/* Actions: Autoplay, Counter, Close */}
              <div className="flex items-center gap-3">
                {/* Autoplay Toggle */}
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  title={isPlaying ? "Pause slideshow (Space)" : "Play slideshow (Space)"}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${isPlaying
                    ? "border-brand bg-brand text-brand-ink"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    }`}
                >
                  {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                  <span className="hidden sm:inline">{isPlaying ? "Auto Playing" : "Autoplay"}</span>
                </button>

                {/* Counter */}
                <span className="u-label-sm tabular-nums text-white/60">
                  {lightboxIdx + 1} / {filteredPhotos.length}
                </span>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setLightboxIdx(null);
                    setIsPlaying(false);
                  }}
                  aria-label="Close lightbox (Escape)"
                  className="grid size-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/25 active:scale-95"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Stage with Image & Navigation Chevrons */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto flex h-[62vh] w-full max-w-5xl items-center justify-center sm:h-[68vh]"
            >
              {/* Previous Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous photo (Left arrow)"
                  className="absolute left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 active:scale-95 sm:left-4 sm:size-12"
                >
                  <ArrowLeft size={18} />
                </button>
              )}

              {/* Active Image with Slide/Fade Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl"
                >
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={() => step(1)}
                  aria-label="Next photo (Right arrow)"
                  className="absolute right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 active:scale-95 sm:right-4 sm:size-12"
                >
                  <ArrowRight size={18} />
                </button>
              )}

              {/* Autoplay Progress Line Indicator */}
              {isPlaying && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    key={activePhoto.src}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.6, ease: "linear" }}
                    className="h-full bg-brand"
                  />
                </div>
              )}
            </div>

            {/* Caption & Bottom Thumbnail Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-5xl flex-col items-center gap-3 py-2 text-center"
            >
              <p className="max-w-2xl text-sm font-medium text-white/90 drop-shadow-md sm:text-base">
                {activePhoto.caption}
              </p>

              {/* Mini Thumbnail Carousel */}
              {filteredPhotos.length > 1 && (
                <div className="u-no-bar flex max-w-full items-center gap-2 overflow-x-auto py-1">
                  {filteredPhotos.map((photo, idx) => {
                    const isCurrent = idx === lightboxIdx;
                    return (
                      <button
                        key={`thumb-${photo.src}-${idx}`}
                        onClick={() => setLightboxIdx(idx)}
                        className={`relative aspect-[4/3] h-11 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${isCurrent
                          ? "border-brand ring-2 ring-brand ring-offset-2 ring-offset-black"
                          : "border-white/20 opacity-50 hover:opacity-100"
                          }`}
                      >
                        <img
                          src={photo.src}
                          alt=""
                          className="size-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
