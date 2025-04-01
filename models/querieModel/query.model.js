const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
