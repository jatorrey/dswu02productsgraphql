const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rfc: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { 
        street: { type: String, default: null },
        exterior: { type: String, default: null },
        interior: { type: String, default: null },
        neighborhood: { type: String, default: null },
        city: { type: String, default: 'N/A' },
        municipality: { type: String, default: 'N/A' },
        zip: { type: String, required: true },
        state: { type: String, default: 'N/A' },
        country: { type: String, default: 'N/A' }
     },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['ADMIN', 'CLIENT'], default: 'CLIENT' },
    paymentMethod: { type: String, enum: ['CASH', 'CARD', 'PAYPAL', 'N/A'], default: 'N/A' },
    facturapiid: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);