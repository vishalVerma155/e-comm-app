const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
    image :{
        type : String
    }
});

const Brands = mongoose.model("brand", brandsSchema);

module.exports = {Brands};