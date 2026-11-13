import React from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { useGlobalState } from '../context/StateContext';
import Header from '../components/Header';
import SubNav from '../components/SubNav';
import Footer from '../components/Footer';
import './OrdersPage.css';

export default function OrdersPage() {
  const { state } = useGlobalState();
  const { orders } = state;

  return (
    <div className="app">
      <Header />
      <SubNav />
      <main className="main-content">
        <div className="orders-page container">
          <h1 className="orders-title">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="no-orders-box">
              <h3>You have not placed any orders yet.</h3>
              <p style={{ margin: '12px 0 20px', color: '#565959' }}>
                Looking for ideas? Check out today's recommended deals.
              </p>
              <Link
                to="/"
                className="order-action-btn"
                style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 20px' }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card">
                  <div className="order-card-header">
                    <div className="order-header-meta">
                      <div>
                        <span className="order-meta-label">Order Placed</span>
                        <span className="order-meta-val">{order.date}</span>
                      </div>
                      <div>
                        <span className="order-meta-label">Total</span>
                        <span className="order-meta-val">${order.totalAmount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="order-meta-label">Ship To</span>
                        <span className="order-meta-val">{order.shippingAddress?.fullName}</span>
                      </div>
                    </div>
                    <div className="order-header-id">
                      <span className="order-meta-label">Order # {order.orderId}</span>
                      <span className="order-meta-val">{order.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="order-card-body">
                    <div className="order-status-badge">
                      <PackageCheck size={18} style={{ display: 'inline', marginRight: '6px' }} />
                      Delivering Tomorrow by 8 PM
                    </div>

                    <div className="order-items-grid">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item-row">
                          <img src={item.image} alt={item.title} className="order-item-img" />
                          <div className="order-item-details">
                            <h4 className="order-item-title">{item.title}</h4>
                            <span className="order-item-qty">Quantity: {item.quantity}</span>
                            <div style={{ fontWeight: 600, marginTop: '4px' }}>
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="order-item-actions">
                            <button className="order-action-btn">Track package</button>
                            <Link to={`/product/${item.id}`} className="order-action-btn" style={{ textAlign: 'center', background: '#f0f2f2', border: '1px solid #d5d9d9', textDecoration: 'none', color: '#111' }}>
                              View product
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
