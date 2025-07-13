import React from "react";
import "../css/ProjectsTerminal.css";
import Carousel from "./Carousel";
import "../css/Carousel.css";
import { useTerminalTheme } from './TerminalThemeContext'; 




const projectData = [
  {
    title: "Terminal Portfolio",
    description: "An interactive portfolio that mimics a terminal interface where users can type commands to reveal personal information and projects.",
    image: "/terminal.png",
    link: "https://github.com/ItachyBird/terminal-portfolio",
    date: "Jul 2025",
    techStack: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite", "GSAP"]
  },
    {
    title: "Flight Route Optimization",
    description: "An AI-based system for dynamic flight route planning using ACO, Genetic Algorithms, and PPO with weather data integration.",
    image: "/flightoptimization.png",
    link: "https://github.com/ItachyBird/FROS",
    date: "Jan 2025",
    techStack: ["Python", "ACO", "Genetic Algorithm", "PPO", "FastAPI", "Open-Meteo API"]
  },
    {
    title: "Encrypted Chat Application",
    description: "A secure, real-time chat app with AES encryption, GZIP compression, WebSocket messaging, and multimedia support via Cloudinary.",
    image: "/chatapp.png",
    link: "https://github.com/ItachyBird/encrypted-chat-app",
    date: "Dec 2024",
    techStack: ["Spring Boot", "MongoDB", "WebSocket", "AES", "GZIP", "Cloudinary"]
  },
    {
    title: "Cloud Kitchen System",
    description: "A real-time cloud kitchen management app with dashboards for product and order tracking, powered by MERN stack and sockets.",
    image: "/food.png",
    link: "https://github.com/ItachyBird/FOOD_DELIVERY_APP",
    date: "Feb 2025",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO"]
  },
   {
    title: "Doctor Booking System",
    description: "A full-stack appointment scheduling platform with user authentication and real-time doctor-patient interaction.",
    image: "/docapp.png",
    link: "https://github.com/ItachyBird/doctor-booking-management",
    date: "Apr 2025",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Socket.IO"]
  },
    {
    title: "Spacefolio",
    description: "An 3d space themed portfolio with interactive animations, showcasing projects and skills in a futuristic environment.",
    image: "/spacefolio.png",
    link: "https://github.com/ItachyBird/terminal-portfolio",
    date: "Jul 2025",
    techStack: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite", "GSAP"]
  },
    {
    title: "OTT Streaming Platform",
    description: "A responsive streaming platform with video playback, RESTful backend, secure user management, and SSR using Spring Boot.",
    image: "/movieiot.png",
    link: "https://github.com/ItachyBird/ott",
    date: "Mar 2025",
    techStack: ["Spring Boot", "MySQL", "Thymeleaf", "REST API", "Tomcat"]
  },
  {
    title: "SKYCAST Weather App",
    description: "A real-time weather app with location detection, dynamic UI animations, and a 7-day forecast using OpenWeatherMap API.",
    image: "/weatherapp.png",
    link: "https://github.com/ItachyBird/weatherapp",
    date: "May 2025",
    techStack: ["React", "Tailwind CSS", "OpenWeatherMap API", "Vite"]
  },
 

  {
    title: "Gesture Detection using Python",
    description: "A real-time ASL gesture recognition tool using computer vision and deep learning to interpret hand gestures from webcam input.",
    image: "/gesture.png",
    link: "https://github.com/ItachyBird/Gesture-detection-asl",
    date: "Feb 2024",
    techStack: ["Flask", "OpenCV", "NumPy", "Matplotlib", "MediaPipe", "scikit-learn", "Keras", "TensorFlow", "pyttsx3"]
  },


  {
    title: "Fashion Landing Page",
    description: "A responsive and animated landing page for fashion brands using GSAP scroll-based effects and modern web standards.",
    image: "/fashion.png",
    link: "https://github.com/ItachyBird/fashion-landing-page",
    date: "Nov 2024",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger", "Vite"]
  },
  {
    title: "Apple Homepage Clone",
    description: "A pixel-perfect replica of Apple’s homepage with scroll-based animations, component modularization, and performance optimization.",
    image: "/apple.png",
    link: "https://github.com/ItachyBird/apple_clone",
    date: "Mar 2024",
    techStack: ["React", "CSS Modules", "Framer Motion", "Vite"]
  }

];



const getCarouselItems = (project) => [
  {
    type: "title",
    content: project.title,
  },
  {
    type: "image",
    content: project.image,
  },
  {
    type: "description",
    content: project.description,
  },
  {
    type: "techstack",
    content: project.techStack,
  },
  {
    type: "link",
    content: {
      url: project.link,
      date: project.date
    }
  },
];


const ProjectsTerminal = () => {
  const { themeColor, themeConfig } = useTerminalTheme();
  return (

        <div
      className="terminal-container-wallpaper crt-effect"
      style={{ backgroundImage: `url(${themeConfig.wallpaper})` }}
      data-terminal-theme={themeColor}
    >
    <div className="terminal-container ">
      <div className="terminal-content text-green">
        <div>Soumyadip@portfolio:~$ echo "Welcome to the Tech Stack Terminal"</div>
<div>Soumyadip@portfolio:~$ <a href="/" className="terminal-link">cd ..</a>   # Go Back</div>

        <div className="project-terminal-wrapper">
          <div className="project-terminal-container-grid">
            {projectData.map((project, index) => (
              <div
                key={index}
                className={`project-item project-item-${index} ${index === 10 ? "desktop-only" : ""}`}
              >
                <Carousel items={getCarouselItems(project)} autoplay loop pauseOnHover />
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
    </div>  
  );
};

export default ProjectsTerminal;
