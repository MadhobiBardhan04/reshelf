import "./homepage.css";
import { FaSearch } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function HomePage() {
  return (
    <div className="homepage">
      <div className="navbar">
        <h2> reshalf </h2>
      </div>
      <div className="search_box">
        <div className="SearchBar_header1">
          <FaSearch className="Search_icon_0" />
          <input type="text" placeholder="search for items" />
        </div>
        <button className="sell_btn">
          <FaTag className="Tag_icon" />
        </button>

        <button className="sign_in_btn">sign in</button>

        <button className="profile_btn">
          <FaUser className="profile_icon" />
        </button>

        <button className="cart_btn">
          <FaShoppingCart className="cart_icon" />
        </button>
      </div>
      <div className="header">
        <h1 font-size="large" color="black">
          Buy & Sell Student Essentials
        </h1>
        <h2 font-size="large" color="black">
          Trusted student marketplace — books, gadgets, stationery, study
          essentials & more
        </h2>
        <div className="SearchBar_header">
          <FaSearch className="Search_icon" />
          <input type="text" placeholder="search for items" />
          <button className="Button_header">
            <h3>Search</h3>
          </button>
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
          <h4>Browse Listings</h4>
          <h4>Sell an Item</h4>
          <h4>Categories</h4>
          <h4>Featured Items</h4>
          <h4>Recently Added</h4>
        </div>
        <div className="third_column">
          <h3> Catagories </h3>
          <h4>Books</h4>
          <h4>Gadgets</h4>
          <h4>Electronics</h4>
          <h4>Study Materials</h4>
          <h4>Stationery</h4>
        </div>
        <div className="fourth_column">
          <h3> Resources </h3>
          <h4>Student Discounts</h4>
          <h4>Buying Guide</h4>
          <h4>Selling Guide</h4>
        </div>
        <div className="fifth_column">
          <h3> Account </h3>
          <h4>Sign In</h4>
          <h4>Sign Up</h4>
          <h4>My Profile</h4>
          <h4>My Listings</h4>
          <h4>My Favorites</h4>
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
