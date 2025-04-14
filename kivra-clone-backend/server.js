require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Importera routes
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Statiska filer (för nedladdning av dokument)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Kontrollera miljövariabler
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI saknas i .env-filen");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET saknas i .env-filen");
  process.exit(1);
}

// Anslut till MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Använd routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
