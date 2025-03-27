const Cart = require('../../models/cart/cart.model.js');

const addProductInCart = async (req, res) => {
    try {
        const userId = req.user._id;  // Get user ID
        const productId = req.params.productId;  // Get product ID
        const { color, size, quantity } = req.body;  // Get color, size, and quantity

        // Validate input
        if (!productId || !color || !size || !quantity || quantity <= 0) {
            return res.status(400).json({ Message: "Product ID, color, size, and valid quantity are required." });
        }

        let cart = await Cart.findOne({ userId }); // Check if cart exists

        if (!cart) {
            // Create new cart if not exist
            cart = new Cart({
                userId,
                products: [{ product: productId, quantity, color, size }],
            });
        } else {
            // Check if the same product with the same color and size exists
            const existedProduct = cart.products.find(
                (p) => 
                    p.product.toString() === productId &&
                    p.color === color &&
                    p.size === size
            );

            if (existedProduct) {
                existedProduct.quantity += quantity;  // Increase quantity based on request
            } else {
                cart.products.push({ product: productId, quantity, color, size }); // Add new product variation
            }
        }

        await cart.save(); // Save the cart

        return res.status(200).json({ Message: "Cart has been updated", cart });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};


// get wishlist
// const getCart = async (req, res) => {
//     try {
//         const userId = req.user._id; // get user id
//         const cart = await Cart.findOne({ userId }).populate('products.product');

//         if (!cart) {
//             return res.status(400).json({ Message: "Cart is not existed" });
//         }

//         return res.status(200).json({ status: "Successfull", cart });
//     } catch (error) {
//         return res.status(400).json({ Error: error.message });
//     }
// }

const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID
        const cart = await Cart.findOne({ userId }).populate('products.product');

        if (!cart) {
            return res.status(400).json({ Message: "Cart does not exist" });
        }

        // Format the response to include color and size for each product
        const formattedCart = cart.products.map((item) => ({
            productId: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
            color: item.color,
            size: item.size
        }));

        return res.status(200).json({ status: "Successful", cart: formattedCart });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};


const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user._id;  // Get user ID
        const productId = req.params.productId;  // Get product ID
        const { color, size } = req.body;  // Get color and size from request

        // Validate input
        if (!userId || !productId || !color || !size) {
            return res.status(400).json({ Message: "User ID, product ID, color, and size are required." });
        }

        const cart = await Cart.findOne({ userId });  // Find the cart

        if (!cart) {
            return res.status(404).json({ Message: "Cart not found." });
        }

        // Find index of the product with the same color and size
        const index = cart.products.findIndex(
            (p) => p.product.toString() === productId && p.color === color && p.size === size
        );

        if (index === -1) {
            return res.status(404).json({ Message: "Product not found in the cart." });
        }

        if (cart.products[index].quantity > 1) {
            cart.products[index].quantity -= 1;  // Reduce quantity
        } else {
            cart.products.splice(index, 1);  // Remove product if quantity is 1
        }

        await cart.save();  // Save updated cart

        return res.status(200).json({ message: "Cart has been updated.", cart });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};


// remove product from cart
// const removeProductFromCart = async (req, res) => {
//     try {

//         const user = req.user._id; // get user id 
//         const productId = req.params.productId; // get product id

//         if (!user || !productId) {
//             return res.status(404).json({ Message: "product id or user id not found" }) // check user id and product id
//         }

//         const cart = await Cart.findOne({ userId: user }); // find cart


//         const index = cart.products.findIndex((index) => index.product.toString() === productId); // find index of the product

//         if (index === -1) {
//             return res.status(404).json({ Message: "Product not found" }); // product not found in array
//         }

//         if (cart.products[index].quantity > 1) {
//             cart.products[index].quantity -= 1; // minus the quantity in the product
//             await cart.save(); // save the cart
//             return res.status(200).json({ message: 'Product has been minus from  cart', cart });
//         }

//         if (cart.products[index].quantity === 1) {
//             cart.products.splice(index, 1); // remove the product from the cart
//             await cart.save(); // save the cart
//             return res.status(200).json({ message: 'Product has been removed from cart', cart });
//         }

//     } catch (error) {
//         return res.status(400).json({ Error: error.message });
//     }
// };

module.exports = { addProductInCart, getCart, removeProductFromCart };
