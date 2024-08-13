import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 shadow-md p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-yellow-500">© 2024 Digimon App. Todos los derechos reservados.</p>
        <p className="text-yellow-500">Creado por <a href="https://github.com/MartinTorresg" className="text-yellow-500 hover:underline">Martín Torres</a></p>
      </div>
    </footer>
  );
};

export default Footer;
