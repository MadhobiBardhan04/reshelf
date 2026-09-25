import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
export default function AdminSidebar() {
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
      <button className="admin-logout" onClick={handleLogout}>
        {" "}
        Log Out{" "}
      </button>{" "}
    </aside>
  );
}
