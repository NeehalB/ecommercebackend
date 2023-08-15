import express from "express";
import auth from "../middleware/auth.middleware";
import {
  addCategory,
  findCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
} from "../controller/category.controller";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", auth, addCategory);
categoryRouter.get("/get-category", auth, findCategory);
categoryRouter.get("/get-all-categories", auth, getAllCategories);
categoryRouter.delete("/delete-category", auth, deleteCategory);
categoryRouter.put("/update-category", auth, updateCategory);

export default categoryRouter;
