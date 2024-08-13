import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteDistributionChart = () => {
  const { favorites } = useFavorites();

  const levels = favorites.map(digimon => digimon.level);
  const levelCounts = levels.reduce((acc, level) => {
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        label: 'Número de Digimons',
        data: Object.values(levelCounts),
        backgroundColor: '#1C4DAF',
        borderColor: '#F0B310',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center my-4 text-blue-900 dark:text-yellow-500">Distribución de Digimons por Nivel</h2>
      <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg p-4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default FavoriteDistributionChart;
