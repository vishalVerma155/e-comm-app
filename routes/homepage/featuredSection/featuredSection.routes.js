const express = require('express');
const {registerFeatureSection, updateFeaturedSection, getAllFeaturedSection, getFeaturedsection, deleteFeaturedsection} = require('../../../controllers/homapage/featuredSection/featuredSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const { upload } = require('../../../utils/multer.js');
const router = express.Router();

// register feature section
router.post("/registerFeaturedSection", verifyJWT, upload.fields([{name : "mainImage", maxCount : 1},{name : "subImages", maxCount : 3} ]), registerFeatureSection);

// update feature section
router.put("/updateFeaturedSection/:sectionId", verifyJWT, upload.fields([{name : "mainImage", maxCount : 1},{name : "subImages", maxCount : 3} ]), updateFeaturedSection);

// get all feature section
router.get("/getAllFeaturedSection",  getAllFeaturedSection);

// get particular featured section
router.get("/getFeaturedSection/:sectionId",  getFeaturedsection);

// delete featured section
router.delete("/deleteFeaturedSection/:sectionId", verifyJWT, deleteFeaturedsection);

module.exports = router;