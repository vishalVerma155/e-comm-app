const { HeroSection } = require('../../../models/homepage/heroSection/heroSection.model.js');

// register hero section image
const registerHeroSection = async (req, res) => {
    try {
        const image = req.file?.path || undefined; // get image
        if (!image) {
            return res.status(404).json({ Message: "Image not found" });
        }

        const createdImage = new HeroSection({
            image
        });
        await createdImage.save(); //  save logo

        if (!createdImage) {
            return res.status(500).json({ Message: "Error in create hero image in database" }); // check if logo is saved or not
        }

        return res.status(200).json({ Message: "Hero section image sucessfully register", heroSection_Image: createdImage }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get all hero section image
const getHeroSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id

        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        const image = await HeroSection.findById(imageId); // find image
        if (!image) {
            return res.status(404).json({ Message: "Wrong image id. Image not found" }); // check image id 
        }

        return res.status(200).json({ Hero_Section: image }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get all hero section
const getAllHeroSection = async (req, res) => {
    try {
        const images = await HeroSection.find(); // find all images
        return res.status(200).json({ All_Hero_Sections: images }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// update hero section
const updateHeroSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id
        const newImage = req.file ? req.file.path : undefined;

        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        if (!newImage) {
            return res.status(404).json({ Message: "Image not found" }); // check image 
        }

        const heroSection = await HeroSection.findByIdAndUpdate(imageId, { image: newImage }, { new: true }); // find hero section image and update 
        if (!heroSection) {
            return res.status(404).json({ Message: "Wrong image id. Image not found" }); // check image id 
        }

        return res.status(200).json({ update_Hero_Section: heroSection }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// delete hero section 

const deleteHeroSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id

        if (!imageId) {
            return res.status(404).json({ Message: "Image id not found" }); // check image id 
        }

        const image = await HeroSection.findByIdAndDelete(imageId); // find image and delete
        if (!image) {
            return res.status(404).json({ Message: "Wrong image id. hero section not found" }); // check image id 
        }

        return res.status(200).json({ Message: "hero section image has been deleted", deleted_HeroSection_Image: image }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

module.exports = {registerHeroSection, getAllHeroSection,getHeroSection,updateHeroSection, deleteHeroSection};
