import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./sidebar.jsx";
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
  return (
    <div className="admin-layout">
      {" "}
      <AdminSidebar />{" "}
      <main className="admin-main">
        {" "}
        <Routes>
          {" "}
          <Route index element={<DashboardHome />} />{" "}
          <Route path="products" element={<Products />} />{" "}
          <Route path="orders" element={<Orders />} />{" "}
          <Route path="review" element={<ProductsToReview />} />{" "}
        </Routes>{" "}
      </main>{" "}
    </div>
  );
}
