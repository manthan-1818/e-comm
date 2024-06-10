const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: { type: [String], required: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
