import React from 'react';
import Header from '../components/Header';
import SubNav from '../components/SubNav';
import Banner from '../components/Banner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { useGlobalState } from '../context/StateContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { state } = useGlobalState();
  const { searchQuery, selectedCategory } = state;
  const navigate = useNavigate();

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
      <Header />
      <SubNav />
      <main className="main-content">
        <Banner />
        <ProductGrid
          products={filteredProducts}
          categoryFilter={selectedCategory}
        />
      </main>
      <Toast onNavigateToCart={() => navigate('/cart')} />
      <Footer />
    </div>
  );
}
