import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddInventory from './components/AddInventory';
import AllInventory from './components/AllInventory';
import UpdateInventory from './components/UpdateInventory'; // Import UpdateInventory component
import Home from './components/Home';
import Parts from './components/Parts';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import Checkout component
import { CartProvider } from './components/CartContext'; // Import CartProvider

import './App.css';

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap your App component with CartProvider */}
        <div>
          <Header />
          <Routes>
            <Route path="/add" element={<AddInventory />} />
            <Route path="/list" element={<AllInventory />} />
            <Route path="/update" element={<UpdateInventory />} /> {/* Define route for UpdateInventory with dynamic ID */}
            <Route path="/home" element={<Home />} />
            <Route path="/parts" element={<Parts />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Add this route for the Checkout page */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
