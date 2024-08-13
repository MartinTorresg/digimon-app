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
        backgroundColor: '#1C4DAF',
        borderColor: '#F0B310',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center my-4 text-blue-900 dark:text-yellow-500">Estadísticas de Digimons</h2>
      <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg p-4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default DigimonStatistics;
