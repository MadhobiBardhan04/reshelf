import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      {" "}
      <div className="admin-sidebar-top">
        {" "}
        <h2 className="admin-logo">Reshelf</h2>{" "}
        <nav className="admin-nav">
          {" "}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            {" "}
            Dashboard{" "}
          </NavLink>{" "}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            {" "}
            Products{" "}
          </NavLink>{" "}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            {" "}
            Orders{" "}
          </NavLink>{" "}
          <NavLink
            to="/admin/review"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            {" "}
            Products to Review{" "}
          </NavLink>{" "}
        </nav>{" "}
      </div>{" "}
    </aside>
  );
}
