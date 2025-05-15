require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for document downloads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Check environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI saknas i .env-filen");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET saknas i .env-filen");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// ✅ Test route for backend health check
app.get("/api/status", (req, res) => {
  res.json({ message: "Backend is alive" });
});

// Start the server if not in test mode
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`✅ Server running at http://localhost:${PORT}`)
  );
} else {
  module.exports = app; // Export for Supertest
}
