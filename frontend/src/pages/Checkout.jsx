import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import { groupSeller } from "../utils/groupSeller.js";

import "./checkout.css";

const DELIVERY_INSIDE = 80;
const DELIVERY_OUTSIDE = 120;

export default function Checkout() {
  const navigate = useNavigate();
  const { checkedItems, clearCart, refreshCart } = useCart();
  const [location, setLocation] = useState("inside");
  const [city, setCity] = useState("");
  const [road, setRoad] = useState("");
  const [house, setHouse] = useState("");
  const [note, setNote] = useState("");

  if (checkedItems.length === 0) {
    return (
      <div className="checkout_page">
        <h2>No items selected for checkout</h2>
        <button className="btn_primary" onClick={() => navigate("/cart")}>
          Back to Cart
        </button>
      </div>
    );
  }

  const sellerGroups = groupSeller(checkedItems);
  const deliveryPerSeller =
    location === "inside" ? DELIVERY_INSIDE : DELIVERY_OUTSIDE;
  const totalDelivery = sellerGroups.length * deliveryPerSeller;
  const subtotal = checkedItems.reduce(
    (sum, item) => sum + item.product.price,
    0,
  );
  const total = subtotal + totalDelivery;

  const handlePlaceOrder = async () => {
    if (!city || !road || !house) {
      alert("Please fill in your address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          items: checkedItems.map(({ product }) => product._id),

          deliveryLocation: location,

          address: {
            city,
            road,
            house,
            note,
          },
        }),
      });

      const data = await response.json();

      console.log("Order created:", data.order);

      alert("Order placed successfully!");
      refreshCart();
      navigate("/orders");
    } catch (error) {
      console.error("Place order error:", error);

      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="checkout_page">
      <h1>Checkout</h1>

      <div className="checkout_section">
        <p className="checkout_label">Delivery Location</p>
        <div className="location_toggle">
          <button
            className={location === "inside" ? "active" : ""}
            onClick={() => setLocation("inside")}
          >
            Inside Dhaka
          </button>
          <button
            className={location === "outside" ? "active" : ""}
            onClick={() => setLocation("outside")}
          >
            Outside Dhaka
          </button>
        </div>
      </div>

      <div className="checkout_section">
        <p className="checkout_label">Delivery Address</p>
        <div className="address_grid">
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            placeholder="Road"
            value={road}
            onChange={(e) => setRoad(e.target.value)}
          />
          <input
            placeholder="House"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Additional info (landmark, delivery instructions, etc.)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="checkout_section">
        <p className="checkout_label">Order Items</p>
        {sellerGroups.map((group) => (
          <div className="seller_group" key={group.sellerName}>
            <p className="seller_group_name">
              {group.sellerName}
              <span className="seller_delivery_tag">
                Delivery: BDT {deliveryPerSeller}
              </span>
            </p>
            {group.items.map(({ product }) => (
              <div className="checkout_row" key={product._id}>
                <img src={product.image} alt={product.name} />
                <div className="cart_row_info">
                  <h4>{product.name}</h4>
                  <p className="cart_row_category">{product.category}</p>
                </div>
                <p className="cart_row_price">BDT {product.price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="checkout_summary">
        <div className="summary_row">
          <span>Merchandise Subtotal</span>
          <span>BDT {subtotal}</span>
        </div>
        <div className="summary_row">
          <span>
            Delivery Fee ({sellerGroups.length} seller
            {sellerGroups.length > 1 ? "s" : ""})
          </span>
          <span>BDT {totalDelivery}</span>
        </div>
        <div className="summary_row summary_total">
          <span>Total</span>
          <span>BDT {total}</span>
        </div>
      </div>

      <button
        className="btn_primary place_order_btn"
        onClick={handlePlaceOrder}
      >
        Place Order — BDT {total}
      </button>
    </div>
  );
}
