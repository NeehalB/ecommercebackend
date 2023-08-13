import userModel from "../model/user.model";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads");
      cb(null, "./upload");
    }
  },
  filename: function (req, file, cb) {
    const imgName = file.originalname;
    const imgArr = imgName.split(".");
    imgArr.pop();
    const extImg = path.extname(imgName);
    const imageName = imgArr.join(".") + "-" + Date.now() + extImg;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

export const signUp = async (req, res) => {
  try {
    const uploadFile = upload.single("avatar");

    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const { firstname, lastname, email, contact, password, dob, role } =
        req.body;

      let image = "";
      if (req.file !== undefined) {
        image = req.file.filename;
        console.log(req.file.filename);
      }

      const userData = new userModel({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        dob: dob,
        contact: contact,
        role: role,
        avatar: image,
      });
      userData.save();
      if (userData) {
        return res.status(201).json({
          data: userData,
          message: "User added successfully.",
        });
      }
    });
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
