const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const uri = "mongodb+srv://root:123@cluster0-lawgb.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
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
