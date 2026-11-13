import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useGlobalState } from '../context/StateContext';
import './Toast.css';

export default function Toast({ onNavigateToCart }) {
  const { state, dispatch } = useGlobalState();
  const { toast } = state;

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST' });
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toast.product?.image && (
        <img src={toast.product.image} alt={toast.product.title} className="toast-img" />
      )}
      <div className="toast-content">
        <div className="toast-header">
          <CheckCircle2 size={18} color="#067d62" />
          <span>{toast.message}</span>
        </div>
        {toast.product?.title && (
          <p className="toast-title">{toast.product.title}</p>
        )}
      </div>
      <button 
        className="toast-action-btn" 
        onClick={() => {
          dispatch({ type: 'CLEAR_TOAST' });
          if (onNavigateToCart) onNavigateToCart();
        }}
      >
        View Cart
      </button>
      <button 
        className="toast-close-btn" 
        onClick={() => dispatch({ type: 'CLEAR_TOAST' })}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
