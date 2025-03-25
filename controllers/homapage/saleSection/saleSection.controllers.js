const { SaleSection } = require('../../../models/homepage/saleSection/saleScetion.model.js');

const registerSaleSection = async (req, res) => {
    try {
        const files = req.files; // get images

        if (!files) {
            return res.status(401).json({ Message: "images not found" });
        }

        const saleImage1 = req.files.saleImage1[0].path;
        const saleImage2 = req.files.saleImage2[0].path;
        const saleImage3 = req.files.saleImage3[0].path;

        

        const saleScetion = new SaleSection({
            image1: { path: saleImage1 },
            image2: { path: saleImage2 },
            image3: { path: saleImage3 }
        }); // create sale section
        await saleScetion.save();

        if (!saleScetion) {
            return res.status(401).json({ Message: "images not saved in database" }); // check sale section
        }
        return res.status(200).json({ Message: "Sales section has been created", saleScetion }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error });
    }
}

// update only one image in sale section sale section 
const updateImageSaleSection = async (req, res) => {
    try {
        
        const sectionId = req.params.sectionId; // get section id
        const files = req.files;
 
        if (!sectionId) {
            return res.status(401).json({success : false, error: " section id not found" }); // check section id
        }

        const section = await SaleSection.findById(sectionId); // find and update image

        if (!section) {
            return res.status(401).json({success : false, error: "Section not found. Wrong Section id" }); 
        }

        if(files?.saleImage1){
            section.image1.path = files.saleImage1[0].path;
        }
       
        
        if(files?.saleImage2){
            section.image2.path = files.saleImage2[0].path;
        }

        if(files?.saleImage3){
            section.image3.path = files.saleImage3[0].path;
        }

        await section.save();

        return res.status(200).json({ success : true, Message: "Image has been updated", updated_Sale_Section: section }); // return response
    } catch (error) {
        return res.status(400).json({success : false, error: error.message });
    }
}



// view all sale section
const getAllSaleSection = async (req, res) => {
    try {
        const list = await SaleSection.find();
        return res.status(200).json({ All_sale_section: list });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get sale section
const getsaleSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        if (!sectionId) {
            return res.status(401).json({ Message: "sale section id not found" }); // check new image image
        }

        const section = await SaleSection.findById(sectionId); // find section

        if (!section) {
            return res.status(404).json({ Message: "Wrong sale section id. sale section not found" });
        }

        return res.status(200).json({ status: "successfull", sale_section: section });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// delete sale ection
const deleteSaleSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        if (!sectionId) {
            return res.status(401).json({ Message: "sale section id not found" }); // check new image image
        }

        const section = await SaleSection.findByIdAndDelete(sectionId); // find section and delete

        if (!section) {
            return res.status(404).json({ Message: "Wrong sale section id. sale section not found" });
        }

        return res.status(200).json({ Message: "successfull deleted", deleted_sale_section: section });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}


module.exports = { registerSaleSection, updateImageSaleSection, getAllSaleSection, getsaleSection, deleteSaleSection };