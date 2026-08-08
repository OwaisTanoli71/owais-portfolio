"use client";

import React, { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import TextEngine from "spring-text-engine";

const testimonials = [
  {
    id: "pamun",
    num: "01",
    name: "PAMUN '26 Directorate",
    role: "Executive Board, PAF-IAST",
    quote: "As Director of Graphic Design for PAMUN '26, Owais spearheaded our entire visual identity. He delivered over 20 standees, posters, and multi-channel campaigns that elevated the event's stature.",
    image: "/assets/pamun-photo.jpg"
  },
  {
    id: "nextgen",
    num: "02",
    name: "NextGen Learners Lead",
    role: "Design Coordinator, NextGen Learners",
    quote: "Owais combines deep technical intuition with an extraordinary eye for design hierarchy and branding. His visual communication skills set him apart from traditional developers.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
  }
];

export const TestimonialsSection = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeItem = testimonials[activeIdx] || testimonials[0];

  return (
    <section className="w-full bg-background pt-24 pb-24 px-4 md:px-8 xl:px-24 relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">VOICES</span>
          </div>

          <TextEngine
            tag="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground text-right"
            lineIn={{ opacity: 1, y: 0 }}
            lineOut={{ opacity: 0, y: 40 }}
            lineStagger={100}
            lineConfig={{ duration: 800, tension: 100, friction: 30 }}
          >
            WHAT THEY SAY.
          </TextEngine>
        </div>

        {/* 2-Column Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Numbered Selector List */}
          <div className="lg:col-span-5 flex flex-col border-t border-white/[0.06]">
            {testimonials.map((item, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <Inview key={item.id} mode="once" from={{ opacity: 0, x: -20 }} to={{ opacity: 1, x: 0 }} delayIn={100 + idx * 80}>
                  <div
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`group flex items-center justify-between py-6 px-4 border-b border-white/[0.06] transition-all duration-500 cursor-pointer ${
                      isSelected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className={`text-xs font-mono font-bold tracking-widest ${isSelected ? "text-accent" : "text-white/30"}`}>
                        {item.num}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <h4 className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${isSelected ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                          {item.role.split(',')[1] || item.role}
                        </span>
                      </div>
                    </div>

                    {/* Red active indicator line */}
                    <div className={`h-[2px] transition-all duration-500 ${isSelected ? "w-8 bg-accent" : "w-0 bg-transparent"}`} />
                  </div>
                </Inview>
              );
            })}
          </div>

          {/* Right Column: Active Quote + Portrait Photo */}
          {activeItem && (
            <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-8 md:gap-10 p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden">
              
              {/* Red glow behind image */}
              <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

              {/* Quote content */}
              <div className="flex-1 flex flex-col gap-6 relative z-10">
                <p className="text-base md:text-xl font-light text-white/90 leading-relaxed italic">
                  &ldquo;{activeItem.quote}&rdquo;
                </p>
                
                <div className="flex flex-col gap-1 pt-4 border-t border-white/[0.06]">
                  <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
                    {activeItem.name}
                  </span>
                  <span className="text-[11px] font-mono text-muted tracking-wide">
                    {activeItem.role}
                  </span>
                </div>
              </div>

              {/* Photo Avatar */}
              <div className="relative w-36 h-44 md:w-44 md:h-56 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10 group/avatar cursor-pointer">
                <img 
                  src={activeItem.image} 
                  alt={activeItem.name} 
                  className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover/avatar:grayscale-0 group-hover/avatar:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
