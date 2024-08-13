import React, { useEffect, useState } from 'react';

const FilterByLevel = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [digimons, setDigimons] = useState([]);

  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => {
        const levelCounts = data.reduce((acc, digimon) => {
          acc[digimon.level] = (acc[digimon.level] || 0) + 1;
          return acc;
        }, {});
        setLevels(Object.keys(levelCounts));
      });
  }, []);

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    fetch(`https://digimon-api.vercel.app/api/digimon/level/${e.target.value}`)
      .then(response => response.json())
      .then(data => setDigimons(data));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center my-4">Filtrar por Nivel</h1>
      <select onChange={handleLevelChange} value={selectedLevel} className="block w-full p-2 border rounded-lg mb-8 dark:bg-gray-700 dark:text-white">
        <option value="">Selecciona un nivel</option>
        {levels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
      {selectedLevel && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Digimons en el nivel {selectedLevel}</h2>
          <p>Total: {digimons.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {digimons.map(d => (
              <div key={d.name} className="bg-white dark:bg-gray-800 rounded shadow-md p-4 flex flex-col items-center transform transition-transform hover:scale-105">
                <img src={d.img} alt={d.name} className="w-32 h-32 object-cover mb-2 rounded-full shadow-md"/>
                <h2 className="text-xl font-semibold">{d.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">{d.level}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterByLevel;
