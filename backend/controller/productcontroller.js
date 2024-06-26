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


exports.fetchProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching product with ID:", id); 
  
  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({
        data: product,
        message: 'Product fetched successfully'
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.fetchCategoryProduct = async (req, res) => {
  try {
    const productCategory = await Product.distinct("category");

    const productByCategory = [];
    for (const category of productCategory) {
      const product = await Product.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(200).json({
      message: "Category products fetched successfully",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching category products:", err);
    res.status(400).json({
      message: err.message || "Failed to fetch category products",
      error: true,
      success: false,
    });
  }
};

exports.fetchProductsBrand = async (req, res) => {
  try {
    const { brandName } = req.query;

    let productsByBrand;

    productsByBrand = await Product.find({ brandName: brandName });
    console.log("eeeeee", productsByBrand);

    console.log("Fetched products by brand:", productsByBrand);
    res.status(200).json({
      message: "Brand products fetched successfully",
      data: productsByBrand,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching brand products:", err);
    res.status(400).json({
      message: err.message || "Failed to fetch brand products",
      error: true,
      success: false,
    });
  }
};

exports.fetchProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ category });
    if (products.length > 0) {
      console.log(`Products found for category ${category}:`, products);
      res.status(200).json({
        message: `Products found for category ${category}`,
        data: products,
        success: true,
        error: false,
      });
    } else {
      console.log(`No products found for category ${category}`);
      res
        .status(404)
        .json({ message: `No products found for category ${category}` });
    }
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      message: "Failed to fetch products. Please try again later.",
      error: true,
      success: false,
    });
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
      return `http://192.168.2.85:5000/uploads/${file.originalname}`;
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
      return `http://192.168.2.85:5000/uploads/${file.originalname}`;
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
exports.search = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("search query:", query);
    const results = await Product.find({
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ]
    }).select('productName description price');

    console.log('Search results:', results); 

    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'An error occurred while searching products' });
  }
};


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: { message: 'Invalid amount' } });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).send({
      error: {
        message: error.message
      }
    });
  }
};

