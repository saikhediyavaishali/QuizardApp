const express = require("express");
require("dotenv").config();
require("./models/config");
const cors = require("cors");
const router = require("./routes/mainRouter");

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use("/", router);

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on ${process.env.PORT}`);
});

module.exports = server;
