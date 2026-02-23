const User = require("../models/Users");
const Cart = require("../models/Cart");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) return res.status(400).json({ message: 'El usuario ya existe' });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newCart = await Cart.create({});

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            cart: newCart
        });

        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
        return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al crear el usuario', error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: 'Usuario no existe' });

        const correctPassword = await bcryptjs.compare(password, foundUser.password);
        if (!correctPassword) return res.status(400).json({ message: 'El email o la password no corresponde' });

        const payload = { user: { id: foundUser._id } };
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        });
    } catch (error) {
        res.json({ message: 'hubo un error al iniciar sesión', error: error.message });
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al verificar el usuario', error: error.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { username, email, password, country, address, zipcode, phone } = req.body;
        const userId = req.user.id;
        // 1. Buscamos al usuario actual
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        // 2. Preparamos el objeto de actualización
        const updateData = {
            username: username || user.username,
            email: email || user.email,
            country: country !== undefined ? country : user.country,
            address: address !== undefined ? address : user.address,
            zipcode: zipcode !== undefined ? zipcode : user.zipcode,
            phone: phone !== undefined ? phone : user.phone
        };
        // 3. SOLO si el usuario mandó una password nueva, la encriptamos
        if (password && password.trim() !== "") {
            const salt = await bcryptjs.genSalt(10);
            updateData.password = await bcryptjs.hash(password, salt);
        }
        // 4. Actualizamos usando findByIdAndUpdate con las opciones correctas
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            {
                returnDocument: 'after', // El nuevo estándar que pedía Mongoose
                runValidators: true
            }
        ).select("-password");
        return res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });
    } catch (error) {
        // Si el error es por nombre duplicado (E11000)
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'El nombre de usuario o email ya está en uso.'
            });
        }
        console.error("Error en el Backend:", error.message);
        res.status(500).json({
            message: 'Hubo un error al actualizar el usuario',
            error: error.message
        });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al eliminar el usuario', error: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'hubo un error al obtener los usuarios', error: error.message });
    }
}