import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { useFavorites } from '../context/FavoritesContext';

const DigimonList = () => {
  const [digimons, setDigimons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [digimonsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => {
        setDigimons(data.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      });
  }, []);

  const filteredDigimons = digimons.filter(digimon =>
    digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDigimon = currentPage * digimonsPerPage;
  const indexOfFirstDigimon = indexOfLastDigimon - digimonsPerPage;
  const currentDigimons = filteredDigimons.slice(indexOfFirstDigimon, indexOfLastDigimon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleFavorite = (digimon) => {
    if (favorites.some(fav => fav.name === digimon.name)) {
      removeFavorite(digimon.name);
    } else {
      addFavorite(digimon);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-4 text-blue-900 dark:text-yellow-500">Lista de Digimons</h1>
      <p className="text-center text-gray-700 dark:text-yellow-500 mb-4">Total de Digimons: {filteredDigimons.length}</p>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar Digimon..."
          className="border p-2 rounded-lg w-full max-w-md dark:bg-blue-900 dark:text-yellow-500"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentDigimons.map((digimon) => (
          <div key={digimon.name} className="bg-white dark:bg-blue-900 rounded-lg shadow-lg p-4 flex flex-col items-center transform transition-transform hover:scale-105">
            <img src={digimon.img} alt={digimon.name} className="w-32 h-32 object-cover mb-2 rounded-full shadow-md"/>
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-yellow-500">{digimon.name}</h2>
            <p className="text-gray-700 dark:text-yellow-500">{digimon.level}</p>
            <button
              onClick={() => toggleFavorite(digimon)}
              className={`mt-2 ${favorites.some(fav => fav.name === digimon.name) ? 'text-red-500' : 'text-yellow-500'} hover:underline`}
            >
              {favorites.some(fav => fav.name === digimon.name) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
            </button>
            <Link to={`/digimon/${digimon.name}`} className="text-blue-900 dark:text-yellow-500 hover:underline mt-2">Ver detalles</Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(filteredDigimons.length / digimonsPerPage)).keys()].map(number => (
          <button 
            key={number + 1} 
            onClick={() => paginate(number + 1)} 
            className={`border p-2 rounded-lg mx-1 ${currentPage === number + 1 ? 'bg-blue-900 text-yellow-500' : 'bg-white dark:bg-blue-900 text-blue-900 dark:text-yellow-500'} transition-transform transform hover:scale-105`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DigimonList;
