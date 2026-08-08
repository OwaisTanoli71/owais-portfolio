"use client";

import React from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { useInView, animated } from "@react-spring/web";

const stats = [
  {
    value: "6",
    label: "PROJECTS SHIPPED",
    sublabel: "OPEN SOURCE & DEPLOYED",
    isRed: false
  },
  {
    value: "4",
    label: "CERTIFICATIONS",
    sublabel: "IN AI & DESIGN",
    isRed: false
  },
  {
    value: "3+",
    label: "YEARS OF EXPERIENCE",
    sublabel: "AS FREELANCE DESIGNER",
    isRed: false
  },
  {
    value: "95%+",
    label: "ACCURACY MODELS",
    sublabel: "TUMOR & MNIST",
    isRed: true
  }
];

const AnimatedCounter = ({ value, className }: { value: string, className?: string }) => {
  // Extract the numeric part and the string suffix (e.g., "95%+" -> number: 95, suffix: "%+")
  const numMatch = value.match(/[\d.]+/);
  const targetNum = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/, "");

  const [ref, springs] = useInView(
    () => ({
      from: { number: 0 },
      to: { number: targetNum },
      config: { mass: 1, tension: 60, friction: 30 },
      delay: 200,
    }),
    { once: true, amount: 0.5 }
  );

  return (
    <animated.span ref={ref} className={className}>
      {springs.number.to((n: number) => Math.floor(n) + suffix)}
    </animated.span>
  );
};

export const StatsSection = () => {
  return (
    <section className="w-full bg-background py-32 border-t border-border mt-24">
      {/* Header Row */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-mono tracking-widest text-muted uppercase">
              BY THE NUMBERS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground text-right">
            MEASURING IMPACT.
          </h2>
        </div>
      </div>

      {/* Stats Grid (Edge to Edge) */}
      <div className="w-full border-y border-border">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border">
          {stats.map((stat, idx) => (
            <Inview
              key={stat.label}
              mode="once"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={idx * 100}
              className="w-full py-4 md:py-6 px-4 md:px-8 flex flex-col justify-center border-border group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="w-full flex flex-col items-center text-center gap-2">
                <AnimatedCounter 
                  value={stat.value} 
                  className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter ${stat.isRed ? 'text-accent' : 'text-foreground'}`}
                />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] md:text-xs font-mono tracking-widest text-muted uppercase mb-1">
                    {stat.label}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono tracking-widest text-muted uppercase">
                    {stat.sublabel}
                  </span>
                </div>
              </div>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
