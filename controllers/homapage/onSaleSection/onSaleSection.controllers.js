const Product = require('../../../models/productModel/product.model.js')


// get all on sale product
const createOnSaleSection = async (req, res) => {
    try {
        const onSaleSection = await Product.find({ onSale: true });
        return res.status(200).json({ Message: "On Sale Section has been created", onSaleSection });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}


module.exports = { createOnSaleSection };