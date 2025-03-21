const mongoose = require('mongoose');

const saleSectionSchema = new mongoose.Schema({
    image1 :{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        path : { type: String, }
    },
    image2 :{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        path : { type: String,  }
    },
    image3 :{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        path : { type: String,  }
    }
    
});

const SaleSection = mongoose.model("saleSection", saleSectionSchema);

module.exports = {SaleSection};