"use client";

import React from "react";
import { Hover } from "@/components/animation/springs/hover";
import { Inview } from "@/components/animation/springs/in-view";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  index: number;
  image?: string;
}

export const ProjectCard = ({ title, description, link, index, image }: ProjectCardProps) => {
  // Tech-focused images selected for the 6 projects:
  const placeholders = [
    "/assets/deadlock.png", 
    "/assets/hostel maangement system.png", 
    "/assets/ai hr screening agent.png", 
    "/assets/maxn3.png", 
    "/assets/brain-tumor-scan.jpg", 
    "/assets/minist dgit.png", 
  ];
  
  const imageSrc = image || placeholders[index % placeholders.length];

  return (
    <div className="w-full flex flex-col group/card">
      <Inview
        mode="once"
        from={{ opacity: 0, y: 150, scale: 0.95 }}
        to={{ opacity: 1, y: 0, scale: 1 }}
        delayIn={100 + (index % 2) * 150}
        config={{ mass: 1, tension: 80, friction: 20 }}
      >
        <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full group/image">
          
          {/* Image Container with SVG Liquid Glitch Filter */}
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-border bg-card cursor-crosshair mb-6">
            <svg className="hidden">
              <filter id={`liquid-${index}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" result="noise">
                  <animate attributeName="baseFrequency" dur="4s" values="0.008;0.012;0.008" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </svg>

            {/* Red Aura Glow that appears on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-0 group-hover/image:opacity-20 transition-opacity duration-[1000ms] z-20 pointer-events-none mix-blend-screen"></div>

            <img 
              src={imageSrc} 
              alt={title}
              style={{ transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              className="w-full h-full object-cover grayscale opacity-80 group-hover/image:opacity-100 group-hover/image:scale-105"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = `url(#liquid-${index})`; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = ''; }}
            />
          </div>

          {/* Text Container Below Image */}
          <div className="flex justify-between items-start w-full">
            {/* Left Side: Title, Desc, Category */}
            <div className="flex flex-col max-w-[75%]">
              <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground mb-3 group-hover/image:text-accent transition-colors duration-[var(--duration-normal)]">
                {title}
              </h3>
              <p className="text-sm md:text-base text-muted leading-relaxed line-clamp-2 mb-4">
                {description}
              </p>
              <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-muted">
                OPEN SOURCE / AI
              </span>
            </div>

            {/* Right Side: Year, Status */}
            <div className="flex flex-col items-end shrink-0 pt-1">
              <span className="text-xs font-mono tracking-widest text-muted mb-2">
                {2026 - (index % 3)}
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-accent">
                DEPLOYED
              </span>
            </div>
          </div>
        </a>
      </Inview>
    </div>
  );
};
