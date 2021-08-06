import React from 'react';

import '../styles/css/Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <img
        className="logo-icon"
        src="https://i.imgur.com/m2qhrGe.png"
        alt="logo"
      />
      <h3 className="title">
        <span className="pink-bold-font">Pink</span>
        Mango
      </h3>
    </div>
  );
}

export default Logo;