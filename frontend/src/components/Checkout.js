import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext'; // Import the CartContext
import './Checkout.css'; // Import CSS file

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext); // Retrieve cartItems from context
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return; // Exit the function early if validation fails
    }

    try {
      const newCheckout = { email, phone, paymentNumber, cartItems, cartTotal };
      await axios.post('http://localhost:8091/checkout/add', newCheckout);
      alert('Checkout successful!');
      clearCart(); // Clear cart after successful checkout
      // Reset form fields after successful checkout
      setEmail('');
      setPhone('');
      setPaymentNumber('');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-items">
        <h3>Items in Cart:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.itemName}</li>
          ))}
        </ul>
      </div>
      <div className="cart-total">
        <p>Cart Total: ${cartTotal.toFixed(2)}</p> {/* Display cart total */}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Payment Number:
          <input type="text" value={paymentNumber} onChange={(e) => setPaymentNumber(e.target.value)} required />
        </label>
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default Checkout;
