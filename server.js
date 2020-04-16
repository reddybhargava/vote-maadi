const express = require('express');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const config = require('config');
const cloudinaryConfig = config.get('cloudinaryConfig');
const fileUpload = require('express-fileupload');
const path = require('path');

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

// Server static assets if we are in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
