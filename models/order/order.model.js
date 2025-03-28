const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pinCode: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: Number
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            price: Number,
            color: String,
            size: String
        },
    ],
    shippingCost: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    paymentMethod: {
        type: String,
        default: "cod"
    },
    transtionId:{
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
