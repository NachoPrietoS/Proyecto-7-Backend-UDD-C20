const express = require('express');
const auth = require('../middleware/authorization');
const { createCheckoutSession, getCart, addToCart } = require('../controllers/cart.controller');

const router = express.Router();

router.get('/create-checkout-session', auth, createCheckoutSession);
router.get('/get-cart', auth, getCart);
router.put('/add-to-cart', auth, addToCart);

module.exports = router;