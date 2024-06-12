// controller/productController.js

const Product = require("../models/product.js");
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_BAD_REQUEST,
  MSG_INTERNAL_SERVER_ERROR,
  MSG_PRODUCT_ADDED,
  MSG_PRODUCT_UPDATED,
  MSG_PRODUCT_DELETED,
  MSG_PRODUCT_NOT_FOUND,
} = require("../constant/constantError.js");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("product", products);
    res.status(STATUS_SUCCESS).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.addProduct = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(STATUS_BAD_REQUEST).json({ message: MSG_BAD_REQUEST });
    }

    const { productName, brandName, category, description, price } = req.body;

    const imageUrls = req.files.map((file) => {
      return `http://localhost:5000/uploads/${file.originalname}`;
    });

    const newProduct = new Product({
      productName,
      brandName,
      category,
      description,
      price,
      productImage: imageUrls,
    });

    const createdProduct = await newProduct.save();

    res.status(STATUS_CREATED).json({ message: MSG_PRODUCT_ADDED, newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId, productName, brandName, category, description, price } =
      req.body;

    const imageUrls = req.files.map((file) => {
      return `http://localhost:5000/uploads/${file.originalname}`;
    });

    const updateFields = {
      productName,
      brandName,
      category,
      description,
      price,
    };

    if (imageUrls && imageUrls.length > 0) {
      updateFields.productImage = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: MSG_PRODUCT_NOT_FOUND });
    }

    res
      .status(STATUS_SUCCESS)
      .json({ message: MSG_PRODUCT_UPDATED, updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const productData = await Product.findByIdAndDelete(id);
    if (productData) {
      res.status(STATUS_SUCCESS).json({ message: MSG_PRODUCT_DELETED });
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: MSG_PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    console.error("Delete product controller error:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
