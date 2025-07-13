// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFolderOpen, FaTools } from 'react-icons/fa';
import '../css/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaUser />, label: 'About', path: '/about' },
    { icon: <FaFolderOpen />, label: 'Projects', path: '/projects' },
    { icon: <FaTools />, label: 'Tech Stack', path: '/techstack' },
  ];

  return (
    <nav className="navbar">
      {navItems.map(({ icon, label, path }) => (
        <div
          key={label}
          className="navbar-item"
          onClick={() => navigate(path)}
          title={label}
        >
          {icon}
        </div>
      ))}
    </nav>
  );
}
