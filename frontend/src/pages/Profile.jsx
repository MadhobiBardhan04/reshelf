import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaEdit,
  FaBoxOpen,
  FaHeart,
} from "react-icons/fa";

import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const FAVORITES_KEY = "reshelf_favorites";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const [profile, setProfile] = useState({
    name: user?.displayName || user?.username || "Your Name",
    email: user?.email || "student@email.com",
    phone: user?.phone || "+880 1XXXXXXXXX",
    university: user?.university || "Your University",
  });

  // Load user's products
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductsError("");

        const response = await fetch(
          `${API_URL}/api/products/seller/my-products`,
          {
            credentials: "include",
          },
        );

        const data = await response.json().catch(() => []);

        if (!response.ok) {
          throw new Error(data.message || "Could not load your listings");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setProductsError(error.message || "Something went wrong");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchMyProducts();
  }, []);

  // Update Favorites count
  useEffect(() => {
    const updateFavoriteCount = () => {
      try {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

        setFavoriteCount(favorites.length);
      } catch {
        setFavoriteCount(0);
      }
    };

    updateFavoriteCount();

    window.addEventListener("favoritesUpdated", updateFavoriteCount);

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavoriteCount);
    };
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      displayName: profile.name,
      username: profile.name,
      email: profile.email,
      phone: profile.phone,
      university: profile.university,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const availableCount = products.filter(
    (product) => product.status === "available",
  ).length;

  const soldCount = products.filter(
    (product) => product.status === "sold",
  ).length;

  return (
    <div className="profile_page">
      <div className="profile_page_header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <button
          className="edit_profile_btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="profile_main_card">
        <div className="profile_avatar_large">
          <FaUser />
        </div>

        <div className="profile_main_info">
          <h2>{profile.name}</h2>
          <p>
            <FaEnvelope />
            {profile.email}
          </p>
        </div>
      </div>

      <div className="profile_section">
        <h2>Account Information</h2>

        <div className="profile_information_card">
          <div className="profile_field">
            <div className="profile_field_icon">
              <FaUser />
            </div>

            <div className="profile_field_content">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
          </div>

          <div className="profile_field">
            <div className="profile_field_icon">
              <FaEnvelope />
            </div>

            <div className="profile_field_content">
              <label>Email</label>
              <p>{profile.email}</p>
            </div>
          </div>

          <div className="profile_field">
            <div className="profile_field_icon">
              <FaPhone />
            </div>

            <div className="profile_field_content">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>
          </div>

          <div className="profile_field">
            <div className="profile_field_icon">
              <FaUniversity />
            </div>

            <div className="profile_field_content">
              <label>University</label>
              {isEditing ? (
                <input
                  type="text"
                  name="university"
                  value={profile.university}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.university}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile_section">
        <h2>My Activity</h2>

        <div className="profile_activity_grid">
          <Link to="/profile" className="activity_card">
            <div className="activity_icon">
              <FaBoxOpen />
            </div>

            <div>
              <h3>{products.length}</h3>
              <p>My Listings</p>
            </div>
          </Link>

          <Link to="/favorites" className="activity_card">
            <div className="activity_icon">
              <FaHeart />
            </div>

            <div>
              <h3>{favoriteCount}</h3>
              <p>Favorites</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="profile_section">
        <div className="my_listings_header">
          <div>
            <h2>My Listings</h2>
            <p className="my_listings_subtitle">
              Products you have listed on ReShelf
            </p>
          </div>

          <Link to="/sell" className="add_listing_btn">
            + Sell an Item
          </Link>
        </div>

        <div className="listing_summary">
          <span>Available: {availableCount}</span>
          <span>Sold: {soldCount}</span>
        </div>

        {loadingProducts ? (
          <p className="listing_message">Loading your listings...</p>
        ) : productsError ? (
          <p className="listing_message listing_error">{productsError}</p>
        ) : products.length === 0 ? (
          <div className="empty_listings">
            <FaBoxOpen />
            <h3>You haven't listed any products yet.</h3>
            <p>Start selling your student essentials on ReShelf.</p>
            <Link to="/sell">Start Selling</Link>
          </div>
        ) : (
          <div className="my_listings_grid">
            {products.map((product) => (
              <div className="my_listing_card" key={product._id}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="my_listing_image"
                  />
                ) : (
                  <div className="my_listing_image">No image</div>
                )}

                <div className="my_listing_info">
                  <span
                    className={`my_listing_status ${
                      product.status === "sold" ? "sold" : "available"
                    }`}
                  >
                    {product.status || "available"}
                  </span>

                  <h3>{product.name}</h3>
                  <p className="my_listing_price">৳{product.price}</p>
                  <p>{product.category}</p>
                  <p>{product.condition}</p>

                  {product.status !== "sold" && (
                    <Link
                      to={`/seller/edit/${product._id}`}
                      className="my_listing_edit_btn"
                    >
                      <FaEdit />
                      Edit Product
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="profile_save_container">
          <button className="save_profile_btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
