const {createQuery, getAllQueries, deleteQuery} = require('../../controllers/query/query.controllers.js');
const express = require('express');
const verifyJWT = require('../../middleware/auth.middleware.js');
const router = express.Router();


// create product
router.post("/createQuery", createQuery);

// delete product
router.delete("/deleteQuery/:queryId", verifyJWT, deleteQuery);

// get ALL reviews
router.get("/getAllQuery", verifyJWT, getAllQueries);



module.exports = router;