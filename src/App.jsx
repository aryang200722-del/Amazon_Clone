import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StateProvider } from './context/StateContext';
import HomePage from './pages/HomePage';
import CartView from './pages/CartView';
import CheckoutPage from './pages/CheckoutPage';
import SignInPage from './pages/SignInPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}
