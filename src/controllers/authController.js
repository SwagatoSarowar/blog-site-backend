const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/* =========== SIGN UP ============ */
exports.signup = catchAsync(async function (req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  newUser.password = undefined;

  res.status(201).json({ status: "success", data: { user: newUser } });
});

/* ============= SIGN IN ============ */
exports.signin = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide your email and password.", 400));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user || !user.correctPassword(password, user.password)) {
    next(new AppError("Email and password combination incorrect.", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  user.password = undefined;
  res.status(200).json({ status: "success", token, data: { user } });
});

/* ======== PROTECT  MIDDLEWARE========= */
exports.protect = catchAsync(async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    next(
      new AppError("You are not logged in. Please login to get access.", 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const loggedUser = await User.findById(decoded.id);

  if (!loggedUser) next(new AppError("The user doesn't exist.", 401));

  req.user = loggedUser;
  next();
});

/* ================ RESTRICTING ROUTES ============== */
exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role))
      next(new AppError("You don't have right permission for this.", 401));
    next();
  };
};
