"use client";

import React from "react";
import TextEngine from "spring-text-engine";
import { portfolio } from "@/data/portfolio";
import { Inview } from "@/components/animation/springs/in-view";
import { FaEnvelope, FaLinkedinIn, FaGithub, FaBehance, FaArrowRight } from 'react-icons/fa';

const links = [
  { label: 'LinkedIn', url: portfolio.header.links.find(l => l.name === "LinkedIn")?.url, icon: <FaLinkedinIn /> },
  { label: 'GitHub', url: "https://github.com/OwaisTanoli71", icon: <FaGithub /> },
  { label: 'Behance', url: portfolio.header.links.find(l => l.name === "Behance")?.url, icon: <FaBehance /> },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-background pt-24 pb-6 px-6 md:px-12 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col z-10">
        
        {/* CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 border-b border-white/[0.06] pb-16">
          <div className="flex flex-col gap-1">
            <TextEngine
              tag="h2"
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-foreground"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
              delayIn={100}
            >
              LET&apos;S BUILD
            </TextEngine>
            <TextEngine
              tag="h2"
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-accent"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineConfig={{ duration: 800, tension: 120, friction: 30 }}
              delayIn={250}
            >
              TOGETHER.
            </TextEngine>
          </div>

          {/* CTA Button */}
          <Inview mode="once" from={{ opacity: 0, y: 10 }} to={{ opacity: 1, y: 0 }} delayIn={500}>
            <a 
              href={`mailto:${portfolio.header.email}`}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-accent hover:bg-white text-background font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-500 shadow-[0_0_30px_var(--accent)/30] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <FaEnvelope className="text-base" />
              <span>GET IN TOUCH</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </Inview>
        </div>

        {/* Links + Info Grid */}
        <Inview
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={600}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-16"
        >
          {/* Socials */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">SOCIALS</span>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a 
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-white/80 hover:text-accent transition-colors duration-500"
                >
                  <span className="text-base text-accent group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                  <span className="text-sm font-medium tracking-wide">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">LOCATION</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white/80 font-medium">{portfolio.header.location}</span>
            </div>
          </div>

          {/* Currently */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">CURRENTLY</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white/80 font-medium">BSAI @ PAF-IAST</span>
              <span className="text-[13px] text-white/50">Building AI products</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">STATUS</span>
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="absolute w-2 h-2 rounded-full bg-accent animate-ping opacity-50" />
              </div>
              <span className="text-sm text-white/80 font-medium">Available</span>
            </div>
          </div>
        </Inview>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-[0.15em] text-white/40 uppercase pt-6 border-t border-white/[0.06]">
          <span>&copy; {new Date().getFullYear()} {portfolio.header.name}</span>
          <span className="mt-2 sm:mt-0">DESIGNED IN PAKISTAN</span>
        </div>

      </div>
    </footer>
  );
};
