import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const DigimonDetails = () => {
  const { name } = useParams();
  const [digimon, setDigimon] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
      .then(response => response.json())
      .then(data => setDigimon(data[0]));
  }, [name]);

  if (!digimon) return <div>Loading...</div>;

  const toggleFavorite = () => {
    if (favorites.some(fav => fav.name === digimon.name)) {
      removeFavorite(digimon.name);
    } else {
      addFavorite(digimon);
    }
  };

  return (
    <div className="container mx-auto my-8 flex justify-center items-center min-h-screen pt-20">
      <div className="max-w-md bg-white dark:bg-blue-900 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl mt-8 md:mt-0">
        <div className="relative">
          <img src={digimon.img} alt={digimon.name} className="w-full h-64 object-contain p-4 bg-white" />
        </div>
        <div className="p-6 bg-blue-900 text-yellow-500">
          <h2 className="text-3xl font-bold mb-2">{digimon.name}</h2>
          <p className="text-yellow-500 mb-4">{digimon.level}</p>
          <button
            onClick={toggleFavorite}
            className={`mt-2 ${favorites.some(fav => fav.name === digimon.name) ? 'text-red-500' : 'text-yellow-500'} hover:underline`}
          >
            {favorites.some(fav => fav.name === digimon.name) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
          </button>
          <div className="mt-4">
            <Link to="/" className="text-yellow-500 hover:underline">Volver a la lista</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigimonDetails;
