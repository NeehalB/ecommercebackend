import express from "express";
import { addToCart, getCart } from "../controller/cart.controller";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/get-cart-items", getCart);
cartRouter.delete("/delete-from-cart")

export default cartRouter;
