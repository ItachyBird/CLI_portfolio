// ProfileCard.jsx
import React from 'react';
import '../css/ProfileCard.css';

export default function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status,
  contactText,
  onContactClick,
}) {
  return (
    <div className="dual-card-container">
      {/* Left Card - Image */}
      <div className="left-card">
        <img src={avatarUrl} alt="Avatar" className="profile-image" />
      </div>

      {/* Right Card - Info */}
      <div className="right-card">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-title">{title}</p>
        <p className="profile-handle">@{handle}</p>
        <p className="profile-status">{status}</p>
        <button className="contact-button" onClick={onContactClick}>
          {contactText}
        </button>
      </div>
    </div>
  );
}
