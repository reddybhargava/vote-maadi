const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ElectionSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	imageURL: {
		type: String,
		default: '' // TODO: Have to put in default image url here..
	},
	hostedBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	description: {
		type: String,
		required: true
	},
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

module.exports = Election = mongoose.model('elections', ElectionSchema);
