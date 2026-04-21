const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());




mongoose
    .connect('mongodb://localhost:27017/jwtdemo')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('❌ MongoDB error:', err))
    

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on ${PORT}`)
    })