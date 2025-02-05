const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    image :{
        type : String,
        required : true 
    }
}, {timestamps : true});

const HeroSection = mongoose.model("heroSection", heroSectionSchema);

module.exports = {HeroSection};