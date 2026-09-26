
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../model/Product.js";

dotenv.config();

const approveExisting = async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  const result = await Product.collection.updateMany(
    {
      $or: [
        { approvalStatus: { $exists: false } },
        { approvalStatus: "pending" },
      ],
    },
    {
      $set: { approvalStatus: "approved" },
    },
  );

  console.log(
    `Approved ${result.modifiedCount} existing product(s) (matched ${result.matchedCount}).`,
  );

  process.exit(0);
};

approveExisting().catch((error) => {
  console.error("Failed to approve existing products:", error);
  process.exit(1);
});