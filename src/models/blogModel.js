const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title for the blog is required."],
    },
    blogImage: {
      type: String,
    },
    details: {
      type: String,
      required: [true, "Details of the blog is required."],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
