import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Auth from "./pages/auth.jsx";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Sell from "./pages/sell.jsx";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
