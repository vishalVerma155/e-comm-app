const {FeaturedSection} = require('../../../models/homepage/featuredSection/featuredSection.model.js');

// register feature section
const registerFeatureSection = async (req, res) =>{
try {
    
    const {price, productName} = req.body; // get price and product name
    const mainImage = req.files?.mainImage?.[0]?.path; // get main image 
    const subImages = req.files? req.files.subImages.map((file)=>file.path) : undefined; // get subimages
    
    if( !mainImage ||  price.trim() === "" || productName.trim() === ""){
        return res.status(400).json({Message : "All fields are mandetory"})
    }


    const featuredSection = new FeaturedSection({
        mainImage,
        price,
        productName,
        subImages
    })

    await featuredSection.save(); // save featured section

    if(!featuredSection){
        return res.status(500).json({Message : "Featured section not saved. something went wrong on server side"}); // check featured section
    }

    return res.status(200).json({Message : "Featured Section has been registered", featuredSection });
} catch (error) {
    return res.status(400).json({Error : error.message});
}
}

// update feature section
const updateFeaturedSection = async (req, res) =>{
try {
    const body = req.body; // get body data
    const sectionId = req.params.sectionId; // get section id
    const mainImage = req.files?.mainImage?.[0]?.path || undefined; // get main image
    const subImages = req.files.subImages? req.files.subImages.map((file)=> file.path ) : undefined; // get sub images

    if(!mainImage || mainImage.trim() === "" || !subImages || subImages.length === 0){
        return res.status(404).json({Message : "Empaty main image field is not allowed"});
    }


    const updatedFeaturedSection = await FeaturedSection.findByIdAndUpdate(sectionId, {...body, ...(mainImage && {mainImage}), ...(subImages && {subImages})}, {new : true}); // find and update section

    if(!updatedFeaturedSection){
        return res.status(404).json({Message : "Wrong section id. Section not found"});
    }

    return res.status(200).json({Message : "Featured section has been updated", updated_Featured_Section : updatedFeaturedSection}); // return response

} catch (error) {
    return res.status(400).json({Error : error.message});
}
}

// get all featured section
const getAllFeaturedSection = async (req, res) =>{
try {
    const list  = await FeaturedSection.find(); // get all list 
    return res.status(200).json({all_Featured_Section : list});
} catch (error) {
    return res.status(400).json({Error : error.message});
}
}

// get a particular section
const getFeaturedsection = async (req, res) =>{
    try {
        const sectionId = req.params.sectionId; // get section id
        if(!sectionId){
            return res.status(404).json({Message : "Section id not found"});
        }

        const featuredSection = await FeaturedSection.findById(sectionId); // get section
        if(!featuredSection){
            return res.status(404).json({Message : "Section not found. Wrong section id"});
        }

        return res.status(200).json({status : "Successful", featuredSection})
    } catch (error) {
    return res.status(400).json({Error : error.message});
    }
}

// delete feature section
const deleteFeaturedsection = async (req, res) =>{
    try {
        const sectionId = req.params.sectionId; // get section id
        if(!sectionId){
            return res.status(404).json({Message : "Section id not found"});
        }

        const deletedFeaturedSection = await FeaturedSection.findByIdAndDelete(sectionId); // get section
        if(!deletedFeaturedSection){
            return res.status(404).json({Message : "Featured Section not found. Wrong section id"});
        }

        return res.status(200).json({status : "Successful", deletedFeaturedSection});
    } catch (error) {
    return res.status(400).json({Error : error.message});
    }
}

module.exports = {registerFeatureSection, updateFeaturedSection, getAllFeaturedSection, getFeaturedsection, deleteFeaturedsection};