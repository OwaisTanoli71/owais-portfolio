import React from "react";
import { Inview } from "@/components/animation/springs/in-view";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  index: number;
}

export const TimelineItem = ({ title, subtitle, date, description, index }: TimelineItemProps) => {
  return (
    <Inview
      mode="once"
      from={{ opacity: 0, x: -20 }}
      to={{ opacity: 1, x: 0 }}
      delayIn={index * 100}
      config={{ duration: 600 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 mb-2 md:mb-0">
          <span className="text-sm font-medium text-muted tracking-wide uppercase">
            {date}
          </span>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <h4 className="text-base text-accent mb-3">{subtitle}</h4>
          {description && (
            <p className="text-muted leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </Inview>
  );
};
