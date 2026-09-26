import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "./CartContext";
import "./Favorites.css";

const FAVORITES_KEY = "reshelf_favorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export default function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites);
  const { addToCart } = useCart();

  useEffect(() => {
    const syncFavorites = () => setFavorites(getFavorites());

    window.addEventListener("storage", syncFavorites);
    window.addEventListener("favoritesUpdated", syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("favoritesUpdated", syncFavorites);
    };
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product._id !== productId,
    );

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isSold = (product) => product.status === "sold";

  return (
    <div className="favorites_page">
      <div className="favorites_header">
        <div>
          <h1>My Favorites</h1>
          <p>Products you have saved for later.</p>
        </div>

        <span className="favorites_count">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites_empty">
          <FaHeart className="favorites_empty_icon" />
          <h2>No favorites yet</h2>
          <p>Save products you like and find them here.</p>
          <Link to="/listings" className="favorites_browse_btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="favorites_grid">
          {favorites.map((product) => (
            <article className="favorite_card" key={product._id}>
              <button
                className="favorite_remove_btn"
                onClick={() => removeFavorite(product._id)}
                aria-label="Remove from favorites"
                title="Remove from favorites"
              >
                <FaTrash />
              </button>

              <Link
                to={`/products/${product._id}`}
                className="favorite_image_link"
              >
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="favorite_no_image">No image</div>
                )}
              </Link>

              <div className="favorite_card_info">
                <Link
                  to={`/products/${product._id}`}
                  className="favorite_product_name"
                >
                  {product.name}
                </Link>

                <p className="favorite_product_condition">
                  {product.condition || "Condition not specified"}
                </p>

                <p className="favorite_product_price">BDT {product.price}</p>

                {isSold(product) ? (
                  <div className="favorite_sold_label">Sold</div>
                ) : (
                  <button
                    className="favorite_cart_btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                )}

                <Link
                  to={`/products/${product._id}`}
                  className="favorite_details_link"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
