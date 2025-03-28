const {createOrder} = require('../../controllers/order/order.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const router = express.Router();


// create product
router.post("/createReview", verifyJWT, createOrder);

// update product
// router.get("/getReviews/:productId", getReviewsByProduct );

// // delete product
// router.delete("/deleteReview/:reviewId", verifyJWT, deleteReview);

// // get ALL reviews
// router.get("/getAllReviews", verifyJWT, getAllReviews);



module.exports = router;