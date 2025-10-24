import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SearchResults from './components/SearchResults/SearchResults';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
