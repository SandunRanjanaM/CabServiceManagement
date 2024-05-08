import './App.css';
import AdCreate from './components/AdCreate';
import AdminStatistic from './components/AdminStatistic';
import AdPayment from './components/AdPayment';
import Header from './components/Header';
import AllAds from './components/AllAds';
import PayApprove from './components/PayApprove';
import ManageAds from './components/ManageAds';
import UpdateAd from './components/UpdateAd';
import DeleteAd from './components/DeleteAd';
import ManagerDelete from './components/ManagerDelete';
import ManagerUpdate from './components/ManagerUpdate';
import HomePage from './components/HomePage';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Update from "./components/update";
import ManageUsers from "./components/manageusers";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Aboutus from "./components/Aboutus";
import RealHome from "./components/realhome.js";

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/add" element={<AdCreate/>} />
              <Route path="/statistic" element={<AdminStatistic/>} />
              <Route path="/pay/:id" element={<AdPayment/>} />
              <Route path="/manage" element={<ManageAds/>} />
              <Route path="/delete/:id" element={<DeleteAd/>} />
              <Route path="/update/:id" element={<UpdateAd/>} />
              <Route path="/mdelete/:id" element={<ManagerDelete/>} />
              <Route path="/mupdate/:id" element={<ManagerUpdate/>} />
              <Route path="/get" element={<PayApprove/>} />
              <Route path="/random" element={<HomePage/>} />
              <Route path="/" element={<AllAds/>} />
              <Route path="/addcus" element={<AddCustomer />} />
              <Route path="/home" element={<Home />} />
              <Route path="/getcus/:id" element={<UserProfile />} />
              <Route path="/updatecus/:id" element={<Update />} />
              <Route path="/manageusers" element={<ManageUsers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Navbar" element={<Navbar />} />
              <Route path="/Aboutus" element={<Aboutus />} />
              <Route path="/RealHome" element={<RealHome />} />

          </Routes>
        </div>
        </Router>
  );
}

export default App;
