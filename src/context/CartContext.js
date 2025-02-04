import React, { createContext, useReducer,} from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const existItem = state.find((x) => x._id === item._id);
      if (existItem) {
        // If item exists, increase quantity
        newState = state.map((x) =>
          x._id === existItem._id 
            ? { ...x, qty: x.qty + (item.qty || 1) }
            : x
        );
      } else {
        // Add new item with qty
        newState = [...state, { ...item, qty: item.qty || 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;

    case 'UPDATE_QUANTITY':
      newState = state.map((item) =>
        item._id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;

    // ...existing code...
    case 'REMOVE_FROM_CART':
      newState = state.filter((x) => x._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(newState)); // Save to localStorage
      return newState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    // Initialize cart from localStorage
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;