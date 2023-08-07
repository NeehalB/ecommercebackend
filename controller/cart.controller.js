import cartModel from "../model/cart.model";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const cartItems = await cartModel.findOne({
      user_id: user_id,
      product_id: product_id,
    });
    if (cartItems) {
      if (cartItems.quantity == 10) {
        return res.status(400).json({
          message: "Only 10 items allowed.",
        });
      }
      const updatedItem = await cartModel.updateOne(
        { _id: cartItems._id },
        {
          $set: {
            quantity: cartItems.quantity + 1,
          },
        }
      );
      if (updatedItem.acknowledged) {
        res.status(200).json({
          message: "updated",
        });
      }
    } else {
      const cartData = new cartModel({
        user_id: user_id,
        product_id: product_id,
        quantity: 1,
      });
      cartData.save();
      if (cartData) {
        res.status(201).json({
          data: cartData,
          message: "Successfully added to cart!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const cartData = await cartModel.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ]);
    if (cartData.length === 0) {
      return res.status(400).json({
        message: "Data not found.",
      });
    }
    res.status(200).json({
      data: cartData,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cart_id } = req.body;
    const cartData = await cartModel.deleteOne({ _id: cart_id });
    if (cartData.acknowledged) {
      res.status(200).json({
        message: "Deleted.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
