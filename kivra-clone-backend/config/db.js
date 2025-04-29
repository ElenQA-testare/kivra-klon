// db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Läser in din .env-fil

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stoppa servern om det blir fel
  }
};

module.exports = connectDB;
