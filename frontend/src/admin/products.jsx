import { useEffect, useMemo, useState } from "react";
import "./products.css";

const API_URL = "http://localhost:4000";

const FILTERS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/admin/products`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        return;
      }

      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApproval = async (productId, status, rejectionReason = "") => {
    try {
      setUpdatingId(productId);

      const response = await fetch(
        `${API_URL}/api/admin/products/${productId}/approval`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status, rejectionReason }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update product.");
        return;
      }

      setProducts((current) =>
        current.map((product) =>
          product._id === productId ? data.product : product,
        ),
      );
    } catch (error) {
      console.error("Update approval error:", error);
      alert("Failed to update product.");
    } finally {
      setUpdatingId(null);
    }
  };

  const openRejectModal = (product) => {
    setRejectTarget(product);
    setRejectReason("");
  };

  const confirmReject = async () => {
    if (!rejectTarget) return;
    await updateApproval(rejectTarget._id, "rejected", rejectReason.trim());
    setRejectTarget(null);
    setRejectReason("");
  };

  const counts = useMemo(() => {
    const result = { pending: 0, approved: 0, rejected: 0, all: products.length };

    for (const product of products) {
      const status = product.approvalStatus || "pending";
      if (result[status] !== undefined) result[status] += 1;
    }

    return result;
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;

    return products.filter(
      (product) => (product.approvalStatus || "pending") === filter,
    );
  }, [products, filter]);

  if (loading) {
    return (
      <div className="admin-content">
        <h1>Products</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Products</h1>
        <p>Review seller submissions before they go live on the marketplace.</p>
      </div>

      <div className="products-filter-tabs">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            className={`products-filter-tab ${filter === item.key ? "active" : ""}`}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
            <span className="products-filter-count">{counts[item.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Condition</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Approval</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map((product) => {
              const approvalStatus = product.approvalStatus || "pending";

              return (
                <tr key={product._id}>
                  <td>
                    <div className="product-info">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <div>
                        <div className="product-title">{product.name}</div>
                        <div className="product-subcategory">
                          {product.subcategory}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {product.seller?.displayName ||
                      product.seller?.username ||
                      "Unknown"}
                  </td>

                  <td>৳{product.price?.toLocaleString()}</td>
                  <td>{product.condition}</td>
                  <td>{product.category}</td>
                  <td>{product.availabilityStatus}</td>

                  <td>
                    <span className={`approval-badge ${approvalStatus}`}>
                      {approvalStatus}
                    </span>
                    {approvalStatus === "rejected" && product.rejectionReason && (
                      <div className="rejection-reason">
                        {product.rejectionReason}
                      </div>
                    )}
                  </td>

                  <td>
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <div className="product-approval-actions">
                      <button
                        className="approve-btn"
                        disabled={
                          updatingId === product._id ||
                          approvalStatus === "approved"
                        }
                        onClick={() => updateApproval(product._id, "approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        disabled={
                          updatingId === product._id ||
                          approvalStatus === "rejected"
                        }
                        onClick={() => openRejectModal(product)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visibleProducts.length === 0 && (
          <div className="no-products">No products in this view.</div>
        )}
      </div>

      {rejectTarget && (
        <div
          className="product-modal-overlay"
          onClick={() => setRejectTarget(null)}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="product-modal-close"
              onClick={() => setRejectTarget(null)}
            >
              ×
            </button>

            <h2>Reject "{rejectTarget.name}"</h2>
            <p>Optionally let the seller know why this listing was rejected.</p>

            <textarea
              className="reject-reason-input"
              rows={4}
              placeholder="Reason for rejection (optional)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="reject-modal-actions">
              <button
                className="reject-btn"
                onClick={confirmReject}
                disabled={updatingId === rejectTarget._id}
              >
                Confirm Reject
              </button>

              <button className="cancel-btn" onClick={() => setRejectTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}