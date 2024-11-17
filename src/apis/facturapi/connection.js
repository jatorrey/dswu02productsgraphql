const Facturapi = require('facturapi').default;

const facturapi = new Facturapi(
    "sk_test_v7gw215dbQVnYyBpXlbyL2kKkEjP9lALaeDRMNWqr6" //Reemplazar este campo por tu propio test_key, consultado en: https://dashboard.facturapi.io/integration/apikeys
);

module.exports = facturapi;