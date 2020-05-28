// /**
//  * @jest-environment node
//  */
var request = require('axios');

var req1 = {
	method: 'POST',
	url: 'http://localhost:5000/api/users/signup',
	headers: {
		'content-type': 'application/json'
	},
	data: {
		name: 'John Doe',
		password: '12345678',
		email: 'johndoe@gmail.com',
		type: 'Admin'
	}
};

var req2 = {
	method: 'post',
	url: 'http://localhost:5000/api/users/signup',
	headers: {
		'content-type': 'application/json'
	},
	data: {
		name: 'John Doe',
		password: '12345678',
		email: 'johndoe69@gmail.com',
		type: 'Admin'
	},
	json: true
};

main = async () => {
	// try {
	const res = await request(req2);
	// } catch (error) {
	// 	console.log(error);
	// }
	// console.log(res);
};
main();
