import { useEffect, useState } from "react";
import "./orders.css";

const API_URL = "http://localhost:4000";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        credentials: "include",
      });

      const data = await response.json();
      console.log("MY ORDERS RESPONSE:", data);

      if (!response.ok) {
        console.error(data);
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("STATUS UPDATE RESPONSE:", data);
        console.log("ORDER ID:", orderId);
        console.log("NEW STATUS:", status);

        alert(data.message || "Failed to update order.");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order,
        ),
      );
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-content">
        <h1>Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Manage customer orders.</p>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                </td>

                <td>
                  <div>
                    {order.buyer?.displayName ||
                      order.buyer?.username ||
                      "Unknown"}
                  </div>
                  <small>{order.buyer?.email}</small>
                </td>

                {/* Products */}
                <td>
                  <details className="order-products-dropdown">
                    <summary>
                      {order.items?.length || 0} product
                      {order.items?.length !== 1 ? "s" : ""}
                    </summary>

                    <div className="order-products-list">
                      {order.items?.map((item, index) => (
                        <button
                          className="order-product-name-button"
                          key={index}
                          onClick={() => setSelectedProduct(item)}
                        >
                          {item.product?.name || "Product unavailable"}
                        </button>
                      ))}
                    </div>
                  </details>
                </td>

                <td>BDT {order.total?.toLocaleString()}</td>

                <td>
                  {order.deliveryLocation === "inside"
                    ? "Inside Dhaka"
                    : "Outside Dhaka"}
                </td>

                {/* Address */}
                <td>
                  <details className="order-address-dropdown">
                    <summary>View address</summary>

                    <div className="order-address">
                      <p>
                        <strong>City:</strong> {order.address?.city || "-"}
                      </p>

                      <p>
                        <strong>Road:</strong> {order.address?.road || "-"}
                      </p>

                      <p>
                        <strong>House:</strong> {order.address?.house || "-"}
                      </p>

                      {order.address?.note && (
                        <p>
                          <strong>Note:</strong> {order.address.note}
                        </p>
                      )}
                    </div>
                  </details>
                </td>

                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`order-status ${order.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedProduct && (
          <div
            className="product-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="product-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>

              <h2>{selectedProduct.product?.name || "Product"}</h2>

              <div className="product-modal-content">
                <img
                  src={selectedProduct.product?.image}
                  alt={selectedProduct.product?.name}
                  className="product-modal-image"
                />

                <div className="product-modal-info">
                  <div className="product-detail-row">
                    <span>Price</span>
                    <strong>
                      BDT{" "}
                      {selectedProduct.priceAtPurchase?.toLocaleString() || "-"}
                    </strong>
                  </div>

                  <div className="product-detail-row">
                    <span>Category</span>
                    <strong>{selectedProduct.product?.category || "-"}</strong>
                  </div>

                  <div className="product-detail-row">
                    <span>Condition</span>
                    <strong>{selectedProduct.product?.condition || "-"}</strong>
                  </div>

                  <div className="product-detail-section">
                    <h3>Seller</h3>

                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedProduct.seller?.displayName ||
                        selectedProduct.seller?.username ||
                        "-"}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedProduct.seller?.email || "-"}
                    </p>
                  </div>

                  <div className="product-detail-section">
                    <h3>Pickup Address</h3>

                    <p>
                      <strong>City:</strong>{" "}
                      {selectedProduct.sellerAddress?.city || "-"}
                    </p>

                    <p>
                      <strong>Road:</strong>{" "}
                      {selectedProduct.sellerAddress?.road || "-"}
                    </p>

                    <p>
                      <strong>House:</strong>{" "}
                      {selectedProduct.sellerAddress?.house || "-"}
                    </p>

                    <p>
                      <strong>Note:</strong>{" "}
                      {selectedProduct.sellerAddress?.note || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {orders.length === 0 && <div className="no-orders">No orders yet.</div>}
    </div>
  );
}
