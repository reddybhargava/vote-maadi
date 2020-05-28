const axios = require('axios');

const validToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVjZGMwZmRkY2NjZTYyYTYzMzZiZmU5In0sImlhdCI6MTU5MDU2MDY2MiwiZXhwIjoxNTk0MTYwNjYyfQ.3Kns9cMJ-NLeaLAYL-iOVv3cz5hKm1CGbQv2MVC24MI';
const validToken2 =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5MTU3NjJhYWVmOGYzMDM0MmNhOWMyIn0sImlhdCI6MTU5MDY1MzIyNiwiZXhwIjoxNTk0MjUzMjI2fQ.pSqtJoj9fAv2LGmvm3tIcUrX0EOVUEIAL49DsVIzopE';

const invalidToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5MTU3NjJhYWVmOGYzMDM0MmNhOWMyIn0sImlhdCI6MTU4NjU4MzM5NCwiZXhwIjoxNTkwMTgzMzk0fQ.m3w8PbRo7j7I2MCf6i2KldOHXzfQFUYl9Y_8CCz_aA0';

const req1 = {
	method: 'GET',
	url: 'http://localhost:5000/api/elections?status=future'
};

const req2 = {
	method: 'POST',
	url: 'http://localhost:5000/api/elections/',
	headers: {
		'x-auth-token': invalidToken
	},
	data: {
		image: undefined,
		name: 'Election 1',
		description: 'Test election',
		startTime: '2020-06-04',
		endTime: '2020-06-10'
	}
};

const req3 = {
	method: 'GET',
	url: 'http://localhost:5000/api/elections/5ecf4df821e9fc136590ed31',
	headers: {
		'x-auth-token': validToken
	}
};

const req4 = {
	method: 'POST',
	url:
		'http://localhost:5000/api/elections/5ecf4df821e9fc136590ed31/candidates',
	headers: {
		'x-auth-token': validToken
	},
	data: {
		name: 'Cand 1234',
		promises: 'I will be the greatest leader of all time',
		gender: 'Male',
		age: '25',
		image: undefined
	}
};

const req5 = {
	method: 'POST',
	url: 'http://localhost:5000/api/elections/5ecf4df821e9fc136590ed31/votes',
	headers: {
		'x-auth-token': validToken2,
		'content-type': 'application/json'
	},
	data: { candidateID: '5ecf519e21e9fc136590ed37' }
};

const req6 = {
	method: 'GET',
	url:
		'http://localhost:5000/api/elections/5ecf4df821e9fc136590ed31/votes/analytics',
	headers: {}
};

describe('\nElections Module', () => {
	describe('\n\tList Election', () => {
		test('List Elections (valid status)', async () => {
			const res = await axios(req1);

			expect(res.status).toBe(200);
			expect(res.data).toBeInstanceOf(Array);

			res.data.forEach((election) => {
				expect(election).toBeInstanceOf(Object);
				expect(election).toHaveProperty('_id');
				expect(election).toHaveProperty('name');
				expect(election).toHaveProperty('description');
				expect(election).toHaveProperty('imageURL');
				expect(election).toHaveProperty('startTime');
				expect(election).toHaveProperty('endTime');
				expect(election).toHaveProperty('candidates');
				expect(election.candidates).toBeInstanceOf(Array);
			});
		});

		test('List Elections (invalid status)', async () => {
			try {
				req1.url += 'abc';
				await axios(req1);
			} catch (error) {
				expect(error.response.status).toBe(400);
				// console.log(error.response.data);
			}
		});
	});

	describe('\n\tCreate Election', () => {
		test('Create Election (expired token)', async () => {
			try {
				const res = await axios(req2);
			} catch (error) {
				expect(error.response.status).toBe(401);
			}
		});

		test('Create Election (no token)', async () => {
			try {
				let req = req2;
				delete req.headers['x-auth-token'];

				const res = await axios(req2);
			} catch (error) {
				expect(error.response.status).toBe(401);
				// console.log(error.response.data);
			}
		});

		test('Create Election (valid token)', async () => {
			let req = req2;
			req.headers['x-auth-token'] = validToken;

			expect(req.data).toBeInstanceOf(Object);
			expect(req.data).toHaveProperty('name');
			expect(req.data).toHaveProperty('description');
			expect(req.data).toHaveProperty('image');
			expect(req.data).toHaveProperty('startTime');
			expect(req.data).toHaveProperty('endTime');

			const res = await axios(req);

			expect(res.status).toBe(200);
			expect(res.data).toBeInstanceOf(Object);
			expect(res.data).toHaveProperty('_id');
			expect(res.data).toHaveProperty('name');
			expect(res.data).toHaveProperty('description');
			expect(res.data).toHaveProperty('imageURL');
		});
	});

	describe('\n\tGet Election', () => {
		test('Get Election (valid election ID)', async () => {
			const res = await axios(req3);

			expect(res.status).toBe(200);

			expect(res.data).toBeInstanceOf(Object);
			expect(res.data).toHaveProperty('_id');
			expect(res.data).toHaveProperty('name');
			expect(res.data).toHaveProperty('description');
			expect(res.data).toHaveProperty('imageURL');
			expect(res.data).toHaveProperty('startTime');
			expect(res.data).toHaveProperty('endTime');
			expect(res.data).toHaveProperty('candidates');
			expect(res.data.candidates).toBeInstanceOf(Array);
		});

		test('Get Election (invalid election ID)', async () => {
			try {
				req3.url += 'abc';
				await axios(req3);
			} catch (error) {
				expect(error.response.status).toBe(404);
			}
		});
	});

	describe('\n\tAdd/Get Candidate Details', () => {
		test('Add Candidates', async () => {
			expect(req4.data).toBeInstanceOf(Object);
			expect(req4.data).toHaveProperty('name');
			expect(req4.data).toHaveProperty('promises');
			expect(req4.data).toHaveProperty('gender');
			expect(req4.data).toHaveProperty('age');

			const res = await axios(req4);

			expect(res.status).toBe(200);
		});

		test('Add Candidates (invalid token)', async () => {
			expect(req4.data).toBeInstanceOf(Object);
			expect(req4.data).toHaveProperty('name');
			expect(req4.data).toHaveProperty('promises');
			expect(req4.data).toHaveProperty('gender');
			expect(req4.data).toHaveProperty('age');

			try {
				req4.headers['x-auth-token'] = validToken2;
				const res = await axios(req4);
			} catch (error) {
				expect(error.response.status).toBe(401);
			}
		});

		test('Get Candidates', async () => {
			req4.method = 'GET';
			req4.headers['x-auth-token'] = validToken;
			delete req4.data;

			const res = await axios(req4);

			expect(res.status).toBe(200);
			expect(res.data).toBeInstanceOf(Array);

			res.data.forEach((election) => {
				expect(election).toBeInstanceOf(Object);
				expect(election).toHaveProperty('_id');
				expect(election).toHaveProperty('name');
				expect(election).toHaveProperty('age');
				expect(election).toHaveProperty('imageURL');
				expect(election).toHaveProperty('promises');
			});
		});
	});

	describe('\n\tSet/Get Candidate Votes', () => {
		test('Set Candidate Vote', async () => {
			expect(req5.data).toHaveProperty('candidateID');

			const res = await axios(req5);
			expect(res.status).toBe(200);
		});
		test('Get Candidate Vote', async () => {
			req5.method = 'GET';
			delete req5.data;

			const res = await axios(req5);

			expect(res.status).toBe(200);
			expect(res.data).toBeInstanceOf(Object);
			expect(res.data).toHaveProperty('electionName');
			expect(res.data).toHaveProperty('votes');

			expect(res.data.votes).toBeInstanceOf(Array);
			res.data.votes.forEach((vote) => {
				expect(vote).toHaveProperty('id');
				expect(vote).toHaveProperty('name');
				expect(vote).toHaveProperty('votes');
			});
		});
	});

	describe('\n\tGet Voter Details', () => {
		test('Get Vote Details for Analytics', async () => {
			const res = await axios(req6);

			expect(res.status).toBe(200);
			expect(res.data).toBeInstanceOf(Array);

			res.data.forEach((vote) => {
				expect(vote).toHaveProperty('electionId');
				expect(vote).toHaveProperty('candidateId');
				expect(vote).toHaveProperty('voterId');
				expect(vote).toHaveProperty('voterAge');
				expect(vote).toHaveProperty('voterGender');
				expect(vote).toHaveProperty('timestamp');
			});
		});
	});
});
