const moongoose = require('mongoose');

const ElectionSchema = new moongoose.Schema({
	name: {
		type: String,
		required: true
	},
	hostedBy: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

module.exports = Election = moongoose.model('election', ElectionSchema);
