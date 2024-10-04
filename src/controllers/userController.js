const multer = require("multer");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/profile-images");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req?.user?._id}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload an image", 400), false);
  }
}; */

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
  const profileImage = req.file.filename;

  const user = await User.findByIdAndUpdate(req.params.id, {
    name,
    profileImage,
  });

  res.status(200).json({ status: "success", data: { user } });
});

/* ===================== UPLOAD PROFILE IMAGE ==================== */
/* exports.uploadProfileImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("profileImage");
 */