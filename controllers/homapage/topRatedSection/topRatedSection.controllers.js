const Product = require('../../../models/productModel/product.model.js');

// create top rated section
const createTopRatedSection = async (req, res) =>{
    try {
        const topRatedSection = await Product.find().sort({rating : -1});
        return res.status(200).json({ Message: "Top rated Section has been created", topRatedSection });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}
    
    
    module.exports = {createTopRatedSection};