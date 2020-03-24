const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from the header
	const token = req.header('x-auth-token');

	// Check if token present
	if (!token) {
		return res.send(401).json({ msg: 'No token, authorization denied!' });
	}

	// Verify token
	try {
		const jwtSecret = config.get('jwtSecret');
		const decoded = jwt.verify(token, jwtSecret);

		req.user = decoded.user;
		next();
	} catch (error) {
		return res.status(401).json({ msg: 'Token is not valid' });
	}
};
