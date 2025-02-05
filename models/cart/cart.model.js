const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        product :  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity : {
            type : Number,
            min : 1,
            default : 1
        }
    }]
}, { timestamps: true });

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;