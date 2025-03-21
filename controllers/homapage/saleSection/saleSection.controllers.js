const { SaleSection } = require('../../../models/homepage/saleSection/saleScetion.model.js');

const registerSaleSection = async (req, res) => {
    try {
        const files = req.files; // get images

        const saleImage1 = req.files.saleImage1[0].path;
        const saleImage2 = req.files.saleImage2[0].path;
        const saleImage3 = req.files.saleImage3[0].path;

        console.log("IMG1", saleImage1)
        console.log("IMG2", saleImage2)
        console.log("IMG3", saleImage3)

        if (!files) {
            return res.status(401).json({ Message: "images not found" });
        }

        // const images = files.map((file) => ({
        //     path: file.path
        // })); // get images


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

        const updatedImage = await SaleSection.findOneAndUpdate({ _id: sectionId, "image._id": imageId }, { $set: { "image.$.path": image } }, { new: true }); // update image
        console.log(updatedImage);

        if (!updatedImage) {
            return res.status(401).json({ Message: "Image not found. Wrong image id" }); // if image is updated or not
        }

        const updatedSaleSection = await SaleSection.findById(sectionId); // get updated sale section

        return res.status(200).json({ Message: "Image has been updated", updated_Sale_Section: updatedSaleSection }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get update whole sale section
const updateSaleSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId; // get section id
        const files = req.files; // get images

        if (!files) {
            return res.status(401).json({ Message: "new images path not found" }); // check new image image
        }
        if (!sectionId) {
            return res.status(401).json({ Message: "sale section id not found" }); // check new image image
        }

        const images = files.map((file) => ({
            path: file.path
        })); // get images

        const updatedSaleSection = await SaleSection.findByIdAndUpdate(sectionId, { image: images }, { new: true }); // find and update image

        if (!updatedSaleSection) {
            return res.status(404).json({ Message: "sale section not found. Wrong sale section id" });
        }

        return res.status(200).json({ Message: "sale section has been updated", updated_Sale_Section: updatedSaleSection }); // 

    } catch (error) {
        return res.status(400).json({ Error: error.message });
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


module.exports = { registerSaleSection, updateImageSaleSection, updateSaleSection, getAllSaleSection, getsaleSection, deleteSaleSection };