import express from "express";
import auth from "../middleware/auth.middleware";
import {
  addSubCategory,
  findSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../controller/subcategory.controller";

const subCategoryRouter = express.Router();

subCategoryRouter.post("/add-subcategory", auth, addSubCategory);
subCategoryRouter.get("/get-subcategory", findSubCategory);
subCategoryRouter.delete("/delete-subcategory", auth, deleteSubCategory);
subCategoryRouter.put("/update-subcategory", auth, updateSubCategory);

export default subCategoryRouter;
