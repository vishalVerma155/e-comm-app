const {NewLeagueSection} = require('../../../models/homepage/newLeagueSection/newLeagueSection.model.js');


// register new league section image
const registerNewLeagueSection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        if (!image) {
            return res.status(404).json({ Message: "Image not found" });
        }

        const createdImage = new NewLeagueSection({
            image
        });
        await createdImage.save(); //  save image

        if (!createdImage) {
            return res.status(500).json({ Message: "Error in create new league section image in database" }); // check if image is saved or not
        }

        return res.status(200).json({ Message: "New League section image sucessfully register", NewLeagueSection_Image: createdImage }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get particular new league  section 
const getNewLeagueSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id

        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        const image = await NewLeagueSection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ Message: "Wrong image id. Image not found" }); // check image id 
        }

        return res.status(200).json({ NewLeague_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get all new league section
const getAllNewLeagueSection = async (req, res) => {
    try {
        const images = await NewLeagueSection.find(); // find all images
        return res.status(200).json({ All_NewLeague_Sections: images }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// update new league section
const updateNewLeagueSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id
        const newImage = req.file ? req.file.path : undefined;

        // console.log("newImage", newImage);
        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        if (!newImage) {
            return res.status(404).json({ Message: "Image not found" }); // check image 
        }

        const newLeagueSection = await NewLeagueSection.findByIdAndUpdate(imageId, { image: newImage }, { new: true }); // find hero section image and update 
        
        if (!newLeagueSection) {
            return res.status(404).json({ Message: "Wrong image id. Image not found" }); // check image id 
        }

        return res.status(200).json({ updated_NewLeague_Section: newLeagueSection }); // return response
    } catch (error) {
        return res.status(400).json({error : error.message });
    }
}

// delete hero section 

const deleteNewLeagueSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id

        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        const image = await NewLeagueSection.findByIdAndDelete(imageId); // find image and delete
        if (!image) {
            return res.status(404).json({ Message: "Wrong image id. section not found" }); // check image id 
        }

        return res.status(200).json({ Message: "new league section image has been deleted", deleted_NewLeagueSection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

module.exports = {registerNewLeagueSection, getAllNewLeagueSection,getNewLeagueSection,updateNewLeagueSection, deleteNewLeagueSection};
