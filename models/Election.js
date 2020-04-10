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
	},
	candidates: [
		{
			name: {
				type: String,
				required: true
			},
			age: {
				type: Number,
				required: true
			},
			gender: {
				type: String,
				enum: ['Male', 'Female']
			},
			promises: {
				type: String,
				default: ''
			},
			votes: {
				type: Number,
				default: 0
			},
			imageURL: {
				type: String,
				default: '' // TODO: Have to put in default image url here..
			}
		}
	]
});

module.exports = Election = mongoose.model('elections', ElectionSchema);
