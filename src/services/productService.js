const Product = require('../models/productModel');
const facturapi = require('../apis/facturapi/product');

const productService = {
  getProducts: async () => await Product.find(),
  createProduct: async (args) => {
    const product = new Product(args);
    const facturapiproduct = await facturapi.createProduct(product);
    product.facturapiid = facturapiproduct.id;
    return await product.save();
  },
  updateProduct: async ({ _id, ...rest }) => {
    const product = await Product.findByIdAndUpdate(_id, rest, { new: true });
    facturapi.updateProduct(product.facturapiid, product);
    return product;
  },
  deleteProduct: async (_id) => {
    const product = await Product.findByIdAndDelete(_id);
    facturapi.deleteProduct(product.facturapiid);
    return product;
  }
};

module.exports = productService;
