const Product = require('../../../models/productModel/product.model.js');


const getAllFeaturedProducts = async (req, res) => {
    try {
        const featuredProduct = await Product.find({ featured: true });
        return res.status(200).json({ success : true, featuredSection : featuredProduct.length <= 0 ? "There is not any featured image" : featuredProduct });

    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = { getAllFeaturedProducts };