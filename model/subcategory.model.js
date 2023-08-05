import mongoose from "mongoose";
import categoryModel from "./category.model";

const Schema = mongoose.Schema;

const subcategoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: categoryModel,
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

export default mongoose.model("subcategory", subcategoryModel);
