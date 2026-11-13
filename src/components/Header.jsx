import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useGlobalState, getCartCount } from '../context/StateContext';
import './Header.css';

export default function Header({ onNavigateToCart, onNavigateHome, onNavigateSignIn, onNavigateOrders }) {
  const { state, dispatch } = useGlobalState();
  const { cart, user, searchQuery, selectedCategory } = state;
  const [term, setTerm] = useState(searchQuery || '');
  const [category, setCategory] = useState(selectedCategory || 'All');

  const cartCount = getCartCount(cart);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: term });
    dispatch({ type: 'SET_CATEGORY', payload: category });
    if (onNavigateHome) onNavigateHome();
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo" onClick={onNavigateHome} role="button" tabIndex={0}>
          <span className="amazon-brand-logo">
            amazon<span className="brand-prime">.in</span>
          </span>
        </div>

        <div className="header-location">
          <MapPin size={18} color="#fff" />
          <div>
            <span className="loc-line-1">Deliver to</span>
            <span className="loc-line-2">India</span>
          </div>
        </div>

        <form className="header-search" onSubmit={handleSearch}>
          <select
            className="search-category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Computers">Computers</option>
            <option value="Home">Home & Kitchen</option>
            <option value="Fashion">Fashion</option>
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search Amazon.in"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <button type="submit" className="search-submit-btn" aria-label="Search">
            <Search size={20} color="#111" />
          </button>
        </form>

        <div className="header-lang">
          <span className="flag-icon">🇮🇳</span>
          <span>EN</span>
          <ChevronDown size={14} color="#aaa" />
        </div>

        <div
          className="header-nav-link"
          onClick={user ? handleSignOut : onNavigateSignIn}
          role="button"
          tabIndex={0}
        >
          <span className="nav-line-1">
            {user ? `Hello, ${user.name}` : 'Hello, Sign in'}
          </span>
          <span className="nav-line-2">
            {user ? 'Sign Out' : 'Account & Lists'} <ChevronDown size={14} color="#aaa" />
          </span>
        </div>

        <div
          className="header-nav-link returns-link"
          onClick={onNavigateOrders}
          role="button"
          tabIndex={0}
        >
          <span className="nav-line-1">Returns</span>
          <span className="nav-line-2">& Orders</span>
        </div>

        <div
          className="header-cart"
          onClick={onNavigateToCart}
          role="button"
          tabIndex={0}
        >
          <div className="cart-icon-wrapper">
            <ShoppingCart size={32} />
            <span className="cart-count">{cartCount}</span>
          </div>
          <span className="cart-title">Cart</span>
        </div>
      </div>
    </header>
  );
}
