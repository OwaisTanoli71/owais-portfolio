"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { portfolio } from "@/data/portfolio";
import TextEngine from "spring-text-engine";

export const PhysicsSkills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const [isInView, setIsInView] = useState(false);
  const bodiesRef = useRef<{ body: Matter.Body; el: HTMLDivElement }[]>([]);

  // Flatten skills with their categories for styling
  const allSkills = portfolio.skills.flatMap(group => 
    group.items.map(item => ({ name: item, category: group.category }))
  );

  useEffect(() => {
    // Observer to trigger the drop when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !sceneRef.current) return;

    const engine = engineRef.current;
    const world = engine.world;
    
    // Clear previous world state if re-rendered
    Matter.World.clear(world, false);
    Matter.Engine.clear(engine);
    bodiesRef.current = [];

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Boundaries to keep pills inside the screen
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true, render: { visible: false } });
    const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true, render: { visible: false } });
    const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true, render: { visible: false } });
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, { isStatic: true, render: { visible: false } }); // prevent flying way too high

    Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

    // Interactive mouse control
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(world, mouseConstraint);

    // Create rigid bodies for each DOM pill
    const skillNodes = sceneRef.current.querySelectorAll('.skill-pill');
    
    skillNodes.forEach((node) => {
      const el = node as HTMLDivElement;
      const rect = el.getBoundingClientRect();
      const elWidth = rect.width;
      const elHeight = rect.height;

      // Randomize drop positions above the viewport
      const startX = Math.random() * (width - elWidth) + elWidth / 2;
      const startY = -Math.random() * 1000 - 100;

      const body = Matter.Bodies.rectangle(startX, startY, elWidth, elHeight, {
        restitution: 0.5, // Bounciness
        friction: 0.1,
        chamfer: { radius: elHeight / 2 }, // Make collision box rounded like a pill
      });

      // Lock rotation so the text is always horizontal and readable
      Matter.Body.setInertia(body, Infinity);

      Matter.World.add(world, body);
      bodiesRef.current.push({ body, el });
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync physical bodies to DOM elements
    let animationFrame: number;
    const update = () => {
      bodiesRef.current.forEach(({ body, el }) => {
        const { x, y } = body.position;
        // DOM origin is top-left, so we offset by width/2 and height/2 to match Matter.js center origin
        el.style.transform = `translate(${x - el.clientWidth / 2}px, ${y - el.clientHeight / 2}px) rotate(${body.angle}rad)`;
      });
      animationFrame = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [isInView]);

  return (
    <section id="skills" className="w-full bg-background border-t border-border overflow-hidden relative select-none" style={{ height: '90svh' }}>
      
      {/* Background Typography */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-0">
        <TextEngine
          tag="h2"
          className="text-[15vw] font-black uppercase tracking-tighter leading-[0.8] text-border/40 text-center"
          lineIn={{ opacity: 1, y: 0 }}
          lineOut={{ opacity: 0, y: 50 }}
        >
          THE
        </TextEngine>
        <TextEngine
          tag="h2"
          className="text-[15vw] font-black uppercase tracking-tighter leading-[0.8] text-border/40 text-center"
          lineIn={{ opacity: 1, y: 0 }}
          lineOut={{ opacity: 0, y: 50 }}
          delayIn={100}
        >
          ARSENAL.
        </TextEngine>
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-0 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-1 h-8 bg-accent animate-bounce"></div>
        <span className="text-xs font-bold tracking-widest text-muted uppercase text-center max-w-[200px]">
          DRAG & TOSS TO EXPLORE
        </span>
      </div>

      {/* Interactive Physics Container */}
      <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 overflow-hidden cursor-crosshair">
        {allSkills.map((skill, i) => {
          const isAI = skill.category === "AI / ML" || skill.category === "Computer Vision";
          return (
            <div
              key={skill.name + i}
              className={`skill-pill absolute top-0 left-0 px-3.5 py-1.5 sm:px-6 sm:py-3 font-bold tracking-tight rounded-full whitespace-nowrap shadow-xl border cursor-grab active:cursor-grabbing text-xs sm:text-base lg:text-lg transition-colors
                ${isAI 
                  ? 'bg-accent border-accent text-white hover:bg-white hover:text-accent' 
                  : 'bg-card border-border text-foreground hover:border-foreground'}
              `}
              style={{ 
                // Hide off-screen initially, Matter.js will position them
                transform: `translate(-1000px, -1000px)`,
                willChange: 'transform'
              }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>
    </section>
  );
};
