const express = require('express');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const config = require('config');
const cloudinaryConfig = config.get('cloudinaryConfig');

const app = express();

// Connect database
connectDB();

// Configure cloudinary (for uploading images)
cloudinary.config(cloudinaryConfig);

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/elections', require('./routes/api/elections'));
// app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
