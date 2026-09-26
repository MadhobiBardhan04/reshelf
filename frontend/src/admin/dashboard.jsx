import { Routes, Route, useNavigate } from "react-router-dom";
import AdminSidebar from "./sidebar.jsx";
import AdminProducts from "./products.jsx";
import AdminOrders from "./orders.jsx";

import "./dashboard.css";
function DashboardHome() {
  return (
    <div className="admin-content">
      {" "}
      <h1>Dashboard</h1> <p>Welcome to the admin dashboard.</p>{" "}
    </div>
  );
}
function Products() {
  return (
    <div className="admin-content">
      {" "}
      <h1>Products</h1>{" "}
    </div>
  );
}
function Orders() {
  return (
    <div className="admin-content">
      {" "}
      <h1>Orders</h1>{" "}
    </div>
  );
}
function ProductsToReview() {
  return (
    <div className="admin-content">
      {" "}
      <h1>Products to Review</h1>{" "}
    </div>
  );
}
export default function AdminDashboard() {
  const navigate = useNavigate();
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

    navigate("/");
    window.location.reload();
  };
  return (
    <div className="admin-layout">
      {" "}
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="admin-top-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <Routes>
          {" "}
          <Route index element={<DashboardHome />} />{" "}
          <Route path="products" element={<AdminProducts />} />{" "}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="review" element={<ProductsToReview />} />{" "}
        </Routes>{" "}
      </main>{" "}
    </div>
  );
}
