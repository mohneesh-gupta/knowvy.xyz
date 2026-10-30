import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PartnersSection } from "@/components/PartnersSection";
import { AboutSection } from "@/components/AboutSection";
import { WhatWeDo } from "@/components/WhatWeDo";
import { PastEvents } from "@/components/PastEvents";
import { GallerySection } from "@/components/GallerySection";
import { Team } from "@/components/Team";
import { Achievements } from "@/components/Achievements";
import { JoinUsSection } from "@/components/JoinUsSection";
import { CoreTeamCTA } from "@/components/CoreTeamCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <WhatWeDo />
      <PastEvents />
      <GallerySection />
      <Team />
      {/* Colour block — lime */}
      <Achievements />
      {/* Colour block — brand violet */}
      <JoinUsSection />
      <CoreTeamCTA />
      <Footer />
    </main>
  );
}
