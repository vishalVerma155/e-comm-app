const mongoose = require('mongoose');

const companyLogoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const CompayLogo = mongoose.model('companyLogo', companyLogoSchema);
 module.exports = {CompayLogo};