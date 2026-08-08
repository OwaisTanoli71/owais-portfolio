"use client";

import React from "react";
import { portfolio } from "@/data/portfolio";
import { Inview } from "@/components/animation/springs/in-view";
import { 
  SiPython, SiCplusplus, SiPhp, SiMysql, SiHtml5, SiTensorflow, SiKeras, SiScikitlearn, SiOpencv, SiNumpy, SiPandas, SiFlask, SiDocker, SiGithub, SiStreamlit, SiVercel
} from 'react-icons/si';
import { DiPhotoshop, DiIllustrator } from 'react-icons/di';
import { TbBrandOpenai } from 'react-icons/tb';
import { FaRobot, FaBrain, FaCogs, FaPaintBrush, FaCode, FaChartBar, FaDatabase, FaServer, FaCubes, FaGoogle } from 'react-icons/fa';

// Brand icon + color mapping
export const skillData: Record<string, { icon: React.ReactNode, color: string }> = {
  "Python": { icon: <SiPython />, color: "#3776AB" },
  "C++": { icon: <SiCplusplus />, color: "#00599C" },
  "PHP": { icon: <SiPhp />, color: "#777BB4" },
  "MySQL": { icon: <SiMysql />, color: "#4479A1" },
  "HTML & CSS": { icon: <SiHtml5 />, color: "#E34F26" },
  "TensorFlow": { icon: <SiTensorflow />, color: "#FF6F00" },
  "Keras": { icon: <SiKeras />, color: "#D00000" },
  "Scikit-learn": { icon: <SiScikitlearn />, color: "#F7931E" },
  "OpenCV": { icon: <SiOpencv />, color: "#5C3EE8" },
  "NumPy": { icon: <SiNumpy />, color: "#4DABCF" },
  "Pandas": { icon: <SiPandas />, color: "#150458" },
  "Matplotlib": { icon: <FaChartBar />, color: "#11557C" },
  "Seaborn": { icon: <FaChartBar />, color: "#4C72B0" },
  "YOLOv11": { icon: <FaBrain />, color: "#00FFFF" },
  "SAM2": { icon: <FaBrain />, color: "#FF00FF" },
  "image preprocessing": { icon: <FaCogs />, color: "#A0A0A0" },
  "segmentation pipelines": { icon: <FaCubes />, color: "#00FF88" },
  "n8n": { icon: <FaServer />, color: "#FF6D5A" },
  "GPT-4 API": { icon: <TbBrandOpenai />, color: "#10A37F" },
  "Google Workspace APIs": { icon: <FaGoogle />, color: "#4285F4" },
  "Flask": { icon: <SiFlask />, color: "#ffffff" },
  "PHP 8": { icon: <SiPhp />, color: "#777BB4" },
  "PDO": { icon: <FaDatabase />, color: "#00758F" },
  "Jinja2": { icon: <FaCode />, color: "#B41717" },
  "REST APIs": { icon: <FaServer />, color: "#009688" },
  "Jupyter Notebook": { icon: <FaCode />, color: "#F37626" },
  "Google Colab": { icon: <FaCode />, color: "#F9AB00" },
  "Docker": { icon: <SiDocker />, color: "#2496ED" },
  "Git/GitHub": { icon: <SiGithub />, color: "#ffffff" },
  "Streamlit": { icon: <SiStreamlit />, color: "#FF4B4B" },
  "Vercel": { icon: <SiVercel />, color: "#ffffff" },
  "Adobe Photoshop": { icon: <DiPhotoshop />, color: "#31A8FF" },
  "Adobe Illustrator": { icon: <DiIllustrator />, color: "#FF9A00" },
  "branding": { icon: <FaPaintBrush />, color: "#FF3366" },
  "identity systems": { icon: <FaPaintBrush />, color: "#9933FF" }
};
export const defaultSkill = { icon: <FaCode />, color: "#ffffff" };

// Compact skill card with icon, glow, and glassmorphism
const SkillCard = ({ name, delay }: { name: string, delay: number }) => {
  const { icon, color } = skillData[name] || defaultSkill;
  return (
    <Inview
      mode="once"
      from={{ opacity: 0, y: 15, scale: 0.92 }}
      to={{ opacity: 1, y: 0, scale: 1 }}
      delayIn={delay}
      config={{ mass: 1, tension: 120, friction: 18 }}
    >
      <div 
        className="group relative flex flex-col items-center justify-center gap-2 p-3.5 md:p-4 rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-sm transition-all duration-500 cursor-default overflow-hidden aspect-square min-w-[78px] max-w-[105px] flex-1"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}40`;
          e.currentTarget.style.boxShadow = `0 6px 30px ${color}20, 0 0 40px ${color}08, inset 0 1px 0 ${color}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Radial glow behind icon on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 40%, ${color}12 0%, transparent 70%)` }}
        />
        
        {/* Top shine line */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Icon */}
        <span 
          className="text-2xl md:text-3xl relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-lg group-hover:drop-shadow-[0_0_12px_var(--glow)]"
          style={{ color, '--glow': `${color}80` } as React.CSSProperties}
        >
          {icon}
        </span>

        {/* Label */}
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-white/50 group-hover:text-white/90 transition-colors duration-500 relative z-10 text-center leading-tight max-w-full">
          {name}
        </span>
      </div>
    </Inview>
  );
};

// Category block component
const CategoryBlock = ({ category, items, index, isFullWidth = false }: { category: string, items: string[], index: number, isFullWidth?: boolean }) => (
  <Inview
    mode="once"
    from={{ opacity: 0, y: 30 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={100 + index * 50}
    config={{ mass: 1, tension: 90, friction: 20 }}
    className={isFullWidth ? "w-full" : "w-full"}
  >
    <div className="flex flex-col gap-4">
      {/* Category Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08]">
          <span className="text-[10px] font-mono font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-white/60">
          {category}
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />
      </div>

      {/* Skill Cards Flex Grid */}
      <div className="flex flex-wrap gap-2.5 md:gap-3">
        {items.map((item, i) => (
          <SkillCard key={item} name={item} delay={150 + index * 50 + i * 30} />
        ))}
      </div>
    </div>
  </Inview>
);

export const SkillsBento = () => {
  // Separate AI / ML (the biggest one with 8 items) to put at the bottom
  const mainCategories = portfolio.skills.filter(g => g.category !== "AI / ML");
  const aiMlCategory = portfolio.skills.find(g => g.category === "AI / ML");

  return (
    <section className="w-full bg-background pb-24 pt-20 px-4 md:px-8 xl:px-24 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-purple-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <Inview mode="once" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} delayIn={100} config={{ mass: 1, tension: 80, friction: 20 }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">03 / SKILLS</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                THE <span className="text-accent">TOOLKIT</span>
              </h2>
            </div>
            <p className="text-muted text-sm max-w-sm md:text-right leading-relaxed">
              Technologies &amp; frameworks I use to build scalable AI systems and applications.
            </p>
          </div>
        </Inview>

        <div className="flex flex-col gap-12 md:gap-14">
          {/* Side-by-Side 2-Column Layout for Main Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
            {mainCategories.map((group, idx) => (
              <CategoryBlock 
                key={group.category} 
                category={group.category} 
                items={group.items} 
                index={idx} 
              />
            ))}
          </div>

          {/* AI / ML Category (Most items: 8) - Placed at the very end as full width */}
          {aiMlCategory && (
            <div className="pt-4 border-t border-white/[0.04]">
              <CategoryBlock 
                category={aiMlCategory.category} 
                items={aiMlCategory.items} 
                index={mainCategories.length}
                isFullWidth={true}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
