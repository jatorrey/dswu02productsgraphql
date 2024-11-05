const Product = require('../models/productModel');

const productService = {
  getProducts: async () => await Product.find(),
  createProduct: async (args) => {
    const product = new Product(args);
    return await product.save();
  },
  updateProduct: async ({ _id, ...rest }) => {
    return await Product.findByIdAndUpdate(_id, rest, { new: true });
  },
  deleteProduct: async (_id) => {
    return await Product.findByIdAndDelete(_id);
  }
};

module.exports = productService;
