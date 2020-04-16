const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	timestamp: {
		type: Date,
		default: Date.now
	},
	electionId: {
		type: Schema.Types.ObjectId,
		ref: 'elections'
	},
	candidateId: {
		type: Schema.Types.ObjectId
	},
	candidateName: {
		type: String
	},
	voterId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	voterAge: {
		type: Number,
		required: true
	},
	voterGender: {
		type: String,
		enum: ['Male', 'Female']
	}
});

module.exports = Vote = mongoose.model('votes', VoteSchema);
