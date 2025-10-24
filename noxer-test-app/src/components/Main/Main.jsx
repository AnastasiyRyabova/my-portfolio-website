import React from 'react';
import Slider from '../Slider/Slider';
import Categories from '../Categories/Categories';
import ProductsList from '../ProductsList/ProductsList';
import Search from '../Search/Search';

export default function Main({ query }) {
  return (
    <main className="main">
      <Search initialQuery={query} />
      {!query && <Slider />}
      {!query && <Categories />}
      <ProductsList query={query} />
    </main>
  );
}
