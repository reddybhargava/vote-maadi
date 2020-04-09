const express = require('express');
const router = express.Router();
const joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({});
const cloudinary = require('cloudinary').v2;

const Election = require('../../models/Election');
const auth = require('../../middleware/auth');

// @route   POST /api/elections/
// @desc    To create new election
// @access  Private
let bodySchema = joi.object({
	name: joi.string().required(),
	description: joi.string(),
	startTime: joi.date().required(),
	endTime: joi.date().required(),
	hostedBy: joi.string().required()
});
router.post('/', [auth, validator.body(bodySchema)], async (req, res) => {
	try {
		const { name, description, startTime, endTime } = req.body;
		const hostedBy = req.user.id;

		const election = new Election({
			name,
			description,
			startTime,
			endTime,
			// createdAt: new Date(),
			hostedBy
		});

		// TODO: Check if the image is sent by the user and then make the upload API call
		await cloudinary.uploader.upload(
			'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxG4fcxkoA5hMBcAc5ltcfh3bgR2HoQQ9Ygc7QrpU64EgdVzW6',
			(err, res) => {
				if (err) {
					console.log(err);
				} else {
					election.imageURL = res.url;
				}
			}
		);

		await election.save();
		return res.send(election);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route	GET /api/elections?status={ completed, ongoing, future, all }
// @desc	List of all future elections
// @access	Public
router.get('/', async (req, res) => {
	try {
		let electionList = await Election.find();
		const status = req.query.status;
		const now = new Date();

		if (status == 'all') {
			// Do nothing, return list of all elections
		} else if (status == 'completed') {
			electionList = electionList.filter((election) => {
				return election.endTime < now;
			});
		} else if (status == 'ongoing') {
			electionList = electionList.filter((election) => {
				return election.startTime < now && election.endTime > now;
			});
		} else if (status == 'future') {
			electionList = electionList.filter((election) => {
				return election.startTime > now;
			});
		} else {
			return res.status(400).send({
				msg:
					'Status has to be mentioned and can only be one of { completed, ongoing, future }'
			});
		}

		return res.send(electionList);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route	GET /api/elections/:electionId
// @desc	Get details of an election
// @access	Private
router.get('/:electionId', auth, async (req, res) => {
	try {
		const electionId = req.params.electionId;
		if (!electionId) {
			return res.status(400).send({ msg: 'Election ID required' });
		}

		const election = await Election.findById(electionId);
		if (!election) {
			return res.status(404).send({ msg: 'Election not found' });
		} else if (election.hostedBy.toString() !== req.user.id) {
			return res.status(401).send({ msg: 'User not authorized' });
		}

		return res.send(election);
	} catch (error) {
		if (error.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Election not found' });
		}
		console.log(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route	DELETE /api/elections/:electionId
// @desc	Delete an election
// @access	Private
router.delete('/:electionId', auth, async (req, res) => {
	try {
		const electionId = req.params.electionId;
		if (!electionId) {
			return res.status(400).send({ msg: 'Election ID required' });
		}

		const election = await Election.findById(electionId);
		if (!election) {
			return res.status(404).send({ msg: 'Election not found' });
		} else if (election.hostedBy.toString() !== req.user.id) {
			return res.status(401).send({ msg: 'User not authorized' });
		}

		await election.remove();
		return res.send({ msg: 'Election deleted' });
	} catch (error) {
		if (error.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Election not found' });
		}
		console.log(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route	GET	/api/elections/:electionId/candidates
// @desc	Get candidates of an election
// @access	Private
router.get('/:electionId/candidates', auth, async (req, res) => {
	try {
		const electionId = req.params.electionId;
		if (!electionId) {
			return res.status(400).send({ msg: 'Election ID required' });
		}

		const election = await Election.findById(electionId);
		if (!election) {
			return res.status(404).send({ msg: 'Election not found' });
		} else if (election.hostedBy.toString() !== req.user.id) {
			return res.status(401).send({ msg: 'User not authorized' });
		}

		// TODO: return candidates of an election
	} catch (error) {
		if (error.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Election not found' });
		}
		console.log(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route	POST /api/elections/:electionId/candidates
// @desc	Add candidates to an election
// @access	Private
bodySchema = joi.object({
	name: joi.string().required(),
	promises: joi.string(),
	gender: joi.string().required()
});
router.post(
	'/:electionId/candidates',
	[auth, validator.body(bodySchema)],
	async (req, res) => {
		try {
			const electionId = req.params.electionId;
			if (!electionId) {
				return res.status(400).send({ msg: 'Election ID required' });
			}

			const election = await Election.findById(electionId);
			if (!election) {
				return res.status(404).send({ msg: 'Election not found' });
			} else if (election.hostedBy.toString() !== req.user.id) {
				return res.status(401).send({ msg: 'User not authorized' });
			}

			const { name, promises, gender } = req.body;
			const candidates = {
				name,
				promises,
				gender
			};

			// TODO: Check if the image is sent by the user and then make the upload API call
			await cloudinary.uploader.upload(
				'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxG4fcxkoA5hMBcAc5ltcfh3bgR2HoQQ9Ygc7QrpU64EgdVzW6',
				(err, res) => {
					if (err) {
						console.log(err);
					} else {
						candidates.imageURL = res.url;
					}
				}
			);
			election.candidates = candidates;
			await election.save();

			return res.status(200).send();
		} catch (error) {
			if (error.kind === 'ObjectId') {
				return res.status(404).send({ msg: 'Election not found' });
			}
			console.log(error.message);
			return res.status(500).send({ msg: 'Server Error!' });
		}
	}
);

module.exports = router;
