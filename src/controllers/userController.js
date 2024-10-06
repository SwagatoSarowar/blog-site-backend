const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const uploadImage = require("../utils/uploadImage");

/* ======================= GET ALL USERS ===================== */
exports.getUsers = catchAsync(async function (req, res, next) {
  const users = await User.find();

  res.status(200).json({ status: "success", data: { users } });
});

/* ======================= GET USER BY ID ===================== */
exports.getUser = catchAsync(async function (req, res, next) {
  const user = await User.findById(req.params.id);

  res.status(200).json({ status: "success", data: { user } });
});

/* ======================= UPDATE USER ===================== */
exports.updateUser = catchAsync(async function (req, res, next) {
  const { name } = req.body;

  const result = await uploadImage(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      profileImage: result.secure_url,
    },
    { new: true }
  );

  res.status(200).json({ status: "success", data: { user } });
});
