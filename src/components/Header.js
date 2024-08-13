import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-500 dark:text-blue-300 text-xl font-bold">Digimon App</Link>
        <nav>
          <Link to="/" className="text-blue-500 dark:text-blue-300 hover:underline mx-2">Inicio</Link>
          <Link to="/filter" className="text-blue-500 dark:text-blue-300 hover:underline mx-2">Filtrar por Nivel</Link>
          <Link to="/random" className="text-blue-500 dark:text-blue-300 hover:underline mx-2">Digimon Aleatorio</Link>
          <Link to="/favorites" className="text-blue-500 dark:text-blue-300 hover:underline mx-2">Favoritos</Link>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 dark:bg-blue-300 text-white dark:text-black p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>
    </header>
  );
};

export default Header;
