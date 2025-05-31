import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="logo">
        <h1 className="text-primary text-2xl font-bold">LOGO</h1>
      </div>
      
      <div className="search-bar flex flex-1 max-w-xl mx-8">
        <input
          type="text"
          placeholder="Căutați produse ..."
          className="w-full py-2 px-4 border border-gray-200 rounded-l-full focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button className="bg-primary hover:bg-primary-dark text-white px-4 rounded-r-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-700 hover:text-primary font-medium">Inregistrare</a>
        <a href="#" className="text-gray-700 hover:text-primary font-medium">Conectare</a>
      </div>
    </header>
  );
};

export default Header;