import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/MainTerminal.css';
import FallingText from './FallingText';
import { useTerminalTheme } from './TerminalThemeContext'; 

export default function TechstackTerminal() {
  const containerRef = useRef(null);
  const { themeColor, themeConfig } = useTerminalTheme();  

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power2.out' }
    );
  }, []);

  const techStackText = "React Three.js FastAPI Node.js Spring Boot MongoDB TensorFlow PyTorch Docker Git";

  return (
    <div
      className="terminal-container-wallpaper"
      style={{ backgroundImage: `url(${themeConfig.wallpaper})` }}
      data-terminal-theme={themeColor}
    >
      <div className="terminal-container crt-effect" ref={containerRef}>
        <div className="terminal-content">
          <div>Soumyadip@portfolio:~$ echo "Welcome to the Tech Stack Terminal"</div>
          <div>
            Soumyadip@portfolio:~$ <a href="/" className="terminal-link">cd ..</a>   # Go Back
          </div>

          <div style={{ marginTop: '2rem', position: 'relative', height: '300px' }}>
            <FallingText
              text={techStackText}
              highlightWords={[
                "React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite", "GSAP",
                "Weather API", "MongoDB", "Express.js", "Node.js", "JWT", "Socket.IO",
                "Spring Boot", "MySQL", "Thymeleaf", "REST API", "Tomcat",
                "Python", "ACO", "Genetic Algorithm", "PPO", "FastAPI", "Open-Meteo API",
                "WebSocket", "AES Encryption", "GZIP", "Cloudinary",
                "HTML", "CSS", "JavaScript", "ScrollTrigger", "CSS Modules",
                "OpenCV", "MediaPipe", "NumPy"
              ]}
              highlightClass="highlighted"
              trigger="auto"
              gravity={1}
              fontSize="1.2rem"
              backgroundColor="transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
