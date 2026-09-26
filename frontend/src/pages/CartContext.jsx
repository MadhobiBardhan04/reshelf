import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const API_URL = "http://localhost:4000/api/cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(API_URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const items = (data.items || []).map((i) => ({
          product: i.product,
          checked: true,
        }));
        setCartItems(items);
      })
      .catch((error) => {
        console.error("Failed to load cart:", error);
      });
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      const cart = await res.json();
      setCartItems(
        cart.items.map((i) => ({ product: i.product, checked: true })),
      );
    } catch (error) {
      console.error("addToCart error:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to remove from cart");

      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId),
      );
    } catch (error) {
      console.error("removeFromCart error:", error);
    }
  };

  const refreshCart = () => {
    fetch(API_URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const items = (data.items || []).map((i) => ({
          product: i.product,
          checked: true,
        }));
        setCartItems(items);
      })
      .catch((error) => console.error("Failed to refresh cart:", error));
  };

  const toggleChecked = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, checked: !item.checked }
          : item,
      ),
    );
  };

  const toggleAll = (checked) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const checkedItems = cartItems.filter((item) => item.checked);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        toggleChecked,
        refreshCart,
        toggleAll,
        clearCart,
        checkedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
