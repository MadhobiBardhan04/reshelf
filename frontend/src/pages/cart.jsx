import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext.jsx";
import "./cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h1>Your cart is empty</h1>
        <button className="btn_primary" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart_list">
        {cartItems.map((item) => (
          <div className="cart_item" key={item.id}>
            <img src={item.images[0]} alt={item.name} />
            <div className="cart_item_info">
              <h4>{item.name}</h4>
              <p>BDT {item.price}</p>
            </div>
            <button
              className="cart_remove_btn"
              onClick={() => removeFromCart(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
