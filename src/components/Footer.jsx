import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <button className="back-to-top-btn" onClick={scrollToTop}>
        Back to top
      </button>

      <div className="footer-nav">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <ul>
            <li><a href="#">About Amazon</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <ul>
            <li><a href="#">Sell on Amazon</a></li>
            <li><a href="#">Sell under Amazon Accelerator</a></li>
            <li><a href="#">Protect and Build Your Brand</a></li>
            <li><a href="#">Amazon Global Selling</a></li>
            <li><a href="#">Become an Affiliate</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <ul>
            <li><a href="#">COVID-19 and Amazon</a></li>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">100% Purchase Protection</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-logo">amazon</div>
        <div className="footer-lang-pill">🌐 English</div>
        <div className="footer-lang-pill">India</div>
      </div>

      <div className="footer-bottom">
        <div className="footer-sublinks">
          <a href="#">Conditions of Use & Sale</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Interest-Based Ads</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates (Amazon Clone Demo)</p>
      </div>
    </footer>
  );
}
