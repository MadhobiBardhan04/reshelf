import "./homepage.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { getProducts } from "./data/products.js";

function HomePage() {
  const products = getProducts();
  const categories = [
    { icon: "📚", name: "Books & Textbooks", path: "books" },
    { icon: "💻", name: "Laptops & Computers", path: "laptops" },
    { icon: "📱", name: "Phones & Tablets", path: "phones" },
    { icon: "🧮", name: "Calculators", path: "calculators" },
    { icon: "✏️", name: "Stationery", path: "stationery" },
    { icon: "🔧", name: "Lab & Engineering Tools", path: "lab-tools" },
    { icon: "🪑", name: "Furniture", path: "furniture" },
    { icon: "🎧", name: "Gadgets & Accessories", path: "gadgets" },
  ];
  return (
    <div className="homepage">
      <div className="header">
        <h1 font-size="large" color="white">
          Buy & Sell Student Essentials
        </h1>
        <h2 font-size="large" color="black">
          Trusted student marketplace — books, gadgets, stationery, study
          essentials & more
        </h2>
        <div className="SearchBar_header">
          <FaSearch className="Search_icon" />
          <input type="text" placeholder="What are you looking for?" />
          <button className="Button_header">
            <h3>Search</h3>
          </button>
        </div>
      </div>
      <div className="browse_categories">
        <h2>Browse Categories</h2>
        <div className="categories_grid">
          {categories.map((category) => (
            <Link
              to={`/category/${category.path}`}
              className="category_card"
              key={category.path}
            >
              <div className="category_icon">{category.icon}</div>

              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="featured_products">
        <div className="featured_header">
          <h2>Featured Listings</h2>

          <Link to="/listings" className="view_all">
            View All →
          </Link>
        </div>

        <div className="product_grid">
          {products.slice(0, 8).map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="product_card"
              key={product.id}
            >
              <img src={product.images[0]} alt={product.name} />
              <h4>{product.name}</h4>
              <p>BDT {product.price}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="first_column">
          <h3> ReShelf </h3>
          <h4>Connecting students to</h4>
          <h4>buy and sell quality</h4>
          <h4>pre-owned items at</h4>
          <h4>affordable prices.</h4>
          <div className="download_logo">
            <FaDownload className="download_icon" />
            <h5>Download logo</h5>
          </div>
        </div>
        <div className="second_column">
          <h3> Market Place </h3>
          <Link to="/listings">
            <h4>Browse Listings</h4>
          </Link>
          <Link to="/sell">
            <h4>Sell an Item</h4>
          </Link>
          <Link to="/listings">
            <h4>Categories</h4>
          </Link>
          <Link to="/products/1">
            <h4>Featured Items</h4>
          </Link>
          <h4>Recently Added</h4>
        </div>
        <div className="third_column">
          <h3> Catagories </h3>
          <Link to="/category/books">
            <h4>Books</h4>
          </Link>
          <Link to="/category/laptops">
            <h4>Gadgets</h4>
          </Link>
          <Link to="/category/phones">
            <h4>Electronics</h4>
          </Link>
          <Link to="/category/lab-tools">
            <h4>Study Materials</h4>
          </Link>
          <Link to="/category/stationery">
            <h4>Stationery</h4>
          </Link>
        </div>
        <div className="fourth_column">
          <h3> Resources </h3>
          <Link to="/student-discounts">
            <h4>Student Discounts</h4>
          </Link>
          <Link to="/buying-guide">
            <h4>Buying Guide</h4>
          </Link>
          <Link to="/selling-guide">
            <h4>Selling Guide</h4>
          </Link>
        </div>
        <div className="fifth_column">
          <h3> Account </h3>
          <Link to="/auth">
            <h4>Sign In</h4>
          </Link>
          <Link to="/auth">
            <h4>Sign Up</h4>
          </Link>
          <Link to="/profile">
            <h4>My Profile</h4>
          </Link>
          <Link to="/Favorites">
            <h4> Favorites </h4>
          </Link>
          <h4>My Listings</h4>
        </div>
        <div className="sixth_column">
          <h3> Trust & Support </h3>
          <h4>Trust & Safety</h4>
          <h4>Help Center</h4>
          <h4>Contact Us</h4>
          <h4>Report a Problem</h4>
          <h4>Feedback</h4>
        </div>

        <div className="Additional_things">
          <hr />
          <h4>@ 2026 ReShelf. All rights reserved.</h4>
          <h4>
            An independent online marketplace built for students across
            Bangladesh. Connecting students
          </h4>
          <h4>
            through a trusted platform for buying and selling everyday
            essentials.
          </h4>
          <h4>
            <FaYoutube className="YouTube_icon" />
            <span> YouTube </span>
          </h4>
          <h4>
            <FaGlobe className="Globe_icon" /> commiunity
          </h4>
          <h4>
            <FaFacebook className="Facebook_icon" /> Facebook
          </h4>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
