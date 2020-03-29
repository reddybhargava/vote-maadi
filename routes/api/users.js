const express = require('express');
const router = express.Router();
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const validator = require('express-joi-validation').createValidator({});

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/users
// @desc    Gets the user info from the database, requires the JWT token
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		return res.send(user);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route   POST api/users/signup
// @desc    Register user as admin or voter
// @access  Public
let bodySchema = joi.object({
	name: joi.string().required(),
	email: joi
		.string()
		.email()
		.required(),
	password: joi
		.string()
		.required()
		.min(8),
	type: joi.equal('Admin', 'Voter').required()
});

router.post('/signup', validator.body(bodySchema), async (req, res) => {
	const { name, email, password, type } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.send({ errors: [{ msg: 'User already exists!' }] });
		}

		user = new User({
			name,
			email,
			password,
			type
		});

		// encrypt the password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		// save the user to the database
		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		};
		const jwtSecret = config.get('jwtSecret');

		// expiresIn should be changed
		// create a JWT token and send it in the response
		jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
			if (err) throw err;
			return res.send({ token });
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

// @route   POST api/users/signin
// @desc    Authenticate user and get token
// @access  Public
bodySchema = joi.object({
	email: joi
		.string()
		.email()
		.required(),
	password: joi
		.string()
		.required()
		.min(8)
});
router.post('/signin', validator.body(bodySchema), async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.send({ errors: [{ msg: 'Invalid credentials' }] });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.send({ errors: [{ msg: 'Invalid credentials' }] });
		}

		const payload = {
			user: {
				id: user.id
			}
		};
		const jwtSecret = config.get('jwtSecret');

		// TODO: expiresIn should be changed
		// create a JWT token and send it in the response
		jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
			if (err) throw err;
			return res.send({ token });
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).send({ msg: 'Server Error!' });
	}
});

module.exports = router;
