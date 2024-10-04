const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
      trim: true,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required."],
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: "Please enter valid email address.",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "User password is required."],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Password and confirm password doesn't match.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
