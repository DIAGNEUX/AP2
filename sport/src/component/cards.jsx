import React from 'react';

const NavigationBar = () => {
  return (
    <nav>
      <div className="logo">
        {/* Add your logo here */}
      </div>
      <ul className="links">
        <li><a href="/">Accueil</a></li>
        <li><a href="/about">À propos</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        <button>Se connecter</button>
        <button>S'inscrire</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
