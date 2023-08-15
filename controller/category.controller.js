import categoryModel from "../model/category.model";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads", true);
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    const imgname = file.originalname;
    const imgarr = imgname.split(".");
    imgarr.pop();
    const imgExt = path.extname(imgname);
    const fname = imgarr.join(".") + "-" + Date.now() + imgExt;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

export const addCategory = async (req, res) => {
  try {
    const uploadFile = upload.single("image");
    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const { name, description } = req.body;

      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
      }

      const categoryData = new categoryModel({
        name: name,
        description: description,
        image: image,
      });
      categoryData.save();

      if (categoryData) {
        return res.status(201).json({
          data: categoryData,
          message: "Data added sucessfully.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const findCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryData = await categoryModel.findOne({ name: name });
    if (!categoryData) {
      return res.status(400).json({
        message: "Category does not exist.",
      });
    }
    return res.status(200).json({
      data: categoryData,
      message: "Category data found.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categoryData = await categoryModel.find();
    if (!categoryData) {
      return res.status(400).json({
        message: "Category list empty.",
      });
    }
    return res.status(200).json({
      data: categoryData,
      message: "Categories retrived.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryData = await categoryModel.updateOne(
      { name: name },
      { $set: { status: 0 } }
    );
    if (categoryData.acknowledged) {
      res.status(201).json({
        data: categoryData,
        message: "Category deleted successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const uploadFile = upload.single("image");
    uploadFile(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const { name, description } = req.body;
      const { id } = req.query;
      console.log(id);
      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/" + categoryData.image)) {
          fs.unlinkSync("./uploads/" + categoryData.image);
        }
      }
      const categoryData = await categoryModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            description: description,
            image: image,
          },
        }
      );
      if (categoryData.acknowledged) {
        res.status(200).json({
          message: "Category data updated successfully.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
