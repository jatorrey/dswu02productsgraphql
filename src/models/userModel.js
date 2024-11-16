const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facturapiid: { type: String, required: true },
    rfc: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, required: true },
    paymentMethod: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);