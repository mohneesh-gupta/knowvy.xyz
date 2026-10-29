/* ═══════════════════════════════════════════════
   KNOWVY — STRUCTURED DATA
   All event & gallery data lives here so components
   render from data, not hard-coded layouts.
═══════════════════════════════════════════════ */

/* ── Event Data Model ── */
export interface KEvent {
  title: string;
  slug: string;
  type: "meetup" | "workshop" | "hackathon" | "devday";
  date: string;
  location: string;
  partner: string;
  status: "upcoming" | "registration-open" | "sold-out" | "past";
  summary: string;
  attendance: number;
  sessions: number;
  duration: string;
  coverImage: string;
  galleryImages: string[];
  highlights: string[];
  registrationUrl?: string;
}

export const FEATURED_EVENTS: KEvent[] = [
  {
    title: "Microsoft Build Bhopal",
    slug: "ms-build-bhopal",
    type: "devday",
    date: "May 2025",
    location: "Bhopal, MP",
    partner: "Microsoft",
    status: "past",
    summary: "200+ builders moved from curiosity to deployed software in a single day of Azure, GitHub, and Copilot workshops.",
    attendance: 200,
    sessions: 8,
    duration: "1 full day",
    coverImage: "/gallery/ms-build-1.jpg",
    galleryImages: [
      "/gallery/ms-build-1.jpg",
      "/gallery/ms-build-2.jpg",
      "/gallery/ms-build-3.jpg",
      "/gallery/ms-build-4.jpg",
      "/gallery/ms-build-5.jpg",
      "/gallery/ms-build-6.jpg",
    ],
    highlights: ["Azure / GitHub / Copilot", "8 sessions", "1 full day"],
  },
  {
    title: "HeyGen Meetup Bhopal",
    slug: "heygen-meetup-bhopal",
    type: "meetup",
    date: "Aug 2025",
    location: "Bhopal, MP",
    partner: "HeyGen",
    status: "past",
    summary: "Digital avatar creation, video personalization, and AI-driven content pipelines explored by 150+ creators and developers.",
    attendance: 150,
    sessions: 4,
    duration: "Half day",
    coverImage: "/gallery/heygen bhopal.jpg",
    galleryImages: [
      "/gallery/heygen bhopal.jpg",
      "/gallery/heygen meetup bhopal.jpeg",
      "/gallery/heygen gwalior.jpg",
      "/gallery/heygen jabalpur.jpg",
      "/gallery/heygen satna.jpg",
      "/gallery/heygen vidisha.jpeg",
    ],
    highlights: ["HeyGen AI Avatars", "4 sessions", "Multi-city roadshow"],
  },
  {
    title: "GitHub Copilot Dev Days",
    slug: "copilot-dev-days",
    type: "workshop",
    date: "Jul 2025",
    location: "Bhopal, MP",
    partner: "GitHub",
    status: "past",
    summary: "Developers battled real-time PR challenges using Copilot for test generation, code review, and automated refactoring.",
    attendance: 120,
    sessions: 5,
    duration: "1 day",
    coverImage: "/gallery/devdays1.jpg",
    galleryImages: [
      "/gallery/devdays1.jpg",
      "/gallery/devdays2.jpg",
      "/gallery/devdays3.jpg",
      "/gallery/devdays4.jpg",
      "/gallery/devdays5.jpg",
    ],
    highlights: ["GitHub Copilot", "5 sessions", "PR challenge"],
  },
];

/* ── Gallery Data Model ── */
export type GalleryCategory = "The Stage" | "The Build" | "The Crowd" | "The Handoff" | "After the Session";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  event: string;
  year: string;
  city: string;
  category: GalleryCategory;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // ── MS Build Bhopal ──
  { src: "/gallery/ms-build-1.jpg", alt: "200+ students at MS Build Bhopal", caption: "200+ students packed the venue for Azure AI session", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Crowd" },
  { src: "/gallery/ms-build-2.jpg", alt: "Award ceremony at MS Build", caption: "Top performers receiving awards", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Handoff" },
  { src: "/gallery/ms-build-3.jpg", alt: "MS Build crowd with BUILD screens", caption: "Three BUILD screens glowing as energy fills the room", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/ms-build-4.jpg", alt: "MS Build award presentation", caption: "Award in front of Microsoft BUILD display", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Handoff" },
  { src: "/gallery/ms-build-5.jpg", alt: "Knowvy crew at MS Build banner", caption: "Knowvy crew at the Microsoft BUILD localhost banner", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/ms-build-6.jpg", alt: "More moments from MS Build Bhopal", caption: "Energy, learning, and community all in one place", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Crowd" },

  // ── GitHub Copilot Dev Days ──
  { src: "/gallery/devdays1.jpg", alt: "GitHub Copilot Dev Days session", caption: "Developers diving into AI-assisted coding", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/devdays2.jpg", alt: "Live PR challenge with Copilot", caption: "Teams solving TypeScript problems in real time", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/devdays3.jpg", alt: "Copilot test generation workshop", caption: "Exploring Copilot's automated test generation", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/devdays4.jpg", alt: "Speakers at GitHub Copilot Dev Days", caption: "Exchanging ideas during the event", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/devdays5.jpg", alt: "Copilot Developer Badge celebration", caption: "Celebrating their Copilot Developer Badges", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "The Handoff" },

  // ── Miro Meetup ──
  { src: "/gallery/miro-meet-1.jpg", alt: "Miro Meetup Bhopal collaboration", caption: "Collaborating on visual workflows", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/miro-meet-2.jpg", alt: "Whiteboarding at Miro Meetup", caption: "Mapping user flows and architecture diagrams live", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/miro-meet-3.jpg", alt: "Networking at Miro Meetup", caption: "Networking moments from Miro Meetup", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/miro-meet-4.jpg", alt: "Miro UX ideation session", caption: "Engaging with Miro tools for product design", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "The Stage" },

  // ── Agentic AI Hackathon ──
  { src: "/gallery/age-ai-1.jpg", alt: "Agentic AI Hackathon teams building", caption: "Building autonomous multi-agent systems", event: "Agentic AI Hackathon", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/age-ai-2.jpg", alt: "Midnight grinding at hackathon", caption: "Midnight grinding — LangChain workflows coming to life", event: "Agentic AI Hackathon", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/age-ai-3.jpg", alt: "VC mentors guiding teams", caption: "VC mentors guiding student teams on prototypes", event: "Agentic AI Hackathon", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/age-ai-4.jpg", alt: "Agentic AI prize ceremony", caption: "Celebrating the top funded prototypes", event: "Agentic AI Hackathon", year: "2025", city: "Bhopal", category: "The Handoff" },

  // ── AWS Builder Day ──
  { src: "/gallery/aws-sca-1.jpg", alt: "AWS Builder Day main session", caption: "Cloud architecture and serverless deployments", event: "AWS Builder Day", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/aws-sca-2.jpg", alt: "Hands-on cloud labs at AWS", caption: "Working through cloud labs and certification paths", event: "AWS Builder Day", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/aws-sca-3.jpg", alt: "Q&A at AWS Builder Day", caption: "Interactive Q&A on scalable cloud infrastructure", event: "AWS Builder Day", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/aws-sca-4.jpg", alt: "AWS networking meetup", caption: "Cloud enthusiast meetup", event: "AWS Builder Day", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/aws-sca-5.jpg", alt: "AWS Builder Day group photo", caption: "Celebrating the successful conclusion", event: "AWS Builder Day", year: "2025", city: "Bhopal", category: "After the Session" },

  // ── HeyGen Events ──
  { src: "/gallery/heygen bhopal.jpg", alt: "HeyGen Meetup Bhopal crowd", caption: "Digital avatar workshop and creator meetup", event: "HeyGen Meetup", year: "2025", city: "Bhopal", category: "The Crowd" },
  { src: "/gallery/heygen meetup bhopal.jpeg", alt: "HeyGen Bhopal speakers", caption: "HeyGen Bhopal speakers and organizers", event: "HeyGen Meetup", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/heygen gwalior.jpg", alt: "HeyGen Gwalior meetup", caption: "HeyGen roadshow reaches Gwalior", event: "HeyGen Meetup", year: "2025", city: "Gwalior", category: "The Crowd" },
  { src: "/gallery/heygen jabalpur.jpg", alt: "HeyGen Jabalpur meetup", caption: "AI video creators gather in Jabalpur", event: "HeyGen Meetup", year: "2025", city: "Jabalpur", category: "The Crowd" },
  { src: "/gallery/heygen satna.jpg", alt: "HeyGen Satna meetup", caption: "HeyGen roadshow in Satna", event: "HeyGen Meetup", year: "2025", city: "Satna", category: "The Stage" },
  { src: "/gallery/heygen vidisha.jpeg", alt: "HeyGen Vidisha meetup", caption: "Exploring digital avatars in Vidisha", event: "HeyGen Meetup", year: "2025", city: "Vidisha", category: "The Stage" },

  // ── Standalone Events ──
  { src: "/gallery/hack days in bhopal.jpg", alt: "Hack Days in Bhopal", caption: "Marathon coding session during Hack Days", event: "Hack Days Bhopal", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/hack knowvy hackathon.jpg", alt: "HackKnowvy Hackathon", caption: "First-ever HackKnowvy national hackathon", event: "HackKnowvy", year: "2024", city: "Bhopal", category: "The Crowd" },
  { src: "/gallery/hack knowvy-1 hackathon.jpg", alt: "HackKnowvy teams", caption: "Teams presenting their final demos", event: "HackKnowvy", year: "2024", city: "Bhopal", category: "The Handoff" },
  { src: "/gallery/microsoft build bhopal.jpg", alt: "Microsoft Build event", caption: "Community at Microsoft Build localhost", event: "MS Build Bhopal", year: "2025", city: "Bhopal", category: "The Crowd" },
  { src: "/gallery/lyzr labs bhopal.jpg", alt: "Lyzr Labs AI workshop", caption: "AI framework workshop with Lyzr Labs", event: "Lyzr Labs Workshop", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/miro meetup bhopal.jpeg", alt: "Miro Meetup group photo", caption: "Full Miro Meetup community photo", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/miro meetup bhopal 2.jpeg", alt: "Miro whiteboarding session", caption: "Real-time design sprint in action", event: "Miro Meetup", year: "2025", city: "Bhopal", category: "The Build" },

  // ── MLH Hackathons ──
  { src: "/gallery/MLH 3.0 hackathon.jpg", alt: "MLH 3.0 Hackathon", caption: "MLH 3.0 national hackathon", event: "MLH Hackathon", year: "2025", city: "Bhopal", category: "The Crowd" },
  { src: "/gallery/MLH hackathon.jpg", alt: "MLH Hackathon coding", caption: "Students hacking at MLH event", event: "MLH Hackathon", year: "2024", city: "Bhopal", category: "The Build" },

  // ── Workshops & Online ──
  { src: "/gallery/code safe with AI.jpg", alt: "Code Safe with AI workshop", caption: "Secure coding practices with AI tools", event: "Code Safe with AI", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/conquer the DSA.jpg", alt: "Conquer the DSA workshop", caption: "DSA mastery workshop for competitive coders", event: "Conquer DSA", year: "2025", city: "Bhopal", category: "The Stage" },
  { src: "/gallery/debugging challange.jpeg", alt: "Debugging Challenge", caption: "Live debugging challenge event", event: "Debugging Challenge", year: "2024", city: "Bhopal", category: "The Build" },
  { src: "/gallery/DSA competition.jpg", alt: "DSA Competition", caption: "Head-to-head DSA competition", event: "DSA Competition", year: "2024", city: "Bhopal", category: "The Build" },
  { src: "/gallery/knowvy dsa competition 1.jpg", alt: "Knowvy DSA Competition", caption: "Students competing in algorithmic challenges", event: "DSA Competition", year: "2024", city: "Bhopal", category: "The Build" },

  // ── Online Events ──
  { src: "/gallery/7-day web dev bootcamp online.jpg", alt: "7-Day Web Dev Bootcamp", caption: "7-day intensive web development bootcamp", event: "Web Dev Bootcamp", year: "2024", city: "Online", category: "The Stage" },
  { src: "/gallery/AWS online workshop.jpg", alt: "AWS Online Workshop", caption: "Cloud fundamentals online workshop", event: "AWS Workshop", year: "2024", city: "Online", category: "The Stage" },
  { src: "/gallery/AWS practical workshop.jpg", alt: "AWS Practical Workshop", caption: "Hands-on AWS practical session", event: "AWS Workshop", year: "2024", city: "Online", category: "The Build" },
  { src: "/gallery/SIH guidance online workshop.png", alt: "SIH Guidance Workshop", caption: "Smart India Hackathon guidance session", event: "SIH Guidance", year: "2024", city: "Online", category: "The Stage" },
  { src: "/gallery/hackathons winning guidance online session.png", alt: "Hackathon Winning Guide", caption: "How to win hackathons — online masterclass", event: "Hackathon Guide", year: "2024", city: "Online", category: "The Stage" },

  // ── Monad & Web3 ──
  { src: "/gallery/monad hackathon.jpeg", alt: "Monad Hackathon", caption: "Web3 builders at Monad hackathon", event: "Monad Hackathon", year: "2025", city: "Bhopal", category: "The Build" },
  { src: "/gallery/monad pic.png", alt: "Monad community meetup", caption: "Monad community meetup photo", event: "Monad Meetup", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/story 3.0-jhansi.jpg", alt: "Story 3.0 Jhansi", caption: "Story 3.0 community event in Jhansi", event: "Story 3.0", year: "2025", city: "Jhansi", category: "The Crowd" },

  // ── Collages ──
  { src: "/gallery/collage-1.jpeg", alt: "Knowvy events collage", caption: "Highlights from multiple community events", event: "Mixed Events", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/collage-2.png", alt: "Community moments collage", caption: "Building, learning, and growing together", event: "Mixed Events", year: "2025", city: "Bhopal", category: "After the Session" },
  { src: "/gallery/github copilot dev days.jpeg", alt: "GitHub Copilot event banner", caption: "GitHub Copilot Dev Days official banner", event: "Copilot Dev Days", year: "2025", city: "Bhopal", category: "The Stage" },
];

/* ── Upcoming Event (from Luma) ── */
export interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  format: string;
  status: "upcoming" | "registration-open" | "sold-out";
  registrationUrl: string;
}

export const NEXT_EVENT: UpcomingEvent = {
  title: "NextGen Leaders Conference",
  date: "Oct 24, 2026",
  location: "Bhopal, India",
  format: "In-Person",
  status: "registration-open",
  registrationUrl: "https://luma.com/tnmubwnz",
};

/* ── Collaborators ── */
export const COLLABORATORS = [
  "Microsoft",
  "GitHub",
  "Google",
  "MLH",
  "HeyGen",
  "Miro",
  "Unstop",
  "AWS",
  "Lyzr Labs",
  "Tally",
];

/* ── Impact Numbers ── */
export const IMPACT = [
  { value: "1,500+", label: "Community members" },
  { value: "30+", label: "Events & meetups" },
  { value: "3", label: "National hackathons" },
  { value: "10+", label: "Cities reached" },
  { value: "15+", label: "Colleges reached" },
];
