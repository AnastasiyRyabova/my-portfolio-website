import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productsListData from '../../data/productsListData.js';
import './SearchResults.css'; 

const popularSearches = [
  "футболка женская",
  "кофта",
  "сертификат",
  "куртка детская",
  "футболка",
  "подарочный сертификат",
  "штаны спортивные"
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  if (query.trim() === '') {
    return (
      <div className="search-results">
        <h2>Часто ищут</h2>
        <ul className="popular-searches__list">
          {popularSearches.map((search, index) => (
            <li key={index} className="popular-searches__item">
              <Link to={`/search?q=${encodeURIComponent(search)}`} className="popular-searches__link">
                {search}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const filteredProducts = productsListData.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>Результаты поиска для: "{query}"</h2>
      {filteredProducts.length > 0 ? (
        <ul className="search-results__list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="search-results__item">
              <img src={product.image} alt={product.name} className="search-results__image" />
              <div className="search-results__info">
                <h4 className="search-results__name">{product.name}</h4>
                <p className="search-results__price">
                  {product.discountPercent ? (
                    <>
                      {product.discountPrice}₽ <span className="search-results__old-price">{product.price}₽</span>
                    </>
                  ) : (
                    `${product.price}₽`
                  )}
                </p>
                <div className="search-results__tags">
                  {product.hit && <span className="tag hit">HIT</span>}
                  {product.new && <span className="tag new">NEW</span>}
                  {product.vip && <span className="tag vip">ПРЕМИУМ</span>}
                  {product.sele && <span className="tag sele">SELE</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="search-results__no-results">Ничего не найдено по запросу "{query}"</p>
      )}
    </div>
  );
}
