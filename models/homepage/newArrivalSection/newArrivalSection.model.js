const mongoose = require('mongoose');

const newArrivalSectionSchema = new mongoose.Schema({
    image :[{
        _id : {type : mongoose.Schema.Types.ObjectId, auto : true},
        path : {type : String, required : true}
    }]
});

const NewArrivalSection = mongoose.model("newArrivalSection", newArrivalSectionSchema);

module.exports = {NewArrivalSection};