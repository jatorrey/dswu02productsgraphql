const Facturapi = require('facturapi').default;

const facturapi = new Facturapi(
    "sk_test_v7gw215dbQVnYyBpXlbyL2kKkEjP9lALaeDRMNWqr6" //Reemplazar este campo por tu propio test_key, consultado en: https://dashboard.facturapi.io/integration/apikeys
);

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

async function createUser(user) {
    const facturapiUser = {
        legal_name: user.name,
        tax_id: user.rfc,
        tax_system: '603',
        email: user.email,
        address: {
            zip: user.zip
        }
    }
    return await facturapi.customers.create(facturapiUser);
}

async function updateUser(facturapiid, user) {
    const facturapiUser = {
        legal_name: user.name,
        tax_id: user.rfc,
        tax_system: '603',
        email: user.email,
        address: {
            zip: user.zip
        }
    }
    return await facturapi.customers.update(facturapiid, facturapiUser);
}

async function deleteUser(user){
    return await facturapi.customers.delete(user.facturapiid);
}

module.exports = {
    createProduct
    , updateProduct
    , deleteProduct
    , createUser
    , updateUser
    , deleteUser
};