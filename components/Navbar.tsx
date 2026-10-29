"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "What We Do", href: "/#what-we-do" },
  { name: "Events", href: "/#past-events" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Team", href: "/#team" },
  { name: "Milestones", href: "/#achievements" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 select-none">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 transition-all duration-300 md:px-10 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Wordmark */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-brand-ink transition-transform duration-300 group-hover:-rotate-6">
              <span className="u-display text-[15px] leading-none">K</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="u-display text-base leading-none">Knowvy</span>
              <span className="u-label-sm mt-1 text-muted-foreground">Technologies</span>
            </span>
          </Link>

          {/* Centred pill nav */}
          <nav
            className={`hidden items-center gap-0.5 rounded-full border p-1 transition-all duration-300 lg:flex ${
              scrolled
                ? "border-border bg-background/80 shadow-[var(--shadow-card)] backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-2 text-[12.5px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <Link href="/#join" className="hidden md:inline-flex">
              <span className="u-btn u-btn-primary h-10 px-5 text-[12.5px]">
                Join community
                <ArrowUpRight size={15} />
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid size-10 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-xl transition-colors hover:border-border-strong lg:hidden"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.035, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-baseline justify-between border-b border-border py-4"
                    >
                      <span className="u-display text-[7vw] leading-none sm:text-3xl flex items-center gap-2.5">
                        {link.name}
                      </span>
                      <span className="u-label-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link href="/#join" onClick={() => setMobileOpen(false)} className="mt-8">
                <span className="u-btn u-btn-primary w-full">
                  Join community <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
