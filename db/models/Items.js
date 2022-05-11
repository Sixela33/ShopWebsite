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
    default:
      "https://i.pinimg.com/474x/a2/9f/71/a29f71faadeaa79a8b67919c81d5b767.jpg",
  },
});

module.exports = mongoose.model("Items", ItemSchema);
