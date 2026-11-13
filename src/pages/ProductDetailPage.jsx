import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useGlobalState } from '../context/StateContext';
import Header from '../components/Header';
import SubNav from '../components/SubNav';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="app">
        <Header />
        <SubNav />
        <main className="main-content container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Product Not Found</h2>
          <p style={{ margin: '14px 0 20px' }}>The product you are looking for does not exist or has been removed.</p>
          <Link to="/" style={{ color: '#007185', fontWeight: 600 }}>Return to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate('/checkout');
  };

  return (
    <div className="app">
      <Header />
      <SubNav />
      <main className="main-content">
        <div className="product-detail-page container">
          <div className="breadcrumb-nav">
            <Link to="/"><ArrowLeft size={14} style={{ display: 'inline', marginRight: '4px' }} /> Back to results</Link>
            <span> | {product.category} &gt; {product.title.slice(0, 40)}...</span>
          </div>

          <div className="product-detail-grid">
            <div className="detail-gallery">
              <img src={product.image} alt={product.title} className="detail-main-img" />
            </div>

            <div className="detail-info">
              <h1 className="detail-title">{product.title}</h1>

              <div className="detail-rating-row">
                <div style={{ display: 'flex', color: '#ffa41c' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? '#ffa41c' : 'none'}
                      color="#ffa41c"
                    />
                  ))}
                </div>
                <span style={{ color: '#007185', fontWeight: 600 }}>{product.rating} out of 5</span>
                <span style={{ color: '#565959' }}>({product.reviewsCount.toLocaleString()} ratings)</span>
              </div>

              <div className="detail-price-box">
                <div className="detail-price-main">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div style={{ fontSize: '13px', color: '#565959' }}>
                    Typical price: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                {product.prime && (
                  <div style={{ color: '#00a8e1', fontWeight: 800, fontStyle: 'italic', fontSize: '14px' }}>
                    prime
                  </div>
                )}
              </div>

              <table className="detail-specs-table">
                <tbody>
                  <tr>
                    <td className="spec-label">Brand</td>
                    <td>Amazon Choice Tech</td>
                  </tr>
                  <tr>
                    <td className="spec-label">Category</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td className="spec-label">Item Model</td>
                    <td>{product.id.toUpperCase()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="about-item-section">
                <h4>About this item</h4>
                <ul>
                  <li>{product.description}</li>
                  <li>Engineered with premium durable materials for long-lasting performance.</li>
                  <li>Seamless compatibility across devices with fast wireless and wired connectivity.</li>
                  <li>Includes 1-year limited warranty and dedicated 24/7 customer support.</li>
                </ul>
              </div>
            </div>

            <aside className="buy-box">
              <div className="buy-box-price">${(product.price * quantity).toFixed(2)}</div>
              <div className="buy-box-delivery">
                <strong>FREE delivery Tomorrow</strong> if ordered within 4 hrs.
              </div>
              <div className="buy-box-stock">In Stock</div>

              <div>
                <label style={{ fontSize: '13px', marginRight: '8px' }}>Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d5d9d9' }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="buy-box-actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              <div style={{ fontSize: '12px', color: '#565959', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} /> <span>Secure transaction</span>
                </div>
                <div>Ships from: <strong>Amazon.com</strong></div>
                <div>Sold by: <strong>Amazon Clone Official</strong></div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Toast onNavigateToCart={() => navigate('/cart')} />
      <Footer />
    </div>
  );
}
