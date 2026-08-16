import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="favorites_page">
      <div className="favorites_empty">
        <div className="favorites_heart">
          <FaHeart />
        </div>
        <h1>No favorites yet</h1>
        <p>
          Save items you're interested in
          <br />
          and they'll appear here.
        </p>
        <button
          className="browse_items_btn"
          onClick={() => navigate("/")}
        >
          Browse Items
        </button>
      </div>
    </div>
  );
}