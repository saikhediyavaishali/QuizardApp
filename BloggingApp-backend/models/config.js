const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL, { useNewUrlParser: true });
mongoose.connection.on("connected", (req, res) => {
  console.log("MongoDb successfully connected to Blog_Comments");
});
mongoose.connection.on("error", (err, res) => {
  console.log(`Error occur ${err.message}`);
});
