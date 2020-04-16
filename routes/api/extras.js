const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const Election = require('../../models/Election');
const Vote = require('../../models/Vote');

router.post('/adduser', async (req, res) => {
	const { name, email, password, gender, age, type } = req.body;
	try {
		const user = new User({
			name,
			email,
			gender,
			age,
			type
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();
		return res.sendStatus(200);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send({ errors: 'Server Error!' });
	}
});

router.post('/addvote', async (req, res) => {
	try {
		const { electionId, candidateId } = req.body;
		const user = (await User.find({ email: req.body.email }))[0];
		const election = await Election.findById(electionId);
		let candidateName = '';

		election.candidates = election.candidates.map((candidate) => {
			if (candidate._id.toString() === candidateId) {
				candidate.votes += 1;
				candidateName = candidate.name;
			}
			return candidate;
		});

		const vote = new Vote({
			electionId: electionId,
			candidateId: candidateId,
			candidateName: candidateName,
			voterId: user.id,
			voterGender: user.gender,
			voterAge: user.age
		});

		await vote.save();
		await election.save();
		return res.sendStatus(200);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send({ errors: 'Server Error!' });
	}
});

module.exports = router;
