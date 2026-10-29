"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";

const SOCIALS = [
  { icon: TwitterIcon, href: "https://x.com/knowvytech", label: "Twitter" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/knowvy", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com/knowvy.technologies", label: "Instagram" },
  { icon: GithubIcon, href: "https://github.com/mohneesh-gupta", label: "GitHub" },
];

const NAV = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "What We Do", href: "/#what-we-do" },
  { name: "Events", href: "/#past-events" },
  { name: "Programs", href: "/#what-we-do" },
  { name: "Resources", href: "/#faq" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

const LEGAL = [
  { name: "Code of Conduct", href: "/terms#conduct" },
  { name: "Privacy Policy", href: "/terms#privacy" },
  { name: "Terms of Service", href: "/terms#terms" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pt-20">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-ink transition-transform duration-300 group-hover:-rotate-6">
                <span className="u-display text-base leading-none">K</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="u-display text-lg leading-none">Knowvy</span>
                <span className="u-label-sm mt-1 text-muted-foreground">
                  Technologies
                </span>
              </span>
            </Link>

            <p className="u-measure-sm mt-6 text-[0.875rem] leading-relaxed text-muted-foreground">
              Empowering India&rsquo;s next-generation developers, designers, and
              creators through real-world events, hackathons, and career pathways.
            </p>

            <ul className="mt-7 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-brand-ink"
                  >
                    <s.icon size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-2">
            <h3 className="u-label-sm text-muted-foreground">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="u-link text-[0.8125rem] text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav className="lg:col-span-2">
            <h3 className="u-label-sm text-muted-foreground">Guidelines</h3>
            <ul className="mt-5 space-y-3">
              {LEGAL.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-4">
            <h3 className="u-label-sm text-muted-foreground">Stay updated</h3>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              Get community highlights, event invites, hackathon announcements, and
              scholarship opportunities.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-pop px-4 py-2.5 text-[0.8125rem] font-bold text-pop-ink"
                >
                  <Check size={14} /> Subscribed successfully
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="mt-5 flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="developer@domain.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="u-field flex-1 rounded-full"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="grid size-[46px] shrink-0 place-items-center rounded-full bg-brand text-brand-ink transition-transform hover:-translate-y-0.5"
                  >
                    <ArrowRight size={16} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <a
              href="https://chat.whatsapp.com/ByhJB7Rs9jpHcwGIUPWq9j"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-3.5 rounded-2xl border border-border p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-brand">
                <MessageCircle size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] font-bold">Join group</span>
                <span className="u-label-sm mt-1 block text-muted-foreground">
                  2,000+ builders online
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border py-7 md:flex-row">
          <p className="u-label-sm text-muted-foreground">
            © {year} Knowvy Technologies — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <span className="u-label-sm inline-flex items-center gap-2 text-muted-foreground">
              <span className="u-pulse inline-block size-1.5 rounded-full bg-pop" />
              System active
            </span>
            <span className="u-label-sm text-muted-foreground">India 🇮🇳</span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-6 md:px-10"
      >
        <span className="u-display block translate-y-[0.16em] text-center text-[clamp(4.5rem,19vw,17rem)] leading-[0.75] text-foreground/[0.055]">
          Knowvy
        </span>
      </div>
    </footer>
  );
}
