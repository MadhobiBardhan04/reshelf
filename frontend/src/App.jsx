import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Auth from "./pages/auth.jsx";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
