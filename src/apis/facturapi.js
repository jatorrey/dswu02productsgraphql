const Facturapi = require('facturapi').default;

const facturapi = new Facturapi(
    "sk_test_v7gw215dbQVnYyBpXlbyL2kKkEjP9lALaeDRMNWqr6" //Reemplazar este campo por tu propio test_key, consultado en: https://dashboard.facturapi.io/integration/apikeys
);

async function createProduct(product) {
    const facturapiProduct = {
        description: product.description,
        product_key: "S0202306",
        price: product.price,
    };
    return await facturapi.products.create(facturapiProduct);
}

module.exports = {
    createProduct
};