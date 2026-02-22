const Cart = require('../models/Cart');
const User = require('../models/Users');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createCheckoutSession = async (req, res) =>{
    const userID = req.user.id;
    const foundUser = await User.findOne({ _id: userID });
    const foundCart = await Cart.findOne(foundUser.cart).populate({
        path: 'products'
    })

    const line_items = foundCart.products.map(product => {
        return {
            price: product.priceID,
            quantity: product.quantity
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}/success`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}/cancel`,
        customer_email: foundUser.email
    })
    res.json({ 
        session_url: session.url,
        session
    })
}

exports.getCart = async (req, res) => {
    const userID = req.user.id;
    const foundUser = await User.findById(userID);
    const foundCart = await Cart.findById(foundUser.cart);
    res.json({foundCart});
}

exports.addToCart = async (req, res) => {
    const userID = req.user.id;
    const foundUser = await User.findOne({ _id: userID });
    const { products } = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(foundUser.cart, { products }, { new: true });

    res.json({ msg: 'tu carrito fue actualizado', updatedCart });
}