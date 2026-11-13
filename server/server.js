

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Allowed Frontend Origins

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-website-c9eh16f0t-neural21.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(express.json({ limit: "10kb" }));

// Database Connection
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ShopNest server running on port ${PORT}`);
});
