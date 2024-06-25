const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  fetchCategoryProduct,
  fetchProductsByCategory,
  fetchProductsBrand,
  fetchProduct,
  payment,
  search, // Import the search function from product controller
} = require("../controller/productcontroller.js");
const uploadProductImages = require("../config/multerconfig.js");

productRouter.get("/get-products", getProducts);

productRouter.get('/fetch-product/:id', fetchProduct);

productRouter.get('/fetch-category-product', fetchCategoryProduct);

productRouter.get('/fetch-brand-product', fetchProductsBrand);

productRouter.get('/fetch-product-by-category', fetchProductsByCategory);

productRouter.post("/add-product", uploadProductImages, addProduct);

productRouter.post('/create-payment-intent', payment);

productRouter.patch("/update-product", uploadProductImages, updateProduct);

productRouter.delete("/delete-product", deleteProduct);

productRouter.post("/search", search);

module.exports = productRouter;
