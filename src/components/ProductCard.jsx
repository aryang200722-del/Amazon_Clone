import React from 'react';
import { Star } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const { id, title, price, originalPrice, rating, reviewsCount, image, prime, badge } = product;

  return (
    <div className="product-card">
      {badge && <div className="product-badge">{badge}</div>}

      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" loading="lazy" />
      </div>

      <h3 className="product-title" title={title}>
        {title}
      </h3>

      <div className="product-rating">
        <div className="product-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(rating) ? '#ffa41c' : 'none'}
              color="#ffa41c"
            />
          ))}
        </div>
        <span className="product-reviews-count">({reviewsCount.toLocaleString()})</span>
      </div>

      <div className="product-price-row">
        <span className="price-currency">$</span>
        <span className="price-amount">{price.toFixed(2)}</span>
        {originalPrice && (
          <span className="price-old">${originalPrice.toFixed(2)}</span>
        )}
        {originalPrice && (
          <span className="price-discount">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
          </span>
        )}
      </div>

      <div className="product-prime-row">
        {prime && <span className="prime-tag">prime</span>}
        <span>FREE delivery Tomorrow</span>
      </div>

      <div className="product-card-footer">
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
