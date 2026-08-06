import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        ReShelf
      </Link>

      <div className="SearchBar_header1">
        <FaSearch className="Search_icon_0" />
        <input type="text" placeholder="search for items" />
      </div>
      <div className="nav_actions">
        <button className="cart_btn" onClick={() => navigate("/checkout")}>
          <FaShoppingCart />
        </button>
        <button className="sell_btn" onClick={() => navigate("/sell")}>
          Sell
        </button>
        <Link to="/auth" className="sign_in_btn">
          Sign in
        </Link>
        {/* this should be here after sign in
        <button className="profile_btn" onClick={() => navigate("/profile")}>
          <FaUser />
        </button>
        */}
      </div>
    </nav>
  );
}
