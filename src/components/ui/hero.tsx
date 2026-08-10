"use client";

import React, { useState } from "react";
import TextEngine from "spring-text-engine";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio } from "@/data/portfolio";
import { Marquee } from "@/components/ui/marquee";
import { FiMenu, FiX } from "react-icons/fi";

export const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const marqueeItems = [
    "WITH INTENT",
    "BUILD IN PUBLIC",
    "CONVICTION OVER COMPROMISE"
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: `mailto:${portfolio.header.email}` }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-[100svh] w-full bg-background overflow-hidden flex items-center justify-center">
      {/* 1. BACKGROUND TEXT LAYER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none -translate-y-8 whitespace-nowrap px-4 w-full">
        <TextEngine
          tag="div"
          className="text-[14vw] sm:text-[12vw] font-black leading-[0.8] tracking-tighter text-accent flex justify-center w-full uppercase"
          lineIn={{ opacity: 1, scale: 1, y: 0 }}
          lineOut={{ opacity: 0, scale: 0.9, y: 50 }}
          lineConfig={{ duration: 1000, tension: 120, friction: 40 }}
          lineStagger={150}
          overflow
        >
          MUHAMMAD OWAIS
        </TextEngine>
      </div>

      {/* 2. SUBJECT IMAGE LAYER */}
      <Inview
        mode="once"
        from={{ opacity: 0, y: 100 }}
        to={{ opacity: 1, y: 0 }}
        delayIn={500}
        config={{ duration: 1200, tension: 80, friction: 20 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[92vw] sm:w-[85vw] md:w-[75vw] lg:w-[55vw] xl:w-[45vw] flex justify-center"
      >
        <div className="w-full flex items-end justify-center relative group/hero">
          {/* Smooth Liquid SVG Filter for Hero */}
          <svg className="hidden">
            <filter id="liquid-hero">
              <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" result="noise">
                <animate attributeName="baseFrequency" dur="4s" values="0.008;0.012;0.008" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          {/* Red Aura Glow that appears on hover */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-0 group-hover/hero:opacity-20 transition-opacity duration-[1000ms] z-20 pointer-events-none mix-blend-screen"></div>

          <img 
            src="/assets/hero-subject.png" 
            alt="Muhammad Owais Arshad" 
            style={{ transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            className="w-full h-auto max-h-[82vh] sm:max-h-[85vh] object-contain object-bottom z-10 drop-shadow-2xl glitch-effect cursor-crosshair group-hover/hero:scale-105 group-hover/hero:[filter:url(#liquid-hero)]"
          />
        </div>
      </Inview>

      {/* 3. FOREGROUND UI LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6 md:p-10 flex flex-col justify-between">
        {/* Top Header Row */}
        <div className="flex justify-between items-start w-full">
          {/* Top Left Branding */}
          <Inview
            mode="once"
            from={{ opacity: 0, x: -20 }}
            to={{ opacity: 1, x: 0 }}
            delayIn={800}
            className="flex items-center gap-3 pointer-events-auto group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-bold shrink-0 group-hover:border-accent group-hover:bg-accent group-hover:text-background transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] group-hover:scale-110">
              MO
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90 group-hover:text-accent transition-colors duration-300">
              Muhammad Owais
            </span>
          </Inview>

          {/* Desktop Navigation */}
          <Inview
            mode="once"
            from={{ opacity: 0, x: 20 }}
            to={{ opacity: 1, x: 0 }}
            delayIn={800}
            className="hidden lg:flex items-center gap-3 text-xs font-bold tracking-widest uppercase pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative px-4 py-2 rounded-full border border-transparent text-white/70 hover:text-background hover:bg-accent hover:border-accent transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </Inview>

          {/* Mobile Navigation Toggle Button */}
          <Inview
            mode="once"
            from={{ opacity: 0, x: 20 }}
            to={{ opacity: 1, x: 0 }}
            delayIn={800}
            className="flex lg:hidden pointer-events-auto"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-accent focus:outline-none backdrop-blur-md transition-colors"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </Inview>
        </div>

        {/* Mobile Navigation Glass Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-center items-center p-8 pointer-events-auto transition-all animate-fadeIn">
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-accent"
            >
              <FiX className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
              <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase font-bold">
                NAVIGATION
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/[0.04] border border-white/10 text-xl font-bold tracking-wider text-white uppercase hover:bg-accent hover:border-accent transition-all active:scale-95"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Middle Row (Removed titles and bio to prevent overlap and match clean reference design) */}
        <div className="flex-grow relative w-full pointer-events-none">
        </div>

        {/* Bottom Elements Row */}
        <div className="flex justify-start w-full relative h-12">
          {/* Bottom Left Scroll Indicator */}
          <Inview
            mode="once"
            from={{ opacity: 0, y: 10 }}
            to={{ opacity: 1, y: 0 }}
            delayIn={1400}
            className="flex items-center gap-4 absolute bottom-0 left-0"
          >
            <div className="w-8 h-[2px] bg-accent"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-muted">
              Scroll To Enter
            </span>
          </Inview>
        </div>
      </div>

      {/* 4. MARQUEE LAYER (BOTTOM EDGE) */}
      <Inview
        mode="once"
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        delayIn={1500}
        className="absolute bottom-0 left-0 w-full bg-background border-y border-border py-5 z-30"
      >
        <Marquee speed={60}>
          <div className="flex items-center">
            {marqueeItems.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-sm md:text-xl font-black tracking-tighter uppercase px-6 text-foreground">
                  {item}
                </span>
                <span className="text-accent text-xl font-black px-2">•</span>
              </React.Fragment>
            ))}
          </div>
        </Marquee>
      </Inview>
    </section>
  );
};
