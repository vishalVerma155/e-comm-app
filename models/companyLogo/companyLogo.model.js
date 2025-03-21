const mongoose = require('mongoose');

const companyLogoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const CompayLogo = mongoose.model('companyLogo', companyLogoSchema);
 module.exports = {CompayLogo};