const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const userExist = await Auth.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
    message: "User Registered Successfully",
    data: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
});

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};