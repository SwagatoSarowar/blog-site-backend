const AppError = require("../utils/appError");

const sendErrorRes = function (err, res) {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};

const handleCastError = function (error) {
  const message = `Invalid ${error.path} : ${error.value}`;
  return new AppError(message, 400);
};

const handleValidationError = function (error) {
  return new AppError(error.message, 400);
};

const handleDuplicateFieldError = function (error) {
  const message = `Duplicate field value : ${
    error.message.match(/"(.*?)"/)[0]
  }. Please enter another one.`;
  return new AppError(message, 400);
};

const handleTokenExpireError = function () {
  return new AppError("The token has been expired. Please login again", 401);
};

const handleJWTError = function () {
  return new AppError("Invalid token. Please login again", 401);
};

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") err = handleCastError(err);
  if (err.name === "ValidationError") err = handleValidationError(err);
  if (err.code === 11000) err = handleDuplicateFieldError(err);
  if (err.name === "TokenExpiredError") err = handleTokenExpireError();
  if (err.name === "JsonWebTokenError") err = handleJWTError();

  sendErrorRes(err, res);
};

module.exports = errorController;
