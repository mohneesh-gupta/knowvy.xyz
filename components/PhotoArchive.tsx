"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { GALLERY_IMAGES, type GalleryCategory, type GalleryImage } from "@/lib/data";
import { Section, Reveal, EASE } from "./ui/kit";

const CATEGORIES: ("All" | GalleryCategory)[] = [
  "All",
  "The Stage",
  "The Build",
  "The Crowd",
  "The Handoff",
  "After the Session",
];

export function PhotoArchive() {
  const [activeCategory, setActiveCategory] = useState<"All" | GalleryCategory>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const step = useCallback(
    (dir: -1 | 1) =>
      setLightboxIdx((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, step]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <Section id="archive">
      <Reveal>
        <span className="k-mono text-[var(--stage-yellow)]">AFTER THE APPLAUSE</span>
        <h2 className="k-display k-d2 mt-4 text-balance">
          The room<br />
          <span className="text-[var(--signal-blue)]">remembers.</span>
        </h2>
        <p className="k-measure mt-6 text-[15px] leading-relaxed text-muted-foreground">
          A visual record of open laptops, crowded chairs, hard questions, live demos,
          new connections, and ideas that left the screen.
        </p>
      </Reveal>

      {/* Category filters */}
      <Reveal className="mt-10 flex gap-2 overflow-x-auto k-no-bar pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIdx(null);
              }}
              className={`k-mono-sm shrink-0 rounded-full border px-4 py-2.5 transition-all ${isActive
                  ? "border-[var(--signal-blue)] bg-[var(--signal-blue)] text-white"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
            >
              {cat}
              <span className="ml-2 opacity-50">
                {cat === "All"
                  ? GALLERY_IMAGES.length
                  : GALLERY_IMAGES.filter((img) => img.category === cat).length}
              </span>
            </button>
          );
        })}
      </Reveal>

      {/* Asymmetric editorial grid — contact sheet style */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="columns-2 gap-3 space-y-3 md:columns-3 lg:columns-4"
          >
            {filtered.map((img, i) => (
              <PhotoCell
                key={img.src}
                image={img}
                index={i}
                onOpen={() => setLightboxIdx(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-[60] flex select-text items-center justify-center bg-black/92 p-4 backdrop-blur-xl"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.26, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#10162F]"
            >
              {/* Close */}
              <button
                onClick={() => setLightboxIdx(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md"
              >
                <X size={15} />
              </button>

              {/* Image */}
              <div className="relative aspect-video bg-black">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="size-full object-contain"
                />
                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Caption bar */}
              <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="k-mono text-[var(--signal-blue)]">{active.category}</span>
                  <span className="k-mono ml-4 text-muted-foreground">
                    {active.event} · {active.city} · {active.year}
                  </span>
                </div>
                <span className="k-mono-sm text-muted-foreground">
                  {lightboxIdx! + 1} / {filtered.length}
                </span>
              </div>
              {active.caption && (
                <p className="px-6 pb-6 text-sm text-muted-foreground">{active.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ── Single photo cell ── */
function PhotoCell({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  return (
    <figure
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border break-inside-avoid"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-75"
      />
      {/* Hover overlay with caption + category */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-lg bg-black/70 px-3 py-2 backdrop-blur-sm">
          <span className="k-mono-sm text-[var(--stage-yellow)]">{image.category}</span>
          <p className="mt-1 text-xs text-white/80 line-clamp-2">{image.caption}</p>
        </div>
      </div>
      {/* Plus zoom icon */}
      <div className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
        <Plus size={14} />
      </div>
    </figure>
  );
}
