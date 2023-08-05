import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("category", categoryModel);
