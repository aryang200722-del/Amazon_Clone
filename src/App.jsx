import React, { useState } from 'react';
import Header from './components/Header';
import SubNav from './components/SubNav';
import Banner from './components/Banner';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { products } from './data/products';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleSearch = (term, category) => {
    setCategoryFilter(category);
  };

  const displayedProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());

  return (
    <div className="app">
      <Header cartCount={cartCount} onSearch={handleSearch} />
      <SubNav onSelectCategory={setCategoryFilter} />
      <main className="main-content">
        <Banner />
        <ProductGrid
          products={displayedProducts}
          onAddToCart={handleAddToCart}
          categoryFilter={categoryFilter}
        />
      </main>
      <Footer />
    </div>
  );
}
