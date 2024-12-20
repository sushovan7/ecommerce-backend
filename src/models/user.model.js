import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

export const userModel = mongoose.model("User", userSchema);