const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
    {
        idProd: {
            type: String,
            required: true,
        },
        priceId: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        img: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;