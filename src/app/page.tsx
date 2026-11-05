import type { Metadata } from "next";
import { SmoothScroll } from "@/presentation/hooks/SmoothScroll";
import { HeroSection } from "@/presentation/sections/HeroSection";
import { SelectedWorksSection } from "@/presentation/sections/SelectedWorksSection";
import { DigitalArchiveSection } from "@/presentation/sections/DigitalArchiveSection";
import { BiographySection } from "@/presentation/sections/BiographySection";
import { ProjectsSection } from "@/presentation/sections/ProjectsSection";
import { ContactSection } from "@/presentation/sections/ContactSection";
import { SiteFooter } from "@/presentation/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full">
        <HeroSection />
        <SelectedWorksSection />
        <DigitalArchiveSection />
        <ProjectsSection />
        <BiographySection />
        <ContactSection footer={<SiteFooter />} />
      </main>
    </SmoothScroll>
  );
}
