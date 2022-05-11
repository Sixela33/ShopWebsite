const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/connect");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

const port = process.env.PORT || 5000;

app.use("/auth", require("./routes/auth"));
app.use("/items", require("./routes/items"));
app.use("/users", require("./routes/users"));

// Starts the sv and connects to the database
const start = async () => {
  try {
    await connectDB(process.env.REACT_APP_MONGO_URI);
    app.listen(port, console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

start();
