import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "../css/FallingText.css";

// React Icons Imports
import {
  FaJava, FaPython, FaReact, FaNodeJs,
  FaGitAlt, FaLinux
} from "react-icons/fa";

import {
  SiC, SiSolidity, SiHtml5, SiCss3,
  SiJavascript, SiExpress, SiMongodb,
  SiSpringboot, SiVite, SiTailwindcss,
  SiTensorflow, SiKeras, SiRaspberrypi
} from "react-icons/si";

import { MdAnimation } from "react-icons/md"; // use for GSAP placeholder

// Icons Array
const ICONS = [
  // Languages
  { icon: <FaJava />, name: "Java" },
  { icon: <SiC />, name: "C" },
  { icon: <FaPython />, name: "Python" },
  { icon: <SiSolidity />, name: "Solidity" },

  // Web
  { icon: <SiHtml5 />, name: "HTML" },
  { icon: <SiCss3 />, name: "CSS" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <FaReact />, name: "React.js" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiExpress />, name: "Express.js" },
  { icon: <SiMongodb />, name: "MongoDB" },

  // Frameworks & Tools
  { icon: <SiSpringboot />, name: "Spring Boot" },
  { icon: <SiVite />, name: "Vite" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <MdAnimation />, name: "GSAP" }, // GSAP replacement icon

  // Others
  { icon: <FaGitAlt />, name: "Git" },
  { icon: <FaLinux />, name: "Linux" },
  { icon: <SiTensorflow />, name: "TensorFlow" },
  { icon: <SiKeras />, name: "Keras" },
  { icon: <SiRaspberrypi />, name: "Embedded Systems" },

  // DSA fallback
  { icon: <span style={{ fontWeight: "bold" }}>DSA</span>, name: "DSA" },
];




export default function FallingIcons({
  gravity = 1,
  mouseConstraintStiffness = 0.2
}) {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    const engine = Engine.create();
    engine.gravity.y = gravity;
    setEngine(engine);

    // walls
    const floor = Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true });
    const leftWall = Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true });

    World.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    const iconBodies = iconRefs.current.map((ref) => {
      const rect = ref.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.circle(x, y, rect.width / 2, {
        restitution: 0.9,
        frictionAir: 0.03,
      });

      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

      return { elem: ref, body };
    });

    World.add(engine.world, iconBodies.map(({ body }) => body));

    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      iconBodies.forEach(({ body, elem }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      {ICONS.map(({ icon, name }, index) => (
        <div
          key={name}
          ref={(el) => (iconRefs.current[index] = el)}
          className="icon-ball"
        >
          <div className="icon-tooltip">{name}</div>
          {icon}
        </div>
      ))}
    </div>
  );
}
