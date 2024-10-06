const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const uploadImage = require("../utils/uploadImage");

/* ======================= GET ALL BLOGS ===================== */
exports.getBlogs = catchAsync(async function (req, res, next) {
  const blogs = await Blog.find();

  res.status(200).json({ status: "success", data: { blogs } });
});

/* ======================= GET BLOG BY ID ===================== */
exports.getBlog = catchAsync(async function (req, res, next) {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({ status: "success", data: { blog } });
});

/* ======================= CREATE BLOG ===================== */
exports.createBlog = catchAsync(async function (req, res, next) {
  const { title, details, category } = req.body;
  const author = req.user._id;

  const result = await uploadImage(req.file.buffer);
  const blog = await Blog.create({
    title,
    details,
    category,
    author,
    blogImage: result.secure_url,
  });

  res.status(201).json({ status: "success", data: { blog } });
});
