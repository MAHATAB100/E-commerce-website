
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password || password.length < 12) {
      throw new Error(
        "Set ADMIN_EMAIL and a password of at least 12 characters in .env"
      );
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Update only the explicitly configured admin account.
      existingUser.password = hashedPassword;
      existingUser.role = "admin";
      existingUser.name = existingUser.name || "ShopNest Admin";

      await existingUser.save();

      console.log("Existing account updated as Admin.");
      console.log("Email:", email);
    } else {
      await User.create({
        name: "ShopNest Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created successfully.");
      console.log("Email:", email);
    }
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

createAdmin();
