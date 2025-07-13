import React, { useEffect, useRef } from 'react';
import '../css/MainTerminal.css';
import '../css/AboutMe.css';
import { useTerminalTheme } from './TerminalThemeContext'; 
import { FaGithub, FaLinkedin, FaInstagram, FaFacebookF, FaTwitter, FaFilePdf } from 'react-icons/fa';
import { PowerGlitch } from 'powerglitch';

export default function AboutMe() {
  const imageRef = useRef();
  const infoRefs = useRef([]);
  const iconRefs = useRef([]);
   const { themeColor, themeConfig } = useTerminalTheme();  

  useEffect(() => {
    PowerGlitch.glitch(imageRef.current, { playMode: 'always', timing: { duration: 3000, iterations: Infinity } });

    infoRefs.current.forEach((el) => {
      if (el) PowerGlitch.glitch(el, { playMode: 'always', timing: { duration: 3000, iterations: Infinity } });
    });

    iconRefs.current.forEach((el) => {
      if (el) PowerGlitch.glitch(el, { playMode: 'always', timing: { duration: 3000, iterations: Infinity } });
    });
  }, []);

  return (
        <div
      className="newterminal-wallpaper crt-effect"
      style={{ backgroundImage: `url(${themeConfig.wallpaper})` }}
      data-terminal-theme={themeColor}
    >
    <div className="newterminal  " data-terminal-theme={themeColor}>
      <div className='newterminalabt'>Soumyadip@portfolio:~$ echo "Welcome to the Tech Stack Terminal"</div>
<div className='newterminalabt'>Soumyadip@portfolio:~$ <a href="/" className="terminal-link">cd ..</a>   # Go Back</div>
      <div className="aboutme-wrapper ">
        <div className="aboutme-content ">
          <div className="grid">

            {/* Profile Image */}
            <div className="item item-0">
              <video
                ref={imageRef}
                src="/me.mp4"
                alt="Profile"
                className="profile-image"
                 autoPlay
    muted
    loop
    playsInline
              />
            </div>

            {/* Info Text + Resume */}
            <div className="item item-1">
              <div className="info-container">
                {[  'Name: Soumyadip Debnath',
                'Username: ITACHYBIRD',
  'Age: 20',
  
  'Profession: NULL :(',
  'School: LIONS CALCUTTA (GREATER) VIDYA MANDIR',
  'College: FUTURE INSTITUTE OF TECHNOLOGY',
  'Experience: NULL :(',
  'Currently Learning: Ethical Hacking, (CISCO)',
  'Hobbies: Coding, Gaming,watching Anime,Digital Art',
  'Personality Type: INTP',

  'Quote: "Code is poetry."',
  'Email: soumyadip@example.com',
  
  `Last Login: ${new Date().toDateString()}`,
                ].map((text, index) => (
                  <div
                    key={index}
                    className="info-item"
                    ref={(el) => (infoRefs.current[index] = el)}
                  >
                    {text}
                  </div>
                ))}

<a
  href="/SoumyadipDebnath.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="resume-link"
  ref={(el) => (infoRefs.current[infoRefs.current.length] = el)}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    marginTop: '10px',
    color: 'currentColor',
    textDecoration: 'none',
  }}
>
  <FaFilePdf size={18} />
  Open Resume
</a>

              </div>
            </div>

            {/* Social Icons */}
            <div className="item item-2">
              <div className="social-icons">
                {[
                  { icon: <FaGithub />, link: 'https://github.com/ItachyBird' },
                  { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/soumyadip-debnath-04459a231/' },
                  { icon: <FaInstagram />, link: 'https://instagram.com/yourprofile' },
                  { icon: <FaFacebookF />, link: 'https://facebook.com/yourprofile' },
                  { icon: <FaTwitter />, link: 'https://twitter.com/yourprofile' },
                ].map(({ icon, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={(el) => (iconRefs.current[index] = el)}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Project 3: Weather App */}
            <div
              className="item item-3"
              style={{
                backgroundImage: `url(/bg3.jpeg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              
                <div style={{ fontSize: '0.9rem' }}>&gt;&gt;Passion: Immersed in tactical gameplays & boss fights.</div>
              </div>
            </div>

            {/* Project 4: Chat App */}
            <div
              className="item item-4"
              style={{
                backgroundImage: `url(/bg4.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}>
                
                <div style={{ fontSize: '0.9rem' }}>&gt;&gt; Obsession: Anime marathons & pixel tears.</div>
              </div>
            </div>

            {/* Project 5: 3D Portfolio */}
            <div
              className="item item-5"
              style={{
                backgroundImage: `url(/bg5.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              <div style={{ padding: '8px 12px', borderRadius: '8px' }}>
           
                <div style={{ fontSize: '0.9rem' }}>&gt;&gt; Dream Ride: Dodge Hellcat // RAW, LOUD, BEAUTIFUL. </div>
              </div>
            </div>

            {/* Project 6: Flight Route Optimizer */}
            <div
              className="item item-6"
              style={{
                backgroundImage: `url(/bg6.gif)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '12px',
                textAlign: 'left',
              }}
            >
             
            </div>

 <div
              className="item item-7"
              style={{
                backgroundImage: `url(/bg5.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              <div style={{ padding: '8px 12px', borderRadius: '8px' }}>
           
                <div style={{ fontSize: '0.9rem' }}>dodge </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
