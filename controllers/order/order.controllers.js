const Order = require("../../models/order/order.model.js");
const Address = require('../../models/order/address.model.js');
const Product = require("../../models/productModel/product.model.js");
const User = require('../../models/userModel/user.model.js')

// Create an Order
const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ success: false, error: "User is not loged in. Please login first" })
        }

        const { products, shippingAddress, billingAddress, shippingCost, totalAmount, paymentMethod, transtionId, status } = req.body;

        if (!userId || !products || products.length <= 0 || !shippingAddress || !billingAddress || !totalAmount) {
            return res.status(400).json({ success: false, error: "User, Products, Shipping Address, Billing Address, and Total Amount are required." });
        }

        const order = new Order({
            userId,
            products,
            shippingAddress,
            billingAddress,
            shippingCost: shippingCost ? shippingCost : 0,
            totalAmount,
            paymentMethod,
            transtionId: transtionId ? transtionId : undefined
        });
        await order.save();

        return res.status(201).json({ success: true, message: "Order has been created successfully", order });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Get All Orders
const getAllOrdersByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).populate("userId", "name email").populate("products.product", "productName price").populate("shippingAddress").populate("billingAddress");

        if (!orders || orders.length <= 0) {
            return res.status(400).json({ success: false, error: "There is not any order of this user" });
        }

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getAllOrdersForAdmin = async (req, res) => {
    try {
        const username = req.user.userName;

        if (username !== "admin") {
            return res.status(400).json({ success: false, error: "Only admin can do this." });
        }

        const orders = await Order.find().populate("userId", "name email").populate("products.product", "productName price").populate("shippingAddress").populate("billingAddress");


        return res.status(200).json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).populate("userId", "name email").populate("products.product", "productName price").populate("shippingAddress").populate("billingAddress");
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        return res.status(200).json({ success: true, order });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {

        const username = req.user.userName;

        if (username !== "admin") {
            return res.status(400).json({ success: false, error: "Only admin can update status" });
        }

        const { status } = req.body;
        if (!status) {
            return res.status(404).json({ success: false, message: 'Status not found' });
        }

        const orderId = req.params.orderId;

        const order = await Order.findByIdAndUpdate(orderId, {status}, { new: true })
            .populate("userId", "name email")
            .populate("products.product", "productName price")
            .populate("shippingAddress")
            .populate("billingAddress");

        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        return res.status(200).json({ success: true, message: "Order updated successfully", order });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};




module.exports = { createOrder, getAllOrdersByUser, getAllOrdersForAdmin, updateOrder, getOrderById };