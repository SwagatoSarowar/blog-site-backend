const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");

/* ======================= GET ALL CATEGORIES ===================== */
exports.getCategories = catchAsync(async function (req, res, next) {
  const categories = await Category.find();

  res.status(200).json({ status: "success", data: { categories } });
});

/* ======================= CREATE CATEGORY ===================== */
exports.createCategory = catchAsync(async function (req, res, next) {
  const { name, description } = req.body;

  const category = await Category.create({ name, description });

  res.status(201).json({ status: "success", data: { category } });
});

/* ======================= GET CATEGORY BY ID ===================== */
exports.getCategory = catchAsync(async function (req, res, next) {
  const category = await Category.findById(req.params.id);

  res.status(200).json({ status: "success", data: { category } });
});

/* ======================= UPDATE CATEGORY ===================== */
exports.updateCategory = catchAsync(async function (req, res, next) {
  const { name, description } = req.body;

  const category = await Category.findByIdAndUpdate(req.params.id, {
    name,
    description,
  });

  res.status(200).json({ status: "success", data: { category } });
});

/* ======================= DELETE CATEGORY ===================== */
exports.deleteCategory = catchAsync(async function (req, res, next) {
  await Category.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: "success" });
});
