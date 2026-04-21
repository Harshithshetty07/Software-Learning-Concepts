const express  = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = 'mySecretKey123';


router.post('/register', async (req, res) => { 
    try {
        const { username, email} = req.body;
        if(!username || !email) {
            return res.status(400).json({message: 'Username and email are required'})
        }
        const newUser = new User({ username, email});
        await newUser.save();

        const token = jwt.sign({
            userId: newUser._id,
            username: newUser.username,
            email: newUser.email
        },
    JWT_SECRET, {
        expiresIn: '1h'
    }
    )
        console.log('✅ Token created for:', username)

        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: { username, email}
        })

    } catch(err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        })
    }
} )


module.exports = router;