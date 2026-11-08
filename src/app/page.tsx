import type { Metadata } from "next";
import { SmoothScroll } from "@/presentation/hooks/SmoothScroll";
import { HeroSection } from "@/presentation/sections/HeroSection";
import { SelectedWorksSection } from "@/presentation/sections/SelectedWorksSection";
import { DigitalArchiveSection } from "@/presentation/sections/DigitalArchiveSection";
import { BiographySection } from "@/presentation/sections/BiographySection";
import { ProjectsSection } from "@/presentation/sections/ProjectsSection";
import { ContactSection } from "@/presentation/sections/ContactSection";
import { EasterEggs } from "@/presentation/components/EasterEggs";
import { CustomCursor } from "@/presentation/components/CustomCursor";
import { Intro } from "@/presentation/components/Intro";
import { ScrollProgress } from "@/presentation/components/ScrollProgress";
import { SiteChrome } from "@/presentation/components/SiteChrome";
import { SiteFooter } from "@/presentation/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <div aria-hidden className="grain" />
      <CustomCursor />
      <ScrollProgress />
      <SiteChrome />
      <EasterEggs />
      <main className="relative w-full">
        <HeroSection />
        <SelectedWorksSection />
        <DigitalArchiveSection />
        <BiographySection />
        <ProjectsSection />
        <ContactSection footer={<SiteFooter />} />
      </main>
    </SmoothScroll>
  );
}
