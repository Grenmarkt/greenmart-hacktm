// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetailPage from './components/ProductDetailPage';
import SearchPage from './components/SearchPage';
import HomePageDemo from './components/HomePage';
import FarmDetailPage from './components/FarmDetailPage';
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
      
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/homepage" element={<HomePageDemo />} />
                  <Route path="/farm/:farmSlug" element={<FarmDetailPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
