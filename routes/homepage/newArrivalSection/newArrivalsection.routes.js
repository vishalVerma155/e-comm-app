const express = require('express');
const {upload} = require('../../../utils/multer.js');
const {registerNewArrivalSection, updateImageNewArrivalSection, updateNewArrivalSection, getAllNewArrivalSection, getNewArrivalSection, deleteNewArrivalSection} = require('../../../controllers/homapage/newArrivalsection/newArrivalSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const router = express.Router();

// register newArrival section
router.post("/registerNewArrivalSection", verifyJWT, upload.array("newArrivalSectionImages", 2), registerNewArrivalSection);

// update image in NewArrival section
router.put("/updateImageNewArrivalSection/:sectionId/:imageId", verifyJWT, upload.single("newArrivalSectionImage"), updateImageNewArrivalSection);

// update NewArrival section
router.put("/updateNewArrivalSection/:sectionId", verifyJWT, upload.array("newArrivalSectionImages", 2), updateNewArrivalSection);

// get all NewArrival sections
router.get("/getAllNewArrivalSection", verifyJWT, getAllNewArrivalSection);

// get particular NewArrival section
router.get("/getNewArrivalSection/:sectionId", verifyJWT, getNewArrivalSection);

// delete NewArrival section
router.delete("/deleteNewArrivalSection/:sectionId", verifyJWT, deleteNewArrivalSection );

module.exports = router;