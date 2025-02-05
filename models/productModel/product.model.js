const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: String,
      required: true,
      trim : true
    },
    size: {
      type: [String], // Array of sizes
      required: true,
    },
    colour: {
      type: [String], // Array of colors
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0, // Percentage discount (e.g., 10 for 10%)
      min: 0,
      max: 100,
    },
    mainImage: {
      type: String,
      required: true,
    },
    subImages: {
      type: [String], // Array of image URLs/paths
      default: [],
    },
    onSale :{
        type : Boolean,
        required: true,
        trim : true
    },
    gender : {
        type : String,
        enum : ["men", "women", "kids"],
        trim : true
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

