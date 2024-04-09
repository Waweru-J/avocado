const mongoose = require("mongoose");

const avocadoSchema = new mongoose.Schema({
  variety: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  harvestTimes: {
    type: String,
    required: true,
  },

  farmsize: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  produceQuality: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String, // Corrected to String
    required: true,
  },
  phone: {
    type: Number, // Corrected to String
    required: true,
  },
  username: {
    type: String, // Corrected to String
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Avocado", avocadoSchema);
