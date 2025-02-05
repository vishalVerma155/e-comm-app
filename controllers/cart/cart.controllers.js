const Cart = require('../../models/cart/cart.model.js');

const addProductInCart = async (req, res) => {
    try {
        const userId = req.user._id; // get user id
        const productId = req.params.productId; // get product id

        if (!productId) {
            return res.status(404).json({ Message: "Product id not found" });
        }

        let cart = await Cart.findOne({ userId }); // check cart is existed or not

        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ product: productId, quantity: 1 }],
            })   // if cart is not existed then add user id and product id in this
        } else {
            const existedProduct = cart.products.find((p) => p.product.toString() === productId); // check product is already existed in cart or not

            if (existedProduct) {
                existedProduct.quantity += 1;  // if existed then add quentity
            } else {
                cart.products.push({ product: productId, quantity: 1 }) // if product not existed then add product
            }
        }

        await cart.save(); // save the cart

        return res.status(200).json({ Message: "cart has been updated", cart }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// get wishlist
const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // get user id
        const cart = await Cart.findOne({ userId }).populate('products.product');

        if (!cart) {
            return res.status(400).json({ Message: "Cart is not existed" });
        }

        return res.status(200).json({ status: "Successfull", cart });
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// remove product from cart
const removeProductFromCart = async (req, res) => {
    try {

        const user = req.user._id; // get user id 
        const productId = req.params.productId; // get product id

        if (!user || !productId) {
            return res.status(404).json({ Message: "product id or user id not found" }) // check user id and product id
        }

        const cart = await Cart.findOne({ userId: user }); // find cart


        const index = cart.products.findIndex((index) => index.product.toString() === productId); // find index of the product

        if (index === -1) {
            return res.status(404).json({ Message: "Product not found" }); // product not found in array
        }

        if (cart.products[index].quantity > 1) {
            cart.products[index].quantity -= 1; // minus the quantity in the product
            await cart.save(); // save the cart
            return res.status(200).json({ message: 'Product has been minus from  cart', cart });
        }

        if (cart.products[index].quantity === 1) {
            cart.products.splice(index, 1); // remove the product from the cart
            await cart.save(); // save the cart
            return res.status(200).json({ message: 'Product has been removed from cart', cart });
        }
        
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
};

module.exports = { addProductInCart, getCart, removeProductFromCart };
