const express = require('express');
const verifyJWT = require('../../../middleware/auth.middleware.js');
const { upload } = require('../../../utils/multer.js');
const {registerNewLeagueSection, getAllNewLeagueSection, getNewLeagueSection, updateNewLeagueSection, deleteNewLeagueSection} = require('../../../controllers/homapage/newLeague/newLeagueSection.controllers.js');


const router = express.Router();

// register hero section
router.post("/registerNewLeagueSection", verifyJWT, upload.single("newLeagueSectionImage"), registerNewLeagueSection);

// update hero section
router.put("/updateNewLeagueSection/:imageId", verifyJWT,upload.single("newLeagueSectionImage"), updateNewLeagueSection);

// get hero section
router.get("/getNewLeagueSection/:imageId",  getNewLeagueSection);

// get all hero section images
router.get("/getAllNewLeagueSectionImages",  getAllNewLeagueSection);

// delete hero section image
router.delete("/deleteNewLeagueSection/:imageId", verifyJWT, deleteNewLeagueSection);

module.exports = router;