import React from 'react';
import { Menu } from 'lucide-react';
import { useGlobalState } from '../context/StateContext';
import './SubNav.css';

const navItems = [
  "All",
  "Today's Deals",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
  "Electronics",
  "Computers",
  "Home",
  "Fashion"
];

export default function SubNav({ onSelectCategory }) {
  const { dispatch } = useGlobalState();

  const handleCategoryClick = (item) => {
    const category = item === "Today's Deals" || item === "All" ? "All" : item;
    dispatch({ type: 'SET_CATEGORY', payload: category });
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <div className="subnav">
      <div className="subnav-left">
        {navItems.map((item, index) => (
          <div
            key={item}
            className={`subnav-item ${index === 0 ? 'subnav-all' : ''}`}
            onClick={() => handleCategoryClick(item)}
            role="button"
            tabIndex={0}
          >
            {index === 0 && <Menu size={17} />}
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="subnav-right">
        <span className="subnav-banner-text">Super Value Days | Save Up to 50%</span>
      </div>
    </div>
  );
}
