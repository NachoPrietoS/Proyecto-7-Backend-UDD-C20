require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const gameRouter = require('./routes/game.routes');
const userRouter = require('./routes/user.routes');
const router = require('./routes/cart.routes');

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/games', gameRouter);
app.use('/carts', router);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok'});
});

app.listen(PORT, ()=>{
    console.log(`El servidor corre en el puerto ${PORT}`);
})