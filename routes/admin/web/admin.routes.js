const express = require('express');
const {registerAdmin, loginAdmin} = require('../../../controllers/admin/web/admin.controllers.js');

// const verifyJWT = require('../../middleware/auth.middleware.js')

const router = express.Router();

// register admin
router.post("/registerAdmin", registerAdmin );

// login admin
router.post("/loginAdmin", loginAdmin);


module.exports = router;