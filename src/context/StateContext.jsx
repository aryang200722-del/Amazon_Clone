import React, { createContext, useContext, useReducer, useEffect } from 'react';

const StateContext = createContext();

const STORAGE_KEY_CART = 'amazon_clone_cart';
const STORAGE_KEY_USER = 'amazon_clone_user';
const STORAGE_KEY_ORDERS = 'amazon_clone_orders';

const loadInitialCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadInitialUser = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const loadInitialOrders = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: loadInitialCart(),
  user: loadInitialUser(),
  orders: loadInitialOrders(),
  searchQuery: '',
  selectedCategory: 'All',
  toast: null,
};

export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

function stateReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      let updatedCart;

      if (existingIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cart: updatedCart,
        toast: {
          message: 'Added to Cart',
          product: action.payload,
          id: Date.now()
        }
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: updatedCart
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id)
        };
      }
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return {
        ...state,
        cart: updatedCart
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        cart: []
      };
    }

    case 'SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload
      };
    }

    case 'SET_CATEGORY': {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }

    case 'SET_USER': {
      return {
        ...state,
        user: action.payload
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        user: null
      };
    }

    case 'ADD_ORDER': {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: []
      };
    }

    case 'CLEAR_TOAST': {
      return {
        ...state,
        toast: null
      };
    }

    default:
      return state;
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(state.orders));
  }, [state.orders]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
}
