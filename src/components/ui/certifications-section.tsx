"use client";

import React, { useState, useEffect, useCallback } from "react";
import { animated, useSpring, useTransition, to } from "@react-spring/web";
import TextEngine from "spring-text-engine";
import {
  FiMaximize2,
  FiX,
  FiExternalLink,
  FiCheckCircle,
  FiAward,
  FiLayers,
  FiStar,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Inview } from "@/components/animation/springs/in-view";
import { portfolio } from "@/data/portfolio";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image?: string;
  category?: string;
}

type CategoryType = "All" | "AI & Machine Learning" | "Data & Business Analytics" | "Design & Leadership";

const getCategoryForCert = (title: string, issuer: string): Exclude<CategoryType, "All"> => {
  const lowerTitle = title.toLowerCase();
  const lowerIssuer = issuer.toLowerCase();

  if (
    lowerTitle.includes("ai") ||
    lowerTitle.includes("generative") ||
    lowerTitle.includes("genai") ||
    lowerIssuer.includes("deeplearning")
  ) {
    return "AI & Machine Learning";
  }
  if (
    lowerTitle.includes("graphic") ||
    lowerTitle.includes("design") ||
    lowerIssuer.includes("pamun")
  ) {
    return "Design & Leadership";
  }
  return "Data & Business Analytics";
};

const MONTH_MAP: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};

const parseCertDate = (dateStr: string): number => {
  const parts = dateStr.trim().toUpperCase().split(/\s+/);
  if (parts.length >= 2) {
    const month = MONTH_MAP[parts[0]] || 1;
    const year = parseInt(parts[1], 10) || 0;
    return year * 100 + month;
  }
  return 0;
};

const ALL_CERTIFICATIONS: Certification[] = portfolio.certifications
  .map((cert) => ({
    ...cert,
    category: getCategoryForCert(cert.title, cert.issuer),
  }))
  .sort((a, b) => parseCertDate(b.date) - parseCertDate(a.date));

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);

  const transitions = useTransition(cert, {
    from: { opacity: 0, scale: 0.92, y: 20 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.95, y: 10 },
    config: { mass: 1, tension: 340, friction: 26 },
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (cert) {
      stopScroll();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      startScroll();
    }
    return () => {
      startScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cert, stopScroll, startScroll, handleKeyDown]);

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          style={{ opacity: style.opacity }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 transform-gpu will-change-transform"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
        >
          <animated.div
            style={{
              transform: to(
                [style.scale, style.y],
                (s, y) => `translate3d(0, ${y}px, 0) scale(${s})`
              ),
            }}
            className="relative w-full max-w-5xl bg-[#0a0a0c] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh] transform-gpu will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8 md:py-5 bg-white/[0.02]">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                  <FiShield className="w-5 h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                    Verified Accreditation
                  </span>
                  <h3
                    id="certificate-modal-title"
                    className="text-base md:text-xl font-bold text-foreground truncate"
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {item.image && (
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                    title="Open full resolution certificate"
                  >
                    <FiExternalLink className="w-3.5 h-3.5 text-accent" />
                    <span className="hidden sm:inline">Full Image</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-muted hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  title="Close modal (Esc)"
                  autoFocus
                >
                  <FiX className="w-4 h-4" />
                  <span className="sr-only">Close preview</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Certificate Image Preview */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex items-center justify-center bg-black/60 min-h-[320px]">
              {item.image ? (
                <div className="relative max-w-full max-h-[65vh] flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10"
                  />
                </div>
              ) : (
                <div className="w-full py-24 flex flex-col items-center justify-center text-center">
                  <FiAward className="w-12 h-12 text-muted mb-4 opacity-40" />
                  <p className="text-muted text-sm font-mono uppercase tracking-widest">
                    No image file available
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer: Issuer & Details */}
            <div className="border-t border-white/10 px-6 py-4 md:px-8 md:py-5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  Issuing Organization
                </span>
                <span className="font-semibold text-foreground text-sm">{item.issuer}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                    Date Issued
                  </span>
                  <span className="font-mono text-xs text-foreground font-bold uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          </animated.div>
        </animated.div>
      )
  );
};

export const CertificationsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedModalCert, setSelectedModalCert] = useState<Certification | null>(null);

  const activeCert = ALL_CERTIFICATIONS[selectedIndex] || ALL_CERTIFICATIONS[0];

  // Hardware-accelerated liquid-smooth spring transition when active Spotlight certificate changes
  const spotlightTransitions = useTransition(activeCert, {
    keys: (cert) => cert.title,
    from: { opacity: 0, scale: 0.98, y: 6 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.99, y: -4 },
    config: { mass: 1, tension: 240, friction: 28 },
  });

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % ALL_CERTIFICATIONS.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + ALL_CERTIFICATIONS.length) % ALL_CERTIFICATIONS.length);
  };

  const handleOpenModal = (cert: Certification) => {
    setSelectedModalCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedModalCert(null);
  };

  return (
    <section
      id="certifications"
      className="w-full bg-background bg-grid-pattern relative pt-32 pb-32 border-t border-border mt-16 overflow-hidden transform-gpu"
    >
      {/* Lightweight background gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="w-full relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 xl:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col items-start max-w-3xl">
            <Inview
              mode="once"
              from={{ opacity: 0, x: -20 }}
              to={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-muted uppercase">
                05 / ACCREDITATIONS & CERTIFICATES
              </span>
            </Inview>

            <TextEngine
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.88] text-foreground text-left justify-start w-full"
              lineIn={{ opacity: 1, y: 0 }}
              lineOut={{ opacity: 0, y: 40 }}
              lineStagger={100}
              lineConfig={{ duration: 800, tension: 100, friction: 30 }}
            >
              VERIFIED CREDENTIALS.
            </TextEngine>
          </div>

          {/* Quick Metrics Banner */}
          <Inview
            mode="once"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            delayIn={200}
            className="flex items-center gap-6 border border-white/10 bg-[#0c0c0e] px-6 py-4 rounded-2xl shrink-0 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <FiStar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-mono text-foreground leading-none">
                  {ALL_CERTIFICATIONS.length}
                </span>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  Accreditations
                </span>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground">
                <FiLayers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground leading-tight">
                  Global Issuers
                </span>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  Google, DeepLearning.AI, BCG X
                </span>
              </div>
            </div>
          </Inview>
        </div>

        {/* FEATURED SPOTLIGHT SHOWCASE CONTAINER */}
        <div className="relative w-full bg-[#09090b] border border-white/15 rounded-3xl overflow-hidden mb-12 min-h-[640px] sm:min-h-[520px] lg:min-h-[420px] flex items-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Top Highlight Line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

          {spotlightTransitions((style, cert) => (
            <animated.div
              style={{
                opacity: style.opacity,
                transform: to(
                  [style.scale, style.y],
                  (s, y) => `translate3d(0, ${y}px, 0) scale(${s})`
                ),
              }}
              className="w-full absolute inset-0 p-5 sm:p-8 md:p-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center transform-gpu will-change-transform overflow-y-auto lg:overflow-visible"
            >
              {/* Left Column: Certificate Meta & Information */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
                {/* Status & Category Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 bg-white/[0.04] border border-white/15 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-foreground uppercase">
                    <FiCheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Verified Credential</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/[0.04] border border-white/15 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-semibold tracking-wide text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{cert.category}</span>
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-accent font-medium mt-1">
                    <FiAward className="w-4 h-4 shrink-0" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>

                {/* Date & Accreditation Specs */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted py-3 border-y border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-muted/60 uppercase">Date Issued:</span>
                    <span className="text-foreground font-bold tracking-widest font-mono">
                      {cert.date}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-muted/60 uppercase">Verification:</span>
                    <span className="text-accent font-bold tracking-wider">ACCREDITED</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleOpenModal(cert)}
                    className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/15 hover:bg-white/12 hover:border-accent/40 text-foreground font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
                  >
                    <FiMaximize2 className="w-4 h-4 text-accent" />
                    <span>Expand Preview</span>
                  </button>

                  {cert.image && (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-foreground font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <FiExternalLink className="w-3.5 h-3.5 text-accent" />
                      <span>Full Resolution</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Image Frame */}
              <div
                className="lg:col-span-5 relative aspect-[16/11] bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer flex items-center justify-center p-4 transform-gpu"
                onClick={() => handleOpenModal(cert)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    draggable={false}
                    className="max-w-full max-h-full object-contain rounded-lg border border-white/10 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-accent font-mono uppercase text-xs">
                    <FiAward className="w-10 h-10 mb-2 opacity-50" />
                    <span>{cert.title}</span>
                  </div>
                )}

                {/* Image Overlay Hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/80 border border-white/20 text-foreground font-semibold text-xs tracking-wider uppercase px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                    <FiMaximize2 className="w-3.5 h-3.5 text-accent" />
                    <span>Click to Expand</span>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </div>

        {/* SLIDING THUMBNAIL DECK BAR */}
        <div className="flex flex-col gap-4">
          {/* Deck Header & Controls */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                CERTIFICATE DECK
              </span>
              <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                0{selectedIndex + 1} / 0{ALL_CERTIFICATIONS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-muted hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
                title="Previous certificate"
              >
                <FiChevronLeft className="w-4 h-4" />
                <span className="sr-only">Previous certificate</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-muted hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
                title="Next certificate"
              >
                <FiChevronRight className="w-4 h-4" />
                <span className="sr-only">Next certificate</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {ALL_CERTIFICATIONS.map((cert, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={cert.title}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative p-3 rounded-2xl border transition-colors duration-300 text-left flex flex-col justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97] transform-gpu ${
                    isSelected
                      ? "bg-white/[0.08] border-accent shadow-lg"
                      : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail Image Box */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        draggable={false}
                        className={`max-w-full max-h-full object-contain p-1 transition-transform duration-300 ${
                          isSelected ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                    ) : (
                      <FiAward className="w-5 h-5 text-accent/60" />
                    )}
                  </div>

                  {/* Thumbnail Meta */}
                  <div className="flex flex-col overflow-hidden">
                    <span
                      className={`text-[10px] font-mono tracking-wider uppercase truncate ${
                        isSelected ? "text-accent font-bold" : "text-muted"
                      }`}
                    >
                      {cert.issuer}
                    </span>
                    <h4
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-foreground" : "text-muted group-hover:text-foreground"
                      }`}
                    >
                      {cert.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Preview Modal */}
      <CertificateModal cert={selectedModalCert} onClose={handleCloseModal} />
    </section>
  );
};
