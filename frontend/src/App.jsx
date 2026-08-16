import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import Auth from "./pages/auth.jsx";
import Cart from "./pages/cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Sell from "./pages/sell.jsx";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/Categorypage.jsx";
import AllListings from "./pages/AllListings";
import StudentDiscount from "./pages/StudentDiscount.jsx";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites.jsx";
import BuyingGuide from "./pages/BuyingGuide.jsx";
import SellingGuide from "./pages/SellingGuide.jsx";

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
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/student-discounts" element={<StudentDiscount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/buying-guide" element={<BuyingGuide />} />
        <Route path="/selling-guide" element={<SellingGuide />} />
      </Routes>
    </div>
  );
}

export default App;
