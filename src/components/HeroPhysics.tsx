import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import './HeroPhysics.css';

const MENU_ITEMS = [
  "REFLEXÃO",
  "PROCESSO",
  "CONCEITO",
  "AUTORAL",
  "IDENTIDADE",
  "PROJETOS"
];

const HeroPhysics: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create({
    gravity: { x: 0, y: 0.2 } // Light gravity as requested
  }));

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;
    const world = engine.world;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Render for physics calculation (hidden)
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
    
    Matter.World.add(world, [ground, leftWall, rightWall]);

    // Create capsules
    const capsules: { body: Matter.Body; element: HTMLElement }[] = [];
    
    MENU_ITEMS.forEach((label, i) => {
      const x = width * (0.2 + Math.random() * 0.6);
      const y = -100 - (i * 150); // Drop from top
      
      // Calculate width based on label length
      const charWidth = 14;
      const padding = 60;
      const capWidth = label.length * charWidth + padding;
      const capHeight = 50;

      const body = Matter.Bodies.rectangle(x, y, capWidth, capHeight, {
        chamfer: { radius: 25 }, // Pill shape
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.05,
        angle: (Math.random() - 0.5) * 0.5
      });

      const element = document.createElement('a');
      element.className = 'physics-capsule';
      element.innerText = label;
      element.href = `/${label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
      
      sceneRef.current?.appendChild(element);
      capsules.push({ body, element });
      Matter.World.add(world, body);
    });

    // Mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(world, mouseConstraint);

    // Run engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync loop
    const update = () => {
      capsules.forEach(({ body, element }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    // Resize handling
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        sceneRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="hero-physics-container">
      {/* Organic Splash SVG Background */}
      <div className="organic-splash">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
          <path 
            fill="#000000" 
            d="M380,100 C420,120 450,180 430,240 C410,300 360,340 300,360 C240,380 180,350 140,310 C100,270 80,210 110,150 C140,90 200,60 260,70 C320,80 340,80 380,100 Z"
            className="splash-main"
          />
          <circle fill="#000000" cx="420" cy="80" r="8" />
          <circle fill="#000000" cx="460" cy="150" r="12" />
          <circle fill="#000000" cx="350" cy="40" r="5" />
          <circle fill="#000000" cx="480" cy="220" r="15" />
        </svg>
      </div>

      <div ref={sceneRef} className="physics-scene" />
      
      <div className="hero-content">
        {/* Placeholder for editorial text if needed */}
      </div>
    </div>
  );
};

export default HeroPhysics;
