const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('MongoDB Connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;
