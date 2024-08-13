import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-300">© 2024 Digimon App. Todos los derechos reservados.</p>
        <p className="text-gray-700 dark:text-gray-300">Creado por <a href="https://github.com/MartinTorresg" className="text-blue-500 dark:text-blue-300 hover:underline">Martín Torres</a></p>
      </div>
    </footer>
  );
};

export default Footer;
