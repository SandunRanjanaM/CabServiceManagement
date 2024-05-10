import React, { createContext, useState } from 'react';

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
  // Define state for cart items
  const [cartItems, setCartItems] = useState([]);

  // Define functions to manipulate cart items
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    // Find the item in the cart
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        // Ensure the new quantity does not exceed the available quantity
        const availableQuantity = item.availableQuantity || item.quantity; // Assuming availableQuantity is provided in the item or defaulting to quantity
        const updatedQuantity = Math.min(newQuantity, availableQuantity);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  // Provide cart items and functions to children components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
