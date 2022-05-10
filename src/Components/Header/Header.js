// Librairies
import React from 'react';
import './Header.css';
// Logo
import LOGO from '../../pictures/logo.png';
// Components
import Navigation from './Navigation/Navigation';

const Header = () => {
  return (
    <header>
      {/* LOGO */}
      <img src={LOGO} alt='Quizz-creator' />
      {/* Navigation */}
      <nav>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;
