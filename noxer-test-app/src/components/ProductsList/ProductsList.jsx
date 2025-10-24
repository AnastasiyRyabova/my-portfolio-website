import React, { useState, useEffect } from 'react';
import productsListData from '../../data/productsListData.js';
import './ProductsList.css';
import likeOn from '../../image/like-on.svg';
import likeOff from '../../image/like-off.svg';

const ProductsList = ({ query }) => {
  const [products, setProducts] = useState(productsListData);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const selectProduct = (name) => {
    alert(`Продукт ${name} выбран!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://noxer-test.ru/webapp/api/products/on_main');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const apiData = await response.json();

        let productsFromApi = [];
        if (Array.isArray(apiData)) {
          productsFromApi = apiData;
        } else if (apiData.products && Array.isArray(apiData.products)) {
          productsFromApi = apiData.products;
        } else if (apiData.data && Array.isArray(apiData.data)) {
          productsFromApi = apiData.data;
        } else {
          console.warn('API вернул неожиданный формат данных. Ожидался массив или объект с products/data. Получено:', apiData);
          return;
        }

        const processedProductsFromApi = productsFromApi
          .filter((product) => product.name)
          .map((product) => ({
            ...product,
            image: product.image || productsListData[Math.floor(Math.random() * productsListData.length)].image,
            discountPrice: 9999,
            price: product.price || 9999,
          }));

        setProducts((prev) => {
          const combined = [...prev, ...processedProductsFromApi];
          const unique = combined.filter((item, index, arr) =>
            arr.findIndex(i => i.id === item.id) === index
          );
          return unique;
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных из API:', error);
      }
    };

    fetchProducts();
  }, []);

  const safeQuery = query || '';
  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(safeQuery.toLowerCase())
  );

  return (
    <div className="products">
      <ul className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const badges = [product.new, product.hit, product.vip, product.sele].filter(Boolean);

            return (
              <li key={product.id} className="products-list__card">
                <div className="products-list__badges">
                  {badges.map((badge, index) => (
                    <span key={index} className={`products-list__badge products-list__badge--${badge}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                <img src={product.image} alt={product.name} className="products-list__image" />
                <button
                  className={`products-list__favorite-button ${favorites.includes(product.id) ? 'products-list__favorite-button--active' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <img src={favorites.includes(product.id) ? likeOn : likeOff} alt="Избранное" />
                </button>
                <div className="products-list__prices">
                  {product.discountPercent ? (
                    <>
                      <span className="products-list__discount-price">{product.discountPrice} ₽</span>
                      <del className="products-list__original-price">{product.price} ₽</del>
                      <span className="products-list__discount-percent">(-{product.discountPercent}%)</span>
                    </>
                  ) : (
                    <span className="products-list__price">{product.discountPrice} ₽</span>
                  )}
                </div>
                <h3 className="products-list__name">{product.name}</h3>

                <div className="products-list__actions">
                  <button className="products-list__select-button" onClick={() => selectProduct(product.name)}>
                    Выбрать
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="products-list__no-results">
            Нет товаров, соответствующих запросу "{safeQuery}".
          </p>
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
