import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedLevel, setSelectedLevel] = useState('');

  const levels = [...new Set(favorites.map(digimon => digimon.level))];

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const filteredFavorites = selectedLevel
    ? favorites.filter(digimon => digimon.level === selectedLevel)
    : favorites;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-4">Digimons Favoritos</h1>
      <div className="flex justify-center mb-4">
        <select onChange={handleLevelChange} value={selectedLevel} className="border p-2 rounded-lg w-full max-w-md dark:bg-gray-700 dark:text-white">
          <option value="">Todos los Niveles</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      {filteredFavorites.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No tienes Digimons favoritos en este nivel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFavorites.map((digimon) => (
            <div key={digimon.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center transform transition-transform hover:scale-105">
              <img src={digimon.img} alt={digimon.name} className="w-32 h-32 object-cover mb-2 rounded-full shadow-md"/>
              <h2 className="text-2xl font-semibold">{digimon.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{digimon.level}</p>
              <button
                onClick={() => removeFavorite(digimon.name)}
                className="mt-2 text-red-500 hover:underline"
              >
                Eliminar de Favoritos
              </button>
              <Link to={`/digimon/${digimon.name}`} className="text-blue-500 dark:text-blue-300 hover:underline mt-2">Ver detalles</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
