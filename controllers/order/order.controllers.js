const Order = require("../../models/order/order.model.js");

const createOrder = async(req, res) =>{
    try {
        const userId = req.user_id;
        const {} = req.body;
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = {createOrder};