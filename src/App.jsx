import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainTerminal from './components/MainTerminal';
import ProjectsTerminal from './components/ProjectsTerminal';
import TechstackTerminal from './components/TechstackTerminal';
import AboutMe from './components/AboutMe';
import { TerminalThemeProvider } from './components/TerminalThemeContext';

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    // Try to play audio after user interaction (for autoplay restrictions)
    const tryPlayAudio = () => {
      if (audio && audio.paused) {
        audio.play().catch(err => {
          console.warn("Autoplay blocked:", err);
        });
      }
    };

    window.addEventListener('click', tryPlayAudio, { once: true });

    return () => {
      window.removeEventListener('click', tryPlayAudio);
    };
  }, []);

  return (
    <TerminalThemeProvider>
      <audio
        ref={audioRef}
        src="/crt-hum.mp3" // Place your mp3 file in public folder as 'public/background.mp3'
        autoPlay
        loop
        hidden
      />
      <Router>
        <Routes>
          <Route path="/" element={<MainTerminal />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<ProjectsTerminal />} />
          <Route path="/techstack" element={<TechstackTerminal />} />
        </Routes>
      </Router>
    </TerminalThemeProvider>
  );
}
