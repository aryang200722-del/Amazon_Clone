import React from 'react';
import { MapPin, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ cartCount = 0, onSearch, user, onSignOut }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, category);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <a href="/" className="header-logo">
          <span className="amazon-brand-logo">
            amazon<span className="brand-prime">.in</span>
          </span>
        </a>

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
            <option value="Books">Books</option>
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search Amazon.in"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        <a href={user ? "#" : "/signin"} className="header-nav-link" onClick={user ? onSignOut : undefined}>
          <span className="nav-line-1">Hello, {user ? user.name : 'Sign in'}</span>
          <span className="nav-line-2">
            Account & Lists <ChevronDown size={14} color="#aaa" />
          </span>
        </a>

        <a href="/orders" className="header-nav-link returns-link">
          <span className="nav-line-1">Returns</span>
          <span className="nav-line-2">& Orders</span>
        </a>

        <a href="/cart" className="header-cart">
          <div className="cart-icon-wrapper">
            <ShoppingCart size={32} />
            <span className="cart-count">{cartCount}</span>
          </div>
          <span className="cart-title">Cart</span>
        </a>
      </div>
    </header>
  );
}
