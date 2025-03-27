const {createReview, getReviewsByProduct, deleteReview} = require('../../controllers/product/review.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const router = express.Router();


// create product
router.post("/createReview", verifyJWT, createReview);

// update product
router.get("/getReviews/:productId", getReviewsByProduct );

// delete product
router.delete("/deleteReview/:reviewId", verifyJWT, deleteReview);



module.exports = router;