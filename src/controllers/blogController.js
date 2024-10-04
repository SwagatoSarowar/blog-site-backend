const multer = require("multer");
const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/blog-images");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `blog-${req?.user?._id}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload an image", 400), false);
  }
};
 */
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
  const { title, details } = req.body;
  const blogImage = req.file.filename;
  const author = req.user._id;

  const blog = await Blog.create({ title, details, author, blogImage });

  res.status(201).json({ status: "success", data: { blog } });
});

/* ===================== UPLOAD BLOG IMAGE ==================== */
/* exports.uplodaBlogImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("blogImage");
 */