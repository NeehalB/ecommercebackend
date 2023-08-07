import productModel from "../model/product.model";
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

export const addProduct = async (req, res) => {
  try {
    const uploadFile = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);
    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const {
        name,
        category_id,
        subcategory_id,
        price,
        quantity,
        description,
        shortDescription,
        stock,
      } = req.body;

      let imgname = [];
      if (req.files["thumbnail"] !== undefined) {
        for (let i = 0; i < req.files["thumbnail"].length; i++) {
          const element = req.files["thumbnail"][i];
          imgname.push(element.filename);
        }
      }
      let imgArr = [];
      if (req.files["images"] != undefined) {
        for (let i = 0; i < req.files["images"].length; i++) {
          const element = req.files["images"][i];
          imgArr.push(element.filename);
        }
      }
      const productData = new productModel({
        name: name,
        category_id: category_id,
        subcategory_id: subcategory_id,
        price: price,
        quantity: quantity,
        description: description,
        shortDescription: shortDescription,
        stock: stock,
        thumbnail: imgname[0],
        images: imgArr,
      });
      productData.save();
      if (productData) {
        res.status(201).json({
          data: productData,
          message: "Product has been added successfully.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const productData = await productModel.find({
      status: 1,
    });
    return res.status(200).json({
      data: productData,
      message: "Product data found!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    const productData = await productModel.updateOne(
      { _id: product_id },
      { $set: { status: 9 } }
    );
    if (productData.acknowledged) {
      res.status(201).json({
        data: productData,
        message: "Product deleted successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const uploadFile = upload.single("thumbnail");
    uploadFile(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const {
        product_id,
        name,
        price,
        quantity,
        stock,
        shortDescription,
        description,
      } = req.body;
      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/" + categoryData.image)) {
          fs.unlinkSync("./uploads/" + categoryData.image);
        }
      }
      const productData = await productModel.updateOne(
        { _id: product_id },
        {
          $set: {
            name: name,
            price: price,
            quantity: quantity,
            thumbnail: image,
            stock: stock,
            shortDescription: shortDescription,
            description: description,
          },
        }
      );
      if (productData.acknowledged) {
        res.status(200).json({
          message: "Product data updated.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
