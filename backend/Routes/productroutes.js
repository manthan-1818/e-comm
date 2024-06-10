const express = require("express");
const productRouter = express.Router();
const { addProduct, updateProduct, deleteProduct } = require("../controller/productcontroller.js");
const uploadProductImages = require("../config/multerconfig.js");

productRouter.post(
  "/add-product",
  uploadProductImages.array("images", 5),
  addProduct
);
productRouter.patch(
  "/update-product",
  uploadProductImages.array("images", 5),
  updateProduct
);
productRouter.delete("/delete-product", deleteProduct);

module.exports = productRouter;
