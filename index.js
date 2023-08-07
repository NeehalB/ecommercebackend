import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/user.router";
import categoryRouter from "./router/category.router";
import subCategoryRouter from "./router/subcategory.router";
import productRouter from "./router/product.router";
import cartRouter from "./router/cart.router";

const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("You have successfully connect to the database."))
  .catch((err) => console.log(err));

app.use(userRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(cartRouter);
