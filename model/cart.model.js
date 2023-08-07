import mongoose from "mongoose";
const Schema = mongoose.Schema;
import userModel from "./user.model";
import productModel from "../model/product.model";
const cartModel = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: userModel,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: productModel,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("cart", cartModel);
