import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTerminalTheme } from './TerminalThemeContext';
import gsap from 'gsap';
import '../css/MainTerminal.css';

const commands = {
  '--help': `Soumyadip@portfolio:~$ man commands

Available Commands:

  --help
    → Show this help manual

  whoami
    → Display About Me info

  projects
    → List cool projects

  techstack
    → Show technical skillset

  theme [color]
    → Change terminal theme 
      - Available theme: 
        -green
        -raincity
        -mars
        -pokemon
        -cybercity
        -thegame
        -apocalyptic
        -room

  resume
    → Download my resume (PDF)

  cls
    → cls the terminal screen

  sudo [cmd]
    → Directly open a section (whoami, projects, techstack)
`,
};

const commandLinks = {
  whoami: { label: 'Learn More About Me', path: '/about' },
  projects: { label: 'View Projects', path: '/projects' },
  techstack: { label: 'Explore Tech Stack', path: '/techstack' },
};

const resumeLink = {
  label: 'Download Resume (PDF)',
  url: '/Soumyadip_Resume.pdf',
};

export default function MainTerminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [booting, setBooting] = useState(true);

  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const typingRef = useRef({ cancel: false });
  const initRef = useRef(null);

  const navigate = useNavigate();
  const { themeColor, themeConfig, changeTheme } = useTerminalTheme();

  useEffect(() => {
    const crtHum = new Audio('/crt-hum.mp3');
    crtHum.loop = true;
    crtHum.volume = 0.2;

    const bootSound = new Audio('/crt-boot.mp3');
    bootSound.volume = 0.7;

    const playAudio = () => {
      bootSound.play().catch(() => {});
      bootSound.onended = () => {
        crtHum.play().catch(() => {});
      };
      window.removeEventListener('click', playAudio);
      window.removeEventListener('keydown', playAudio);
    };

    bootSound.play()
      .then(() => {
        bootSound.onended = () => {
          crtHum.play().catch(() => {});
        };
      })
      .catch(() => {
        window.addEventListener('click', playAudio);
        window.addEventListener('keydown', playAudio);
      });

    const bootSequence = async () => {
      const messages = [
        '[BOOT] Initializing BIOS...',
        '[BOOT] Detecting terminal modules...',
        '[BOOT] Loading kernel...',
        '[BOOT] Mounting root filesystem...',
        '[BOOT] Starting XTerm-like Shell...',
        '[BOOT] Environment Variables OK',
        '[BOOT] Portfolio OS Ready.',
        '',
        'Soumyadip@portfolio:~$ Welcome. Type "--help" for available commands.',
      ];

      for (let msg of messages) {
        setHistory((prev) => [...prev, msg]);
        await new Promise((res) => setTimeout(res, 500));
      }

      setBooting(false);

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power2.out' }
      );
    };

    bootSequence();

    return () => {
      crtHum.pause();
      crtHum.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        typingRef.current.cancel = true;
        setIsTyping(false);
        setIsInitializing(false);
        clsInterval(initRef.current);
        setHistory((prev) => [...prev, '^C', '']);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const focusInput = () => {
      if (!isTyping && !isInitializing && inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };
    window.addEventListener('keydown', focusInput);
    return () => window.removeEventListener('keydown', focusInput);
  }, [isTyping, isInitializing]);

  const typeText = async (fullText, delay = 30) => {
    setIsTyping(true);
    typingRef.current.cancel = false;
    const lines = fullText.split('\n');
    for (let line of lines) {
      let currentLine = '';
      for (let char of line) {
        if (typingRef.current.cancel) break;
        await new Promise((res) => setTimeout(res, delay));
        currentLine += char;
        setHistory((prev) => [...prev.slice(0, -1), currentLine]);
      }
      setHistory((prev) => [...prev, '']);
      if (typingRef.current.cancel) break;
    }
    setIsTyping(false);
  };

  const runInitializingAnimation = (nextAction) => {
    setIsInitializing(true);
    let count = 0;
    const dots = ['', '.', '..', '...'];
    setHistory((prev) => [...prev, '[ INFO ] Initializing system']);

    initRef.current = setInterval(() => {
      setHistory((prev) => {
        const withoutLast = prev.slice(0, -1);
        return [...withoutLast, `[ INFO ] Initializing system${dots[count++ % dots.length]}`];
      });
    }, 400);

    setTimeout(() => {
      clsInterval(initRef.current);
      if (!typingRef.current.cancel) {
        setHistory((prev) => [...prev, '[ INFO ] Initializing system........ DONE']);
        setTimeout(() => {
          if (!typingRef.current.cancel) {
            if (typeof nextAction === 'function') {
              nextAction();
            } else if (typeof nextAction === 'string') {
              navigate(nextAction);
            }
            setIsInitializing(false);
          }
        }, 400);
      }
    }, 2400);
  };

  const clsInterval = (interval) => {
    if (interval) clearInterval(interval);
  };

  const handleCommand = async (cmd) => {
    const lower = cmd.toLowerCase().trim();

    if (lower.startsWith('sudo ')) {
      const sub = lower.split(' ')[1];
      if (commandLinks[sub]) {
        setHistory((prev) => [...prev, `Executing ${sub} with sudo permission...`, '']);
        runInitializingAnimation(commandLinks[sub].path);
        return;
      } else {
        setHistory((prev) => [...prev, `sudo: ${sub}: command not found`, '']);
        return;
      }
    }

    if (lower.startsWith('theme ')) {
      const color = lower.split(' ')[1];
      setHistory((prev) => [...prev, `Changing theme to ${color}...`, '']);
      runInitializingAnimation(() => {
        changeTheme(color);
        setHistory((prev) => [...prev, `Theme changed to ${color}`, '']);
      });
      return;
    }

    if (lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'resume') {
      setHistory((prev) => [...prev, { type: 'download', label: resumeLink.label, url: resumeLink.url }, '']);
      return;
    }

    const output = commands[lower] || `Command not found: ${cmd}`;
    setHistory((prev) => [...prev, '']);
    await typeText(output);

    if (commandLinks[lower]) {
      const { label, path } = commandLinks[lower];
      setHistory((prev) => [...prev, { type: 'link', label, path }, '']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await typeText(`➜ ${input}`, 50);
    await handleCommand(input.trim());
    setInput('');
  };

  const handleNavigate = (path) => {
    setHistory((prev) => [...prev, '']);
    runInitializingAnimation(path);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  return (
    <div
      className="terminal-container-wallpaper"
      style={{ backgroundImage: `url(${themeConfig.wallpaper})` }}
      data-terminal-theme={themeColor}
    >
      <div className="terminal-container crt-effect" ref={containerRef}>
        <div className="terminal-content">
          {history.map((entry, i) => {
            if (typeof entry === 'string') {
              return <div key={i}>{entry}</div>;
            } else if (entry.type === 'link') {
              return (
                <div key={i}>
                  <span className="terminal-link" onClick={() => handleNavigate(entry.path)}>
                    {entry.label}
                  </span>
                </div>
              );
            } else if (entry.type === 'download') {
              return (
                <div key={i}>
                  <a href={entry.url} className="terminal-link" download>
                    {entry.label}
                  </a>
                </div>
              );
            }
            return null;
          })}

          {!isTyping && !isInitializing && !booting && (
            <form
              onSubmit={handleSubmit}
              className="terminal-input-form"
              onClick={() => inputRef.current.focus()}
            >
              <span className="terminal-arrow">➜</span>
              <div className="terminal-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="terminal-input-hidden"
                  autoFocus
                />
                <span className="terminal-visible-text">
                  {input}
                  <span className="fake-terminal-cursor" />
                </span>
              </div>
            </form>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
