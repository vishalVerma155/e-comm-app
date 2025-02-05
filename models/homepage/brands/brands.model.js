const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
    image :[{
        _id : {type : mongoose.Schema.Types.ObjectId, auto : true},
        path : {type : String, required : true}
    }]
});

const Brands = mongoose.model("brand", brandsSchema);

module.exports = {Brands};