import dns from "dns";
import express from "express";
import userRoutes from "./routes/users.js";
import authRouter from "./routes/auth.js";
import log from "./middlewares/logger.js";
import carbonTracker from "./middlewares/carbonTracker.js"; // NEW
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(`Error connecting to database ${err}`);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  }),
);

app.use(carbonTracker);

app.get("/api", (req, res) => res.json({ message: "API is working" }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
