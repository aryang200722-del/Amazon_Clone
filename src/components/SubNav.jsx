import React from 'react';
import { Menu } from 'lucide-react';
import './SubNav.css';

const navItems = [
  "All",
  "Today's Deals",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
  "Electronics",
  "Amazon Pay",
  "Prime"
];

export default function SubNav({ onSelectCategory }) {
  return (
    <div className="subnav">
      <div className="subnav-left">
        {navItems.map((item, index) => (
          <div
            key={item}
            className={`subnav-item ${index === 0 ? 'subnav-all' : ''}`}
            onClick={() => onSelectCategory && onSelectCategory(item === 'All' ? 'All' : item)}
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
