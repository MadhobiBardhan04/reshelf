// scripts/cleanupCarts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cart from "../model/cart.js";
import Product from "../model/Product.js";

dotenv.config();

const cleanup = async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  const soldProducts = await Product.find({
    availabilityStatus: "sold",
  }).select("_id");
  const soldIds = soldProducts.map((p) => p._id);

  const result = await Cart.updateMany(
    {},
    { $pull: { items: { product: { $in: soldIds } } } },
  );

  console.log(`Cleaned ${result.modifiedCount} cart(s).`);
  process.exit(0);
};

cleanup();
