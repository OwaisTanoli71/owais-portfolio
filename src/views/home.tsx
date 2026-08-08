import React from "react";
import { portfolio } from "@/data/portfolio";
import { Hero } from "@/components/ui/hero";
import { StorySection } from "@/components/ui/story-section";
import { VenturesSection } from "@/components/ui/ventures-section";
import { StatsSection } from "@/components/ui/stats-section";
import { CertificationsSection } from "@/components/ui/certifications-section";
import { ExperienceSection, EducationSection } from "@/components/ui/experience-section";
import { SkillsMarquee } from "@/components/ui/skills-marquee";
import { SkillsBento } from "@/components/ui/skills-bento";
import { ServicesFlashcards } from "@/components/ui/services-flashcards";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Footer } from "@/components/ui/footer";
import { Inview } from "@/components/animation/springs/in-view";
import TextEngine from "spring-text-engine";

export const HomeView = () => {
  return (
    <main className="min-h-lvh flex flex-col items-center bg-background text-foreground overflow-hidden">
      <Hero />

      <StorySection />
      
      <VenturesSection />

      <SkillsMarquee />
      <SkillsBento />

      <ServicesFlashcards />

      <StatsSection />

      <CertificationsSection />

      <ExperienceSection />
      <EducationSection />

      <TestimonialsSection />

      <Footer />
    </main>
  );
};
