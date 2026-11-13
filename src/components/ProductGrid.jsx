import React from 'react';
import ProductCard from './ProductCard';
import { categoryTiles } from '../data/products';
import './ProductGrid.css';

export default function ProductGrid({ products, onAddToCart, categoryFilter }) {
  return (
    <section className="product-grid-section">
      <div className="container">
        {(!categoryFilter || categoryFilter === 'All') && (
          <div className="category-tiles-row">
            {categoryTiles.map((tile) => (
              <div key={tile.id} className="category-tile-card">
                <h3 className="tile-title">{tile.title}</h3>
                <div className="tile-quad-grid">
                  {tile.items.map((item) => (
                    <div key={item.name} className="quad-item">
                      <div className="quad-img-wrapper">
                        <img src={item.image} alt={item.name} className="quad-img" loading="lazy" />
                      </div>
                      <span className="quad-label">{item.name}</span>
                    </div>
                  ))}
                </div>
                <a href="#feed" className="tile-link">{tile.linkText}</a>
              </div>
            ))}
          </div>
        )}

        <div id="feed" className="products-feed-header">
          <h2 className="feed-title">
            {categoryFilter && categoryFilter !== 'All' 
              ? `Results in ${categoryFilter}` 
              : 'Recommended Deals & Popular Products'}
          </h2>
          <span className="feed-filter-count">{products.length} items</span>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
