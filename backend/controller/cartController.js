// controller/cartController.js
import Cart from "../model/cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product",
  );
  res.status(200).json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId }],
    });
  } else if (!cart.items.some((i) => i.product.toString() === productId)) {
    cart.items.push({ product: productId });
    await cart.save();
  }

  res.status(200).json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  await Cart.updateOne(
    { user: req.user._id },
    { $pull: { items: { product: productId } } },
  );
  res.status(200).json({ message: "Removed from cart" });
};
