import React, { useState } from 'react';
import Header from './components/Header';
import SubNav from './components/SubNav';
import Banner from './components/Banner';
import ProductGrid from './components/ProductGrid';
import CartPage from './components/CartPage';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { StateProvider, useGlobalState } from './context/StateContext';
import { products } from './data/products';

function MainApp() {
  const [currentView, setCurrentView] = useState('home');
  const { state } = useGlobalState();
  const { searchQuery, selectedCategory } = state;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'All' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app">
      <Header
        onNavigateHome={() => setCurrentView('home')}
        onNavigateToCart={() => setCurrentView('cart')}
        onNavigateOrders={() => alert('Orders feature arrives in Stage 3')}
        onNavigateSignIn={() => alert('Sign-in feature arrives in Stage 3')}
      />

      <SubNav onSelectCategory={() => setCurrentView('home')} />

      <main className="main-content">
        {currentView === 'home' ? (
          <>
            <Banner />
            <ProductGrid
              products={filteredProducts}
              categoryFilter={selectedCategory}
            />
          </>
        ) : (
          <CartPage
            onContinueShopping={() => setCurrentView('home')}
            onProceedToCheckout={() => alert('Checkout flow arrives in Stage 3')}
          />
        )}
      </main>

      <Toast onNavigateToCart={() => setCurrentView('cart')} />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StateProvider>
      <MainApp />
    </StateProvider>
  );
}
