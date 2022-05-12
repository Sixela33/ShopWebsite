const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description available",
  },
  ownerID: {
    type: String,
    required: true,
  },
  ownerUsername: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lastPrice: {
    type: Number,
  },
  displayImage: {
    type: String,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
