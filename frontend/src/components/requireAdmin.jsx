import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
