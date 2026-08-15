import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const [showProfile, setShowProfile] = useState(false);

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
        {isLoggedIn ? (
          <div className="profile_container">
            <button
              className="profile_btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              <FaUser />
            </button>
            {showProfile && (
              <div className="profile_dropdown">
                <h3>My Account</h3>

                <p>My Profile</p>
                <p>My Listings</p>
                <p>My Favorites</p>
                <p>Settings</p>

                <hr />

                <p
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    setShowProfile(false);
                    navigate("/");
                  }}
                >
                  Logout
                </p>
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
