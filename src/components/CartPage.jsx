import React from 'react';
import { Trash2, Plus, Minus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useGlobalState, getCartTotal, getCartCount } from '../context/StateContext';
import './CartPage.css';

export default function CartPage({ onProceedToCheckout, onContinueShopping }) {
  const { state, dispatch } = useGlobalState();
  const { cart } = state;

  const total = getCartTotal(cart);
  const itemCount = getCartCount(cart);

  const handleUpdateQuantity = (id, newQty) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: newQty }
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page container">
        <div className="cart-main">
          <div className="cart-empty">
            <h3>Your Amazon Cart is empty</h3>
            <p>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, electronics, and more.</p>
            <button className="shop-deals-btn" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-layout">
        <div className="cart-main">
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <span className="cart-price-col-header">Price</span>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />

                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <span className="cart-item-stock">In Stock</span>
                  {item.prime && (
                    <div className="cart-item-prime">
                      <span className="prime-tag">prime</span>
                      <span>Eligible for FREE Shipping</span>
                    </div>
                  )}

                  <div className="cart-item-actions">
                    <div className="cart-qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="cart-action-separator">|</span>

                    <button
                      className="cart-action-link"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-subtotal-bottom">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <aside className="cart-subtotal-sidebar">
          <div className="free-delivery-badge">
            <CheckCircle2 size={16} color="#067d62" />
            <span>Your order is eligible for FREE Delivery. Select this option at checkout.</span>
          </div>

          <p className="sidebar-subtotal-text">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <strong>${total.toFixed(2)}</strong>
          </p>

          <label className="gift-checkbox-row">
            <input type="checkbox" />
            <span>This order contains a gift</span>
          </label>

          <button
            className="checkout-btn"
            onClick={onProceedToCheckout}
          >
            Proceed to Buy ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </button>

          <div className="sidebar-security">
            <ShieldCheck size={16} />
            <span>Safe and Secure Payments</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
