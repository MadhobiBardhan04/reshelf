import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./homepage";
import Auth from "./pages/auth.jsx";
import Cart from "./pages/cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Navbar from "./components/Navbar.jsx";
import Sell from "./pages/sell.jsx";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/Categorypage.jsx";
import AllListings from "./pages/AllListings";
import StudentDiscount from "./pages/StudentDiscount.jsx";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites.jsx";
import BuyingGuide from "./pages/BuyingGuide.jsx";
import SellingGuide from "./pages/SellingGuide.jsx";
import TrustSafety from "./pages/TrustSafety";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import ReportProblem from "./pages/ReportProblem";
import Feedback from "./pages/Feedback";
import RequireAdmin from "./components/requireAdmin.jsx";
import AdminDashboard from "./admin/dashboard.jsx";
import EditProduct from "./pages/EditProduct";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/student-discounts" element={<StudentDiscount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/buying-guide" element={<BuyingGuide />} />
        <Route path="/selling-guide" element={<SellingGuide />} />
        <Route path="/trust-safety" element={<TrustSafety />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/report-problem" element={<ReportProblem />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/seller/edit/:id" element={<EditProduct />} />

        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              {" "}
              <AdminDashboard />{" "}
            </RequireAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
