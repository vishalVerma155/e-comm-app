const express = require('express');
const {upload} = require('../../../utils/multer.js');
const {registerSaleSection, updateImageSaleSection, updateSaleSection, getsaleSection, getAllSaleSection, deleteSaleSection} = require('../../../controllers/homapage/saleSection/saleSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// register sale section
router.post("/registerSaleSection", verifyJWT, upload.array("saleSectionImages", 3), registerSaleSection);

// update image in sale section
router.post("/updateImageSaleSection/:sectionId/:imageId", verifyJWT, upload.single("saleSectionImage"), updateImageSaleSection);

// update sale section
router.post("/updateSaleSection/:sectionId", verifyJWT, upload.array("saleSectionImages", 3), updateSaleSection);

// get all sale sections
router.get("/getAllSaleSection", verifyJWT, getAllSaleSection);

// get particular sale section
router.get("/getSaleSection/:sectionId", verifyJWT, getsaleSection);

// delete sale section
router.delete("/deletesaleSection/:sectionId", verifyJWT, deleteSaleSection );

module.exports = router;
