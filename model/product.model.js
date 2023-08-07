import mongoose from "mongoose";
import categoryModel from "./category.model";
import subcategoryModel from "./subcategory.model";

const Schema = mongoose.Schema;

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: categoryModel,
    required: true,
  },
  subcategory_id: {
    type: Schema.Types.ObjectId,
    ref: subcategoryModel,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: Array,
    default: [],
  },
  stock: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("product", productModel);
