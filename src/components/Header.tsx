import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import VkLogoPath from '../assets/VK_Logo.svg.webp'

const Header = () => {
  return (
    <header>
      <nav>
      <Link to="/"><img className='logo-vk' src={VkLogoPath} alt="логотип Вконтакте" /></Link>
        <Link to="/">
        <p>Главная</p>
        </Link>
        <Link to="/favorites"><p>Избранное</p></Link>
      </nav>
    </header>
  );
}

export default Header;
