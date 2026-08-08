"use client";

import React from "react";
import TextEngine from "spring-text-engine";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/project-card";

export const VenturesSection = () => {
  return (
    <section id="projects" className="w-full bg-background pt-32 pb-24 px-4 md:px-8 xl:px-24 border-t border-border mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-32">
          <TextEngine
            tag="h2"
            className="text-[10vw] md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground text-left max-w-4xl"
            lineIn={{ opacity: 1, y: 0 }}
            lineOut={{ opacity: 0, y: 40 }}
            lineStagger={100}
            lineConfig={{ duration: 800, tension: 100, friction: 30 }}
          >
            THE WORK THAT MOVED MARKETS.
          </TextEngine>
          <div className="hidden md:block text-xs font-mono tracking-widest text-muted uppercase mb-4">
            04 / PROJECTS
          </div>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 w-full">
          {/* Left Column (Evens: 0, 2, 4) */}
          <div className="flex flex-col gap-16 md:gap-32 w-full md:w-1/2">
            {portfolio.projects.filter((_, i) => i % 2 === 0).map((project, idx) => (
              <ProjectCard 
                key={project.title}
                {...project}
                index={idx * 2} 
              />
            ))}
          </div>

          {/* Right Column (Odds: 1, 3, 5) - Staggered down */}
          <div className="flex flex-col gap-16 md:gap-32 w-full md:w-1/2 md:mt-48">
            {portfolio.projects.filter((_, i) => i % 2 !== 0).map((project, idx) => (
              <ProjectCard 
                key={project.title}
                {...project}
                index={idx * 2 + 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
