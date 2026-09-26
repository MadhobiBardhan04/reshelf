import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminSidebar from "./sidebar.jsx";
import AdminProducts from "./products.jsx";
import AdminOrders from "./orders.jsx";

import "./dashboard.css";


// =====================================================
// DASHBOARD HOME
// =====================================================

function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    orderStatistics: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";


  // =====================================================
  // FETCH DASHBOARD STATISTICS
  // =====================================================

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/admin/stats`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch dashboard statistics"
          );
        }

        setStats({
          totalUsers: data.totalUsers || 0,
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
          orderStatistics: data.orderStatistics || [],
        });

      } catch (error) {
        console.error("Dashboard statistics error:", error);

        setError(
          error.message ||
            "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [API_URL]);


  // =====================================================
  // FIND MAXIMUM GRAPH VALUE
  // =====================================================

  const maxOrders =
    stats.orderStatistics.length > 0
      ? Math.max(
          ...stats.orderStatistics.map(
            (item) => item.orders
          )
        )
      : 0;


  return (
    <div className="admin-content">

      {/* PAGE HEADING */}

      <div className="dashboard-heading">
        <h1>Dashboard</h1>

        <p>
          Welcome to the admin dashboard.
        </p>
      </div>


      {/* ERROR */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      {/* STAT CARDS */}

      <div className="dashboard-stats-grid">

        {/* USERS */}

        <div className="dashboard-stat-card">
          <div className="stat-card-title">
            Total Users
          </div>

          <div className="stat-card-number">
            {loading ? "..." : stats.totalUsers}
          </div>

          <div className="stat-card-description">
            Registered users
          </div>
        </div>


        {/* PRODUCTS */}

        <div className="dashboard-stat-card">
          <div className="stat-card-title">
            Total Products
          </div>

          <div className="stat-card-number">
            {loading ? "..." : stats.totalProducts}
          </div>

          <div className="stat-card-description">
            Products listed
          </div>
        </div>


        {/* ORDERS */}

        <div className="dashboard-stat-card">
          <div className="stat-card-title">
            Total Orders
          </div>

          <div className="stat-card-number">
            {loading ? "..." : stats.totalOrders}
          </div>

          <div className="stat-card-description">
            Orders received
          </div>
        </div>

      </div>


      {/* GRAPH */}

      <div className="dashboard-chart-card">

        <div className="chart-header">
          <div>
            <h2>Order Statistics</h2>

            <p>
              Number of orders over time
            </p>
          </div>
        </div>


        {loading ? (

          <div className="chart-message">
            Loading statistics...
          </div>

        ) : stats.orderStatistics.length === 0 ? (

          <div className="chart-message">
            No order statistics available yet.
          </div>

        ) : (

          <div className="bar-chart">

            {stats.orderStatistics.map(
              (item, index) => {

                const height =
                  maxOrders > 0
                    ? (item.orders / maxOrders) * 100
                    : 0;

                return (
                  <div
                    className="chart-column"
                    key={`${item.year}-${item.month}-${index}`}
                  >

                    <div className="chart-value">
                      {item.orders}
                    </div>

                    <div className="chart-bar-container">

                      <div
                        className="chart-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <div className="chart-label">
                      {item.month}
                    </div>

                    <div className="chart-year">
                      {item.year}
                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}


// =====================================================
// PRODUCTS TO REVIEW
// =====================================================

function ProductsToReview() {
  return (
    <div className="admin-content">

      <h1>Products to Review</h1>

      <p>
        Products waiting for admin review.
      </p>

    </div>
  );
}


// =====================================================
// MAIN ADMIN DASHBOARD
// =====================================================

export default function AdminDashboard() {

  const navigate = useNavigate();


  // =====================================================
  // LOGOUT
  // =====================================================

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

    navigate("/auth", {
      replace: true,
    });
  };


  return (
    <div className="admin-layout">

      {/* LEFT SIDEBAR */}

      <AdminSidebar />


      {/* RIGHT SIDE */}

      <main className="admin-main">

        {/* TOP BAR */}

        <div className="admin-topbar">

          <button
            className="admin-top-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>

        </div>


        {/* ADMIN PAGES */}

        <Routes>

          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="review"
            element={<ProductsToReview />}
          />

        </Routes>

      </main>

    </div>
  );
}