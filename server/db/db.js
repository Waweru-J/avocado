const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Avocado";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error);
    process.exit(1);
  });

const conn = mongoose.connection;

conn.once("open", () => {
  console.log("MongoDB connected successfully");
});

conn.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1);
});

const User = require("../schema/Users.js");
const Avocado = require("../schema/Avocados.js");
const Review = require("../schema/Review.js");

module.exports = { User, Avocado, Review };
