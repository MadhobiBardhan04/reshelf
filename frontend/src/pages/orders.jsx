import { useEffect, useState } from "react";
import "./orders.css";
import "./sell.css";

const API_URL = "http://localhost:4000";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/my`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError("Couldn't fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders_page">
        <h1>My Orders</h1>
        <p className="orders_message">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders_page">
        <h1>My Orders</h1>
        <p className="orders_message orders_error">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders_page">
        <h1>My Orders</h1>
        <div className="orders_empty">
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders_page">
      <h1>My Orders</h1>

      <div className="orders_list">
        {orders.map((order) => (
          <div className="user_order_card" key={order._id}>
            <div className="user_order_header">
              <div>
                <p className="order_number">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>

                <p className="order_date">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <p className="order_total">BDT {order.total?.toLocaleString()}</p>
            </div>

            <div className="user_order_items">
              {order.items?.map((item, index) => {
                const product = item.product;

                return (
                  <div className="user_order_product" key={item._id || index}>
                    <img
                      src={product?.image}
                      alt={product?.name || "Product"}
                    />

                    <div className="user_order_product_info">
                      <h3>{product?.name || "Product unavailable"}</h3>

                      <p>{product?.category || "Category"}</p>
                    </div>

                    <div className="user_order_product_right">
                      <span className="user_order_price">
                        BDT {item.priceAtPurchase?.toLocaleString()}
                      </span>

                      <span className={`user_order_status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
