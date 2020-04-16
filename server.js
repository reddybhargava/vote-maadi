const express = require('express');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const config = require('config');
const cloudinaryConfig = config.get('cloudinaryConfig');
const fileUpload = require('express-fileupload');

const app = express();

// Connect database
connectDB();

// Configure cloudinary (for uploading images)
cloudinary.config(cloudinaryConfig);

// Init Middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/elections', require('./routes/api/elections'));
app.use('/api/extras', require('./routes/api/extras'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
