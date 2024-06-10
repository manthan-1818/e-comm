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
} = require("../constant/constantError.js");

exports.addProduct = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(STATUS_BAD_REQUEST).json({ message: MSG_BAD_REQUEST });
    }

    const { productName, brandName, category, description, price } = req.body;
    const imageUrl = req.files.map((file) => file.path);

    const newProduct = new Product({
      productName,
      brandName,
      category,
      description,
      price,
      productImage: imageUrl,
    });

    const createdProduct = await newProduct.save();
    res.status(STATUS_CREATED).json({ message: MSG_PRODUCT_ADDED, newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR, error: error.message });
  }
};


  exports.updateProduct = async (req, res) => {
    try {
      const { productId, productName, brandName, category, description, price } = req.body;
  
      const imageUrl = req.files ? req.files.map((file) => file.path) : undefined;
  
      const updateFields = {
        productName,
        brandName,
        category,
        description,
        price,
      };
  
      if (imageUrl && imageUrl.length > 0) {
        updateFields.productImage = imageUrl;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateFields,
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(STATUS_NOT_FOUND).json({ message: MSG_PRODUCT_NOT_FOUND });
      }
  
      res.status(STATUS_SUCCESS).json({ message: MSG_PRODUCT_UPDATED, updatedProduct });
    } catch (e) {
      console.error("Error updating product:", e);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: MSG_INTERNAL_SERVER_ERROR, error: e.message });
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
    console.error(`Delete product controller error: ${error}`);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
