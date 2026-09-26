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
  FaTachometerAlt,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
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

  // Check if logged-in user is admin
  const isAdmin = user?.role === "admin";

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:4000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setShowProfile(false);

    clearCart();

    navigate("/");

    window.location.reload();
  };

  // ==========================================
  // CLOSE PROFILE
  // ==========================================

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <nav className="navbar">

      {/* ========================================
          LOGO
      ======================================== */}

      <Link
        to="/"
        className="logo-link"
      >
        ReShelf
      </Link>


      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="SearchBar_header1">

        <FaSearch className="Search_icon_0" />

        <input
          type="text"
          placeholder="search for items"
        />

      </div>


      {/* ========================================
          RIGHT SIDE
      ======================================== */}

      <div className="nav_actions">

        {/* CART */}

        <button
          className="cart_btn"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart />

          {cartItems.length > 0 && (
            <span className="cart_badge">
              {cartItems.length}
            </span>
          )}
        </button>


        {/* SELL */}

        <button
          className="sell_btn"
          onClick={() => navigate("/sell")}
        >
          Sell
        </button>


        {/* ====================================
            LOGGED IN
        ==================================== */}

        {isLoggedIn ? (

          <div className="profile_container">

            {/* PROFILE BUTTON */}

            <button
              className={`profile_btn ${
                showProfile
                  ? "profile_btn_active"
                  : ""
              }`}
              onClick={() =>
                setShowProfile(!showProfile)
              }
            >
              <FaUser />
            </button>


            {/* =================================
                PROFILE DROPDOWN
            ================================= */}

            {showProfile && (

              <div
  className={`profile_dropdown ${
    isAdmin ? "admin_profile_dropdown" : ""
  }`}
>


                {/* =================================
                    USER HEADER
                ================================= */}

                <div className="profile_dropdown_header">

                  <div className="profile_dropdown_avatar">
                    <FaUser />
                  </div>


                  <div className="profile_dropdown_user">

                    <h3>
                      {isAdmin
                        ? "ReShelf Admin"
                        : user?.displayName ||
                          user?.username ||
                          "User"}
                    </h3>

                    <p>
                      {user?.email ||
                        "No email available"}
                    </p>

                  </div>

                </div>


                {/* =================================
                    ADMIN MENU
                ================================= */}

                {isAdmin ? (

                  <div className="profile_dropdown_menu">

                    {/* DASHBOARD */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/admin");
                      }}
                    >
                      <FaTachometerAlt />

                      <span>
                        Dashboard
                      </span>
                    </button>


                    {/* PRODUCTS */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate(
                          "/admin/products"
                        );
                      }}
                    >
                      <FaBoxOpen />

                      <span>
                        Products
                      </span>
                    </button>


                    {/* ORDERS */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate(
                          "/admin/orders"
                        );
                      }}
                    >
                      <FaShoppingCart />

                      <span>
                        Orders
                      </span>
                    </button>


                    {/* PRODUCTS TO REVIEW */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate(
                          "/admin/review"
                        );
                      }}
                    >
                      <FaCheckCircle />

                      <span>
                        Products to Review
                      </span>
                    </button>

                  </div>

                ) : (

                  /* =================================
                     NORMAL USER MENU
                  ================================= */

                  <div className="profile_dropdown_menu">

                    {/* MY PROFILE */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/profile");
                      }}
                    >
                      <FaUser />

                      <span>
                        My Profile
                      </span>
                    </button>


                    {/* MY LISTINGS */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/listings");
                      }}
                    >
                      <FaBoxOpen />

                      <span>
                        My Listings
                      </span>

                      <small>
                        4
                      </small>
                    </button>


                    {/* FAVORITES */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/Favorites");
                      }}
                    >
                      <FaHeart />

                      <span>
                        Favorites
                      </span>

                      <small>
                        0
                      </small>
                    </button>


                    {/* ORDERS */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/orders");
                      }}
                    >
                      <FaShoppingCart />

                      <span>
                        Orders
                      </span>

                      <small>
                        0
                      </small>
                    </button>


                    {/* SETTINGS */}

                    <button
                      onClick={() => {
                        closeProfile();

                        navigate("/settings");
                      }}
                    >
                      <FaCog />

                      <span>
                        Settings
                      </span>
                    </button>

                  </div>

                )}


                <div className="profile_dropdown_logout">

                  <button
                    onClick={handleLogout}
                  >
                    <FiLogOut />

                    <span>
                      Logout
                    </span>
                  </button>

                </div>

              </div>

            )}

          </div>

        ) : (


          <Link
            to="/auth"
            className="sign_in_btn"
          >
            Sign in
          </Link>

        )}

      </div>

    </nav>
  );
}