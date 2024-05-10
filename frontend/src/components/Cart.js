import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css'; // Import the CSS file for styling

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});
  const [maxQuantities, setMaxQuantities] = useState({});
  const [cartTotal, setCartTotal] = useState(0);

  // Function to handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartQuantity(itemId, newQuantity);
    setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
  };

  useEffect(() => {
    const fetchMaxQuantities = async () => {
      const maxQuantitiesData = await Promise.all(
        cartItems.map(async (item) => {
          const response = await fetch(`http://localhost:8091/inventory/maxQuantity/${item.id}`);
          const data = await response.json();
          return { itemId: item.id, maxQuantity: data.maxQuantity };
        })
      );
      const maxQuantitiesMap = maxQuantitiesData.reduce((acc, { itemId, maxQuantity }) => {
        acc[itemId] = maxQuantity;
        return acc;
      }, {});
      setMaxQuantities(maxQuantitiesMap);
    };

    fetchMaxQuantities();
  }, [cartItems]);

  useEffect(() => {
    const quantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {});
    setItemQuantities(quantities);
  }, [cartItems]);

  useEffect(() => {
    const updatedTotal = cartItems.reduce((acc, item) => {
      const quantity = itemQuantities[item.id] || 1;
      return acc + item.price * quantity;
    }, 0);
    setCartTotal(updatedTotal);
  }, [itemQuantities, cartItems]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              Name - {item.itemName} <br />
              Price - {item.price}
              <input
                type="number"
                min="1"
                max={maxQuantities[item.id]} // Dynamically set the maximum quantity
                value={itemQuantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Cart Total: ${cartTotal.toFixed(2)}</p>
      <button onClick={clearCart}>Clear Cart</button>
      <Link to={{ pathname: "/checkout", state: { cartItems, cartTotal } }} className="checkout-btn">
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
