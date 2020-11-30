import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: false,
    default: null,
  },
  email_varified: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    default: "student",
  },
});

userSchema.methods.genrateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisissecret", {
    expiresIn: "6h",
  });
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = userSchema;
