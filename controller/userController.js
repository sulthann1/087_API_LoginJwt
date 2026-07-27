const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.User;

async function register(req, res) {
    try {
    const { username, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        });
    }
    const existingUser = await User.findOne({ 
        where: { email } 
    });

    if (existingUser) {
        return res.status(409).json({
            message: 'Email already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword
    });

    return res.status(201).json({
        message: 'User registered successfully',
        data: {
            id: user.id,
            email: user.email
        }
    });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}