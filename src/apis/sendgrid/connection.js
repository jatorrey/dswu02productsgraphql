const sgMail = require('@sendgrid/mail');

//API KEY de SendGrid no es posible de hacer push en GitHub, agregar localmente para pruebas.

sgMail.setApiKey('');

module.exports = sgMail;