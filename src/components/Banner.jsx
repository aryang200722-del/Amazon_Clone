import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Banner.css';

const slides = [
  {
    id: 1,
    tag: "DEAL OF THE DAY",
    title: "Upgrade to Next-Gen Audio",
    subtitle: "Premium Noise-Cancelling Headphones up to 45% off",
    bg: "linear-gradient(120deg, #1f2937, #111827), url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1500&q=80')",
    btnText: "Shop the Sale"
  },
  {
    id: 2,
    tag: "FESTIVAL SPECIALS",
    title: "Flagship Smartphones & Gadgets",
    subtitle: "Zero down payment and instant exchange bonuses",
    bg: "linear-gradient(120deg, #0f172a, #1e293b), url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1500&q=80')",
    btnText: "Explore Devices"
  },
  {
    id: 3,
    tag: "HOME ESSENTIALS",
    title: "Transform Your Living Space",
    subtitle: "Modern smart home appliances starting at $29",
    bg: "linear-gradient(120deg, #1c1917, #292524), url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1500&q=80')",
    btnText: "See More Deals"
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="banner">
      <div className="banner-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: slide.bg, backgroundBlendMode: 'overlay' }}
          >
            <div className="banner-content">
              <span className="banner-tag">{slide.tag}</span>
              <h1 className="banner-title">{slide.title}</h1>
              <p className="banner-subtitle">{slide.subtitle}</p>
              <button className="banner-btn">{slide.btnText}</button>
            </div>
          </div>
        ))}

        <button className="banner-btn-nav banner-btn-prev" onClick={prevSlide} aria-label="Previous Slide">
          <ChevronLeft size={36} />
        </button>
        <button className="banner-btn-nav banner-btn-next" onClick={nextSlide} aria-label="Next Slide">
          <ChevronRight size={36} />
        </button>

        <div className="banner-gradient" />
      </div>
    </div>
  );
}
