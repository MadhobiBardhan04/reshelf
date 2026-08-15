import { useNavigate } from "react-router-dom";
import "./cart.css";
export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="cart">
      <h1>Your cart is empty</h1>
      <button className="sell_btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}
