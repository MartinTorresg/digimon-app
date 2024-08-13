import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import Spinner from './Spinner';

const RandomDigimon = () => {
  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const fetchRandomDigimon = () => {
    setLoading(true);
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setDigimon(data[randomIndex]);
        setLoading(false);
      });
  };

  const toggleFavorite = (digimon) => {
    if (favorites.some(fav => fav.name === digimon.name)) {
      removeFavorite(digimon.name);
    } else {
      addFavorite(digimon);
    }
  };

  return (
    <div className="container mx-auto text-center my-8">
      <button
        onClick={fetchRandomDigimon}
        className="bg-blue-500 text-white p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-8"
      >
        Obtener Digimon Aleatorio
      </button>
      {loading && <Spinner />}
      {digimon && !loading && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col items-center transform transition-transform hover:scale-105">
          <img src={digimon.img} alt={digimon.name} className="w-32 h-32 object-cover mb-2 rounded-full shadow-md"/>
          <h2 className="text-2xl font-semibold">{digimon.name}</h2>
          <p className="text-gray-700 dark:text-gray-300">{digimon.level}</p>
          {/* Simulando estadísticas adicionales */}
          <div className="mt-4 w-full">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Estadísticas</h3>
            <p className="text-gray-700 dark:text-gray-300">Ataque: {Math.floor(Math.random() * 100)}</p>
            <p className="text-gray-700 dark:text-gray-300">Defensa: {Math.floor(Math.random() * 100)}</p>
            <p className="text-gray-700 dark:text-gray-300">Velocidad: {Math.floor(Math.random() * 100)}</p>
          </div>
          <button
            onClick={() => toggleFavorite(digimon)}
            className={`mt-2 ${favorites.some(fav => fav.name === digimon.name) ? 'text-red-500' : 'text-gray-500'} hover:underline`}
          >
            {favorites.some(fav => fav.name === digimon.name) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomDigimon;
