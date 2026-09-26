import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext.jsx";

import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaHeart,
  FaCog,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const [showProfile, setShowProfile] = useState(false);

  const storedUser = localStorage.getItem("user");

  const { clearCart, cartItems } = useCart();

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data:", error);

    user = null;
  }

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowProfile(false);
    clearCart();
    navigate("/");
    window.location.reload();
  };

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
        <button className="cart_btn" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="cart_badge">{cartItems.length}</span>
          )}
        </button>
        <button className="sell_btn" onClick={() => navigate("/sell")}>
          Sell
        </button>
        {isLoggedIn ? (
          <div className="profile_container">
            <button
              className={`profile_btn ${
                showProfile ? "profile_btn_active" : ""
              }`}
              onClick={() => setShowProfile(!showProfile)}
            >
              <FaUser />
            </button>
            {showProfile && (
              <div className="profile_dropdown">
                <div className="profile_dropdown_header">
                  <div className="profile_dropdown_avatar">
                    <FaUser />
                  </div>

                  <div className="profile_dropdown_user">
                    <h3>{user?.displayName || user?.username || "User"}</h3>

                    <p>{user?.email || "No email available"}</p>
                  </div>
                </div>
                <div className="profile_dropdown_menu">
                  <button
                    onClick={() => {
                      setShowProfile(false);

                      navigate("/profile");
                    }}
                  >
                    <FaUser />

                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);

                      navigate("/listings");
                    }}
                  >
                    <FaBoxOpen />

                    <span>My Listings</span>

                    <small>4</small>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);

                      navigate("/Favorites");
                    }}
                  >
                    <FaHeart />

                    <span>Favorites</span>

                    <small>0</small>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);

                      navigate("/orders");
                    }}
                  >
                    <FaShoppingCart />

                    <span>Orders</span>

                    <small>0</small>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);

                      navigate("/settings");
                    }}
                  >
                    <FaCog />

                    <span>Settings</span>
                  </button>
                </div>
                <div className="profile_dropdown_logout">
                  <button onClick={handleLogout}>
                    <FiLogOut />

                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="sign_in_btn">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
