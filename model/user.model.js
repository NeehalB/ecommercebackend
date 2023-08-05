import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userModel = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  otp: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    default: "Consumer",
  },
});

export default mongoose.model("users", userModel);
