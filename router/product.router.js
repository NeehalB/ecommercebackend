import express from "express";
import auth from "../middleware/auth.middleware";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controller/product.controller";

const productRouter = express.Router();

productRouter.post("/add-product", auth, addProduct);
productRouter.get("/get-products", getProducts);
productRouter.delete("/delete-product", auth, deleteProduct);
productRouter.put("/update-product", auth, updateProduct);

export default productRouter;
