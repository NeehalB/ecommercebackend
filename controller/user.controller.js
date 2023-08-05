import userModel from "../model/user.model";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, contact, password, dob } = req.body;
    const userData = new userModel({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      dob: dob,
      contact: contact,
    });
    userData.save();
    if (userData) {
      return res.status(201).json({
        data: userData,
        message: "User added successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!userData) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }

    const token = jwt.sign(
      {
        userid: userData._id,
        email: userData.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);

    return res.status(200).json({
      token: token,
      data: userData,
      message: "Successfull login.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await userModel.findOne({ email: email, status: 1 });
    res.status(200).json({
      data: userData,
      message: "Userdata retrived successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.updateOne(
      {
        email: email,
        password: password,
      },
      { $set: { status: 0 } }
    );

    if (userData.acknowledged) {
      return res.status(201).json({
        message: "Data deleted successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const userData = await userModel.updateOne(
      { email: email },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        },
      }
    );
    if (userData.acknowledged) {
      return res.status(201).json({
        data: userData,
        message: "Updated user data successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
