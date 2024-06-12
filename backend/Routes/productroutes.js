// const express = require("express");
// const productRouter = express.Router();
// const {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getProducts,
// } = require("../controller/productcontroller.js");
// const uploadProductImages = require("../config/multerconfig.js");

// productRouter.get("/get-products", getProducts);
// productRouter.post(
//   "/add-product",
//   uploadProductImages.array("images", 5),
//   addProduct
// );
// productRouter.patch(
//   "/update-product",
//   uploadProductImages.array("images", 5),
//   updateProduct
// );
// productRouter.delete("/delete-product", deleteProduct);

// module.exports = productRouter;


const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controller/productcontroller.js");
const uploadProductImages = require("../config/multerconfig.js");

productRouter.get("/get-products", getProducts);

productRouter.get('/fetch-product-by-category', fetchProductsByCategory);

productRouter.post("/add-product", uploadProductImages, addProduct);

productRouter.patch("/update-product", uploadProductImages, updateProduct);

productRouter.delete("/delete-product", deleteProduct);

module.exports = productRouter;
