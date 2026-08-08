"use client";

import React from "react";
import TextEngine from "spring-text-engine";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio } from "@/data/portfolio";
import { FaGraduationCap } from "react-icons/fa";
import { FiMapPin, FiCheckCircle, FiBriefcase, FiCalendar } from "react-icons/fi";

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  date: string;
  type?: string;
  description: string;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  date: string;
  description?: string;
}

export const ExperienceSection = () => {
  const experiences: ExperienceItem[] = portfolio.experience;

  return (
    <section
      id="experience"
      className="w-full bg-background relative pt-32 pb-16 px-4 md:px-8 xl:px-24 overflow-hidden transform-gpu"
    >
      {/* Background ambient glows */}
      <div className="absolute top-[25%] left-[-10%] w-[550px] h-[550px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24">
          <div className="flex flex-col gap-3">
            <Inview
              mode="once"
              from={{ opacity: 0, x: -20 }}
              to={{ opacity: 1, x: 0 }}
              delayIn={100}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-muted uppercase">
                04 / PROFESSIONAL TRAINING LOG
              </span>
            </Inview>

            <TextEngine
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-foreground text-left justify-start w-full"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 100, friction: 30 }}
            >
              WHERE I&apos;VE WORKED.
            </TextEngine>
          </div>

          <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} delayIn={300}>
            <p className="text-muted text-sm max-w-md md:text-right leading-relaxed">
              Proven track record building end-to-end AI systems, machine learning pipelines, and brand identities across professional roles.
            </p>
          </Inview>
        </div>

        {/* Cybernetic Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-white/10 flex flex-col gap-10">
          {/* Vertical Accent Laser Glow Line */}
          <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-accent via-white/20 to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <Inview
              key={exp.title + exp.company}
              mode="once"
              from={{ opacity: 0, y: 40, scale: 0.97 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              delayIn={120 + idx * 100}
              config={{ mass: 1, tension: 280, friction: 24 }}
              className="relative w-full"
            >
              {/* Timeline Node Badge */}
              <div className="absolute -left-[31px] md:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#08080a] border-2 border-accent flex items-center justify-center shadow-[0_0_15px_var(--accent)] z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              </div>

              {/* Main Glassmorphic Card */}
              <div className="group relative rounded-3xl border border-white/10 bg-[#09090b]/90 hover:border-white/25 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 md:p-10 transform-gpu">
                {/* Top Highlight Shine Line */}
                <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Ambient Accent Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Card Header: Role Title & Meta Badges */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono tracking-wider text-muted bg-white/[0.04] border border-white/10 px-3.5 py-1 rounded-full uppercase">
                          {exp.company}
                        </span>
                        {exp.type && (
                          <span className="text-xs font-mono tracking-wider text-muted bg-white/[0.04] border border-white/10 px-3.5 py-1 rounded-full uppercase">
                            {exp.type}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                        {exp.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted shrink-0">
                      {exp.location && (
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                          <FiMapPin className="w-3.5 h-3.5 text-accent/80" />
                          <span>{exp.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-foreground font-semibold">
                        <FiCalendar className="w-3.5 h-3.5 text-accent/80" />
                        <span>{exp.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Overview */}
                  <p className="text-sm md:text-base text-muted leading-relaxed max-w-4xl">
                    {exp.description}
                  </p>

                  {/* Key Accomplishments Checklist */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2">
                      <span className="text-[11px] font-mono tracking-widest text-accent/90 uppercase font-semibold">
                        Key Accomplishments & Impact
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-white/10 transition-colors"
                          >
                            <FiCheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <span className="text-xs md:text-sm text-foreground/90 leading-normal">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EducationSection = () => {
  const educationList: EducationItem[] = portfolio.education;

  return (
    <section
      id="education"
      className="w-full bg-background relative pt-16 pb-32 px-4 md:px-8 xl:px-24 overflow-hidden transform-gpu"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-blue-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div className="flex flex-col gap-3">
            <Inview
              mode="once"
              from={{ opacity: 0, x: -20 }}
              to={{ opacity: 1, x: 0 }}
              delayIn={100}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted uppercase">
                ACADEMIC LOG & BACKGROUND
              </span>
            </Inview>

            <TextEngine
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-foreground text-left justify-start w-full"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 100, friction: 30 }}
            >
              EDUCATION.
            </TextEngine>
          </div>

          <Inview mode="once" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} delayIn={300}>
            <p className="text-muted text-sm max-w-md md:text-right leading-relaxed">
              Academic foundation in Artificial Intelligence, Computer Vision, and Computer Science.
            </p>
          </Inview>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {educationList.map((edu, idx) => (
            <Inview
              key={edu.degree}
              mode="once"
              from={{ opacity: 0, y: 35, scale: 0.97 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              delayIn={150 + idx * 100}
              config={{ mass: 1, tension: 280, friction: 24 }}
            >
              <div className="group relative h-full rounded-3xl border border-white/10 bg-[#09090b]/90 hover:border-white/25 transition-all duration-500 overflow-hidden p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xl transform-gpu">
                {/* Top Shine Line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col gap-4">
                  {/* Icon & Date Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                      <FaGraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {edu.date}
                    </span>
                  </div>

                  {/* Degree & Institution */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-mono text-accent font-semibold">
                      {edu.institution}
                    </span>
                  </div>

                  {/* Location */}
                  {edu.location && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
                      <FiMapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  )}

                  {/* Coursework Focus */}
                  {edu.description && (
                    <p className="text-xs md:text-sm text-muted leading-relaxed pt-3 border-t border-white/[0.08]">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
