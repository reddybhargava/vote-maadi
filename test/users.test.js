const axios = require('axios');

const req1 = {
	method: 'POST',
	url: 'http://localhost:5000/api/users/signup',
	headers: {
		'content-type': 'application/json'
	},
	data: {
		name: 'John Doe',
		password: '12345678',
		email: 'johndoe99@gmail.com',
		type: 'Admin'
	}
};

const req2 = {
	method: 'POST',
	url: 'http://localhost:5000/api/users/signup',
	headers: {
		'content-type': 'application/json'
	},
	data: {
		name: 'John Doe',
		password: '12345678',
		email: Date.now().toString() + '@gmail.com',
		type: 'Admin'
	}
};

const req3 = {
	method: 'POST',
	url: 'http://localhost:5000/api/users/signin',
	headers: {
		'content-type': 'application/json'
	},
	data: {
		email: 'johndoe@gmail.com',
		password: '12345678'
	}
};

describe('\nUsers Module', () => {
	describe('\n\tSign Up', () => {
		test('Sign Up (existing user)', async () => {
			try {
				await axios(req1);
			} catch (error) {
				expect(error.response.status).toBe(400);
			}
		});

		test('Sign Up (new user)', async () => {
			expect(req2.data).toHaveProperty('name');
			expect(req2.data).toHaveProperty('email');
			expect(req2.data).toHaveProperty('password');
			expect(req2.data).toHaveProperty('type');

			const res = await axios(req2);

			expect(res.status).toBe(200);
			expect(res.data).toHaveProperty('token');
		});

		test('Sign Up (missing fields)', async () => {
			let req = req1;
			req.data.password = null;
			try {
				await axios(req);
			} catch (error) {
				expect(error.response.status).toBe(400);
			}
		});
	});

	describe('\n\tSign In', () => {
		test('Sign In (correct password)', async () => {
			expect(req3.data).toHaveProperty('email');
			expect(req3.data).toHaveProperty('password');
			const res = await axios(req3);

			expect(res.status).toBe(200);
			expect(res.data).toHaveProperty('token');
		});

		test('Sign In (wrong password)', async () => {
			req3.data.password = '87654321';
			try {
				expect(req3.data).toHaveProperty('email');
				expect(req3.data).toHaveProperty('password');

				await axios(req3);
			} catch (error) {
				expect(error.response.status).toBe(400);
			}
		});
	});
});
