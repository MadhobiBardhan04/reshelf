import "dotenv/config";
import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

try {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("CONNECTED TO MONGODB");
  process.exit(0);
} catch (err) {
  console.log("MONGODB ERROR:", err);
  process.exit(1);
}
