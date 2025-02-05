const mongoose = require('mongoose');

const saleSectionSchema = new mongoose.Schema({
    image :[{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        path : { type: String, required: true }
    }]
});

const SaleSection = mongoose.model("saleSection", saleSectionSchema);

module.exports = {SaleSection};