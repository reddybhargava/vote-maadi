const express = require('express');
const router = express.Router();
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const validator = require('express-joi-validation').createValidator({});

const User = require('../../models/User');

module.exports = router;
