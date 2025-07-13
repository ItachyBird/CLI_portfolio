import React from 'react';
import '../css/ChromaGrid.css';

export default function ChromaGrid({ items }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  };

  return (
    <div className="chroma-grid">
      {items.map((item, index) => (
        <a
          key={index}
          className="chroma-card"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            e.currentTarget.style.removeProperty('--x');
            e.currentTarget.style.removeProperty('--y');
          }}
          style={{
            borderColor: item.borderColor,
            background: item.gradient,
          }}
        >
          <div className="chroma-content">
            <div className="chroma-img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="chroma-info">
              <div className="chroma-title">{item.title}</div>
              <div className="role">{item.subtitle}</div>
              <div className="handle">{item.handle}</div>
            </div>
          </div>
          <div className="chroma-reveal"></div>
        </a>
      ))}
    </div>
  );
}
