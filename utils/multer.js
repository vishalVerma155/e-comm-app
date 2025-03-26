const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional image transformation
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };



// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'uploads/'); // file path
//     },
//     filename : (req, file, cb) =>{
//         cb(null, Date.now() + "-" + file.originalname); // create unique file name
//     }
// })

// const upload = multer({storage}); // multer config

// module.exports = {upload};