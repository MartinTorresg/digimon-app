import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DigimonList from './components/DigimonList';
import DigimonDetails from './components/DigimonDetails';
import FilterByLevel from './components/FilterByLevel';
import RandomDigimon from './components/RandomDigimon';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen flex flex-col' : 'bg-gray-100 text-black min-h-screen flex flex-col'}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow mt-20">
        <Routes>
          <Route path="/" element={<DigimonList />} />
          <Route path="/digimon/:name" element={<DigimonDetails />} />
          <Route path="/filter" element={<FilterByLevel />} />
          <Route path="/random" element={<RandomDigimon />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
