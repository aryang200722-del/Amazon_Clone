import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SubNav from '../components/SubNav';
import CartPage from '../components/CartPage';
import Footer from '../components/Footer';

export default function CartView() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <Header />
      <SubNav />
      <main className="main-content">
        <CartPage
          onProceedToCheckout={() => navigate('/checkout')}
          onContinueShopping={() => navigate('/')}
        />
      </main>
      <Footer />
    </div>
  );
}
