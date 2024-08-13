import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DigimonStatistics = () => {
  const [levelCounts, setLevelCounts] = useState({});

  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => {
        const counts = data.reduce((acc, digimon) => {
          acc[digimon.level] = (acc[digimon.level] || 0) + 1;
          return acc;
        }, {});
        setLevelCounts(counts);
      });
  }, []);

  const data = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        label: 'Cantidad de Digimons por Nivel',
        data: Object.values(levelCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center my-4">Estadísticas de Digimons</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default DigimonStatistics;
