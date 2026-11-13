import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useGlobalState, getCartTotal, getCartCount } from '../context/StateContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { state, dispatch } = useGlobalState();
  const { cart, user } = state;
  const navigate = useNavigate();

  const total = getCartTotal(cart);
  const itemCount = getCartCount(cart);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState({
    fullName: user ? user.name : 'Alex Johnson',
    street: '42 Silicon Avenue, Tech Park',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560100',
    country: 'India'
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = {
        orderId: `OD${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        items: [...cart],
        totalAmount: total,
        shippingAddress: address,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (ending 4242)' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI',
        status: 'Confirmed'
      };

      dispatch({ type: 'ADD_ORDER', payload: order });
      setIsSubmitting(false);
      navigate('/orders');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <div className="checkout-header-inner">
            <Link to="/" className="checkout-logo">amazon<span>.in</span></Link>
            <h1 className="checkout-header-title">Checkout</h1>
            <Lock className="checkout-header-lock" size={20} />
          </div>
        </header>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Your Cart is empty</h2>
          <p style={{ margin: '12px 0 20px', color: '#555' }}>You have no items in your cart to checkout.</p>
          <Link to="/" className="place-order-btn" style={{ display: 'inline-block', width: 'auto', textDecoration: 'none' }}>
            Return to Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header-inner">
          <Link to="/" className="checkout-logo">amazon<span>.in</span></Link>
          <h1 className="checkout-header-title">
            Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <Lock className="checkout-header-lock" size={20} />
        </div>
      </header>

      <div className="checkout-content">
        <div className="checkout-steps">
          <div className="checkout-step-card">
            <div className="step-header">
              <span className="step-number">1</span>
              <h2 className="step-title">Delivery address</h2>
            </div>
            <div className="address-grid">
              <div className="full-span">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="checkout-input"
                  value={address.fullName}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="full-span">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  className="checkout-input"
                  value={address.street}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="checkout-input"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="checkout-input"
                  value={address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="checkout-input"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="checkout-input"
                  value={address.country}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>

          <div className="checkout-step-card">
            <div className="step-header">
              <span className="step-number">2</span>
              <h2 className="step-title">Select a payment method</h2>
            </div>
            <div className="payment-options">
              <label className={`payment-option-label ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span>Credit or Debit Card (Visa, Mastercard, RuPay)</span>
              </label>

              <label className={`payment-option-label ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <span>Other UPI Apps (Google Pay, PhonePe, Paytm)</span>
              </label>

              <label className={`payment-option-label ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span>Cash on Delivery / Pay on Delivery</span>
              </label>
            </div>
          </div>

          <div className="checkout-step-card">
            <div className="step-header">
              <span className="step-number">3</span>
              <h2 className="step-title">Review items and delivery</h2>
            </div>
            <div className="checkout-review-items">
              {cart.map((item) => (
                <div key={item.id} className="review-item">
                  <img src={item.image} alt={item.title} className="review-item-img" />
                  <div className="review-item-title">
                    <div>{item.title}</div>
                    <span className="review-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <div className="review-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="checkout-summary-box">
          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing Order...' : 'Place your order'}
          </button>

          <p className="order-terms-note">
            By placing your order, you agree to Amazon's privacy notice and conditions of use.
          </p>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Items ({itemCount}):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping & handling:</span>
              <span style={{ color: '#007600', fontWeight: 600 }}>FREE</span>
            </div>
            <div className="summary-row total-row">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
