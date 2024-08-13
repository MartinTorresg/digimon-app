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
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center my-4">Distribución de Digimons por Nivel</h2>
      <Bar data={data} />
    </div>
  );
};

export default FavoriteDistributionChart;
