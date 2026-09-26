import { NavLink, Link } from "react-router-dom";

import "./sidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-top">

        {/* CLICKABLE RESHELF LOGO */}
        <Link to="/" className="admin-logo">
          ReShelf
        </Link>

        <nav className="admin-nav">

          {/* DASHBOARD */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Dashboard
          </NavLink>

          {/* PRODUCTS */}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Products
          </NavLink>

          {/* ORDERS */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Orders
          </NavLink>

          {/* PRODUCTS TO REVIEW */}
          <NavLink
            to="/admin/review"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Products to Review
          </NavLink>

        </nav>

      </div>

    </aside>
  );
}