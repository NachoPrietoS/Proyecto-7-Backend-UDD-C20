const express = require('express');
const auth = require('../middleware/authorization');
const { createCheckoutSession, getCart, addToCart, clearCart } = require('../controllers/cart.controller');

const router = express.Router();

router.get('/create-checkout-session', auth, createCheckoutSession);
router.get('/get-cart', auth, getCart);
router.put('/add-to-cart', auth, addToCart);
router.put("/clear-cart", auth, clearCart);

module.exports = router;