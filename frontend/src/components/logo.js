import React from 'react';
import logoImage from '../images/BCA-logo-notext.webp'

function Logo() {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" />
    </div>
  );
}

export default Logo;