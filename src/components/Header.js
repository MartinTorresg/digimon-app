import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/digimon-logo.png';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-900 shadow-md p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-yellow-500 text-xl font-bold">
          <img src={logo} alt="Digimon Logo" className="w-12 h-auto mr-2" />
          <span className="hidden md:inline">Digimon App</span>
        </Link>
        <button onClick={toggleMenu} className="md:hidden text-yellow-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <nav className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:space-x-4 mt-4 md:mt-0`}>
          <Link to="/" className="text-yellow-500 hover:underline">Inicio</Link>
          <Link to="/filter" className="text-yellow-500 hover:underline">Filtrar por Nivel</Link>
          <Link to="/random" className="text-yellow-500 hover:underline">Digimon Aleatorio</Link>
          <Link to="/favorites" className="text-yellow-500 hover:underline">Favoritos</Link>
          <button
            onClick={toggleDarkMode}
            className="bg-yellow-500 text-blue-900 p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 mt-4 md:mt-0"
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
