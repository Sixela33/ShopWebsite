const mongoose = require("mongoose");

// setting up connection to database
const connectDB = async (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
