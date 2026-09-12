import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import { groupSeller } from "../utils/groupSeller.js";
import "./cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, toggleChecked, removeFromCart, toggleAll, checkedItems } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart_empty">
          <h1>Your cart is empty</h1>
          <button className="sell_btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const sellerGroups = groupSeller(cartItems);
  const allChecked = cartItems.every((item) => item.checked);
  const subtotal = checkedItems.reduce(
    (sum, item) => sum + item.product.price,
    0,
  );

  return (
    <div className="cart_page">
      <h1>My Cart</h1>

      {sellerGroups.map((group) => (
        <div className="seller_group" key={group.sellerName}>
          <p className="seller_group_name">{group.sellerName}</p>
          {group.items.map(({ product, checked }) => (
            <div className="cart_row" key={product._id}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleChecked(product._id)}
              />
              <img src={product.image} alt={product.name} />
              <div className="cart_row_info">
                <h4>{product.name}</h4>
                <p className="cart_row_category">{product.category}</p>
                <p className="cart_row_price">BDT {product.price}</p>
              </div>
              <button
                className="cart_remove_btn"
                onClick={() => removeFromCart(product._id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ))}

      <div className="cart_footer">
        <label className="cart_select_all">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
          />
          All
        </label>
        <p className="cart_subtotal">Subtotal: BDT {subtotal}</p>
        <button
          className="btn_primary"
          disabled={checkedItems.length === 0}
          onClick={() => navigate("/checkout")}
        >
          Check Out ({checkedItems.length})
        </button>
      </div>
    </div>
  );
}
