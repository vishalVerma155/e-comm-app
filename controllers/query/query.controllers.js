const Query = require('../../models/querieModel/query.model.js');


const createQuery = async(req, res) =>{
    try {
        const {name, subject} = req.body;
        const data = req.body;

        if(!name || name && name.trim() === "" || !subject || subject && subject.trim() === ""){
            return res.status(404).json({success : false, error: "name and subject are compulsary" });
        }

        const query = new Query(data);
        await query.save();

        return res.status(200).json({success : true, message : "Query has been created successfully", query });

    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

const getAllQueries = async(req, res) =>{
    try {
        const userName = req.user.userName;

        if(userName !== "admin"){
            return res.status(404).json({success : false, error: "Sorry you are not authrized for this.Only admin can do this" });
        }
        const queryies = await Query.find();

        return res.status(200).json({success : true,  queryies });

    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

const deleteQuery = async(req, res) =>{
    try {
        const userName = req.user.userName;
        const queryId = req.params.queryId;

        if(userName !== "admin"){
            return res.status(404).json({success : false, error: "Sorry you are not authrized for this.Only admin can do this" });
        }

        if(!queryId){
            return res.status(404).json({success : false, error: "Query id not found" });
        }
        const deletedQuery = await Query.findByIdAndDelete(queryId);

        if(!deletedQuery){
            return res.status(404).json({success : false, error: "Query not found" });
        }

        return res.status(200).json({success : true,message : "Query has been deleted",  deletedQuery });

    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}

module.exports = {createQuery, getAllQueries, deleteQuery};
