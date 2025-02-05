const mongoose = require('mongoose');

const newLeagueSectionSchema = new mongoose.Schema({
    image :{
        type : String,
        required : true 
    }
}, {timestamps : true});

const NewLeagueSection = mongoose.model("newLeagueSection", newLeagueSectionSchema);

module.exports = {NewLeagueSection};