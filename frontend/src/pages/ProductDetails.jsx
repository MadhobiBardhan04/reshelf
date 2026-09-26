import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStore, FaHeart } from "react-icons/fa";

import { useCart } from "./CartContext";
import "./ProductDetails.css";

const FAVORITES_KEY = "reshelf_favorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

const TABS = ["Description", "Specifications"];

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [loading, setLoading] = useState(true);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProduct(null);

    fetch(`http://localhost:4000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product?._id) return;

    const checkFavorite = () => {
      const favorites = getFavorites();

      setIsFavorite(favorites.some((item) => item._id === product._id));
    };

    checkFavorite();

    window.addEventListener("favoritesUpdated", checkFavorite);

    return () => {
      window.removeEventListener("favoritesUpdated", checkFavorite);
    };
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;

    const favorites = getFavorites();
    const alreadySaved = favorites.some((item) => item._id === product._id);

    const updatedFavorites = alreadySaved
      ? favorites.filter((item) => item._id !== product._id)
      : [...favorites, product];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

    setIsFavorite(!alreadySaved);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (loading) {
    return <p className="not_found">Loading product...</p>;
  }

  if (!product) {
    return <p className="not_found">Product not found.</p>;
  }

  const {
    name,
    price,
    category,
    condition,
    specs,
    description,
    image,
    status,
    seller,
  } = product;

  return (
    <div className="product_details">
      <div className="pd_gallery">
        <div className="pd_main_image">
          <span className="pd_image_count">1 / 1</span>

          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="pd_no_image">No image available</div>
          )}
        </div>
      </div>

      <div className="pd_info">
        <h1>{name}</h1>

        <p className="pd_price">BDT {price}</p>

        <div className="pd_attrs">
          <div>
            <span className="pd_attr_label">Condition</span>
            <span className="pd_attr_value">{condition}</span>
          </div>

          <div>
            <span className="pd_attr_label">Category</span>
            <span className="pd_attr_value">{category}</span>
          </div>
        </div>

        <button
          className={`pd_favorite_btn ${isFavorite ? "is_favorite" : ""}`}
          onClick={toggleFavorite}
        >
          <FaHeart />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        {showAddedMessage && <p className="pd_added_msg">Added to cart!</p>}

        {status === "sold" ? (
          <button className="pd_add_btn" disabled>
            Sold Out
          </button>
        ) : (
          <button className="pd_add_btn" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        )}

        <div className="pd_tabs_section">
          <div className="pd_tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`pd_tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pd_tab_content">
            {activeTab === "Specifications" && (
              <p>{specs || "No specifications provided."}</p>
            )}

            {activeTab === "Description" && (
              <p>{description || "No description provided."}</p>
            )}
          </div>
        </div>

        <div className="pd_seller">
          <div className="pd_seller_icon">
            <FaStore />
          </div>

          <div>
            <p>{product.seller?.displayName || "Unknown seller"}</p>
            <p className="pd_seller_sub">Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
}
