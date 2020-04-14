const nodemailer = require('nodemailer');

async function mailer(electionName, voterName, voterEmail, voterPassword) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		auth: {
			user: 'info.votemaadi@gmail.com',
			pass: 'Votemaadi@123'
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Vote Maadi" <info.votemaadi@gmail.com>',
		to: `${voterEmail}`,
		subject: `${electionName} on VoteMaadi`,
		// text: 'Hello world?', // plain text body
		html: `Hi ${voterName}, you've been added to <b> ${electionName} </b> which is hosted on VoteMaadi
			<br> Here are your credentials which you can use to login and vote,
			<br> Email: ${voterEmail}
			<br> Password: ${voterPassword}

			<br><br>
			<p> <b>VoteMaadi</b> is an online election voting application, where anybody can host their elections</p>
		`
	});
}

module.exports = mailer;
