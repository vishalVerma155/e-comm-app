const mongoose = require('mongoose');

const newArrivalSectionSchema = new mongoose.Schema({
    image1 :{
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            path : { type: String, }
        },
        image2 :{
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            path : { type: String,  }
        },
});

const NewArrivalSection = mongoose.model("newArrivalSection", newArrivalSectionSchema);

module.exports = {NewArrivalSection};