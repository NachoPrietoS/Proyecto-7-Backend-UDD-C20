const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            sparse: true
        },
        password: {
            type: String,
            required: true
        },
        cart: {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
            default: []
        },
        country: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        zipcode: {
            type: Number,
            default: 0
        },
        phone: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;