const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	age: {
		type: Number
	},
	type: {
		type: String,
		enum: ['Admin', 'Voter']
	},
	elections: {
		type: Array
	}
});

module.exports = User = mongoose.model('users', UserSchema);
