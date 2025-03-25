const {Brands} = require('../../../models/homepage/brands/brands.model.js');

// register brands section
const registerBrandsSection = async (req, res) => {
    try {
        const files = req.files; // get images
        if (!files) {
            return res.status(401).json({ Message: "images not found" });
        }

        const images = files.map((file) => ({
            path: file.path
        })); // get images

        if(images.length <= 0){
            return res.status(401).json({success : false, error: "images not found" });
        }

        const brandsSection = new Brands({ image: images }); // create brandse section
        await brandsSection.save();

        if (!brandsSection) {
            return res.status(401).json({ Message: "images not saved in database" }); // check brands section
        }
        return res.status(200).json({ Message: "Brands section has been created",  brands_Section: brandsSection }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error });
    }
}

// update only one image in brands section 
const updateImageBrandsSection = async (req, res) => {
    try {
        const imageId = req.params.imageId; // get image id
        const image = req.file.path; // get new image
        const sectionId = req.params.sectionId; // get section id

        if (!imageId) {
            return res.status(401).json({ Message: "old images id not found" }); // check old image
        }

        if (!image) {
            return res.status(401).json({ Message: "new image path not found" }); // check new image image
        }
        if (!sectionId) {
            return res.status(401).json({ Message: "sale section id not found" }); // check new image image
        }

        const updatedImage = await Brands.findOneAndUpdate({_id : sectionId, "image._id" : imageId}, { $set : {"image.$.path" : image}}, {new : true}); // update image
        

        if (!updatedImage) {
            return res.status(401).json({ Message: "Image not found. Wrong image id" }); // if image is updated or not
        }

        const updatedBrandsSection = await Brands.findById(sectionId); // get updated brands section

        return res.status(200).json({ Message: "Image has been updated", updated_Brands_Section: updatedBrandsSection }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get update whole sale section
const updateBrandsSection =  async (req, res) =>{
try {
    const sectionId = req.params.sectionId; // get section id
    const files = req.files; // get images

    if (!files) {
        return res.status(401).json({ Message: "new images path not found" }); // check new image
    }
    if (!sectionId) {
        return res.status(401).json({ Message: "sale section id not found" }); // check section id
    }

    const images = files.map((file) => ({
        path: file.path
    })); // get images

    const updatedBrandsSection = await Brands.findByIdAndUpdate(sectionId, {image :images }, {new : true}); // find and update image

    if(!updatedBrandsSection){
        return res.status(404).json({Message : "brand section not found. Wrong brand section id"});
    }

    return res.status(200).json({Message : "Brands section has been updated", updated_Brands_Section : updatedBrandsSection}); // 

} catch (error) {
    return res.status(400).json({ Error: error.message });
}
}

// view all brands section
const getAllBrandsSection = async (req, res) =>{
try {
    const list = await Brands.find();
    return res.status(200).json({All_Brands_section : list});
} catch (error) {
    return res.status(400).json({Error : error.message});
}
}

// get brand section
const getBrandsSection = async (req, res) =>{
try {
    const sectionId = req.params.sectionId; // get section id
    if(!sectionId){
        return res.status(401).json({ Message: "brand section id not found" }); // check new image image
    }

    const section = await Brands.findById(sectionId); // find section

    if(!section){
        return res.status(404).json({Message : "Wrong brand section id. Brand section not found"});
    }

    return res.status(200).json({status : "successfull", Brands_section : section});
} catch (error) {
    return res.status(400).json({Error : error.message});
}
}

// delete brands section
const deleteBrandsSection = async (req, res) =>{
    try {
        const sectionId = req.params.sectionId; // get section id
        if(!sectionId){
            return res.status(401).json({ Message: "sale section id not found" }); // check section id
        }
    
        const section = await Brands.findByIdAndDelete(sectionId); // find section and delete
    
        if(!section){
            return res.status(404).json({Message : "Wrong brand section id. Brand section not found"});
        }
    
        return res.status(200).json({Message : "successfull deleted", deleted_Brand_section : section});
    } catch (error) {
        return res.status(400).json({Error : error.message});
    }
}

module.exports = {registerBrandsSection, getAllBrandsSection, getBrandsSection, updateBrandsSection, updateImageBrandsSection, deleteBrandsSection};