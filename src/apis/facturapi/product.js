const facturapi = require('./connection');

async function createProduct(product) {
    const facturapiProduct = {
        description: product.description,
        product_key: "43211902",
        price: product.price,
    };
    return await facturapi.products.create(facturapiProduct);
}

async function updateProduct(facturapiid, product) {
    const facturapiProduct = {
        description: product.description,
        product_key: "43211902",
        price: product.price,
    };
    return await facturapi.products.update(facturapiid, facturapiProduct);
}

async function deleteProduct(product) {
    return await facturapi.products.delete(product.facturapiid);
}

module.exports = {
    createProduct
    , updateProduct
    , deleteProduct
};