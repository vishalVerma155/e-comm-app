const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
            price: Number,
            color: String,
            size: String
        },
    ],
    totalAmount: Number,
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: Number,
    paymentMethod: {
        type: String,
        default: "cod"
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order", OrderSchema);
