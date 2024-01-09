const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  like: {
    type: Number,
    require: true,
    default: 0,
  },
  blogPic: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "userData",
  },
});
blogSchema.set("timestamps", true);

module.exports = mongoose.model("blogData", blogSchema);
