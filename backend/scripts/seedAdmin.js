import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../model/user.js";

dotenv.config();

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;
const displayName = process.env.SEED_ADMIN_NAME || "Admin";

const seedAdmin = async () => {
  if (!email || !password) {
    console.error("Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.DATABASE_URL);

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log("A user with this email already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username: email.split("@")[0],
    displayName,
    email,
    password: hashedPassword,
    provider: "email",
    role: "admin",
  });

  console.log(`Admin account created for ${email}.`);
  process.exit(0);
};

seedAdmin();
