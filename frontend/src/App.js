// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile"; // Import UserProfile component
import Update from "./components/update";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/" element={<Home />} />
        <Route path="/get/:id" element={<UserProfile />} />
        <Route path="/update/:id" element={<Update />} />
      
      </Routes>
    </Router>
  );
}

export default App;
