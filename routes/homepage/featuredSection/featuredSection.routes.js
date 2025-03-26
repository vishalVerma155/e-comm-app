const express = require('express');
const { getAllFeaturedProducts} = require('../../../controllers/homapage/featuredSection/featuredSection.controllers.js');
const verifyJWT = require('../../../middleware/auth.middleware.js');

const router = express.Router();

// get all featured products
router.get("/getAllFeaturedProducts", getAllFeaturedProducts);

module.exports = router;