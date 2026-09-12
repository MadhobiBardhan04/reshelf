// context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // [{ product, checked }]

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.product._id === product._id);
      if (exists) return prev;
      return [...prev, { product, checked: true }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId),
    );
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

  const checkedItems = cartItems.filter((item) => item.checked);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        toggleChecked,
        toggleAll,
        checkedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
