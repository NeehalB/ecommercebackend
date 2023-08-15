import express from "express";
import auth from "../middleware/auth.middleware";
import {
  signIn,
  signUp,
  getUserDetails,
  deleteUser,
  updateUser,
  getOTP,
} from "../controller/user.controller";

const userRouter = express.Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.put("/get-otp", getOTP);
userRouter.get("/user-details", auth, getUserDetails);
userRouter.delete("/user-delete", auth, deleteUser);
userRouter.put("/update-user", auth, updateUser);

export default userRouter;
