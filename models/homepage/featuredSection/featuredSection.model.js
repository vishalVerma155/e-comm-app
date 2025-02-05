const mongoose = require('mongoose');

const featuredSectionSchema = new mongoose.Schema({
    mainImage : {
        type : String,
    },
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    subImages : {
        type : Array
    }
}, {timestamps : true});

const FeaturedSection = mongoose.model("featuredSection", featuredSectionSchema);

module.exports = {FeaturedSection};