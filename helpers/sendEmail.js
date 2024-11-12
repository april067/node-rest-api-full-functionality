const postmark = require('postmark');

const { POSTMARK_SERVER_API_TOKEN } = process.env;

const client = new postmark.ServerClient(POSTMARK_SERVER_API_TOKEN);

// const email = {
// 	From: 'ikerking@meta.ua',
// 	To: 'ikerking@meta.ua',
// 	Subject: 'Hello from Postmark',
// 	HtmlBody: '<strong>Hello</strong> dear Postmark user.',
// 	TextBody: 'Hello from Postmark!',
// 	MessageStream: 'broadcast',
// };

// client
// 	.sendEmail(email)
// 	.then(() => console.log('Email sent successful'))
// 	.catch((err) => console.log(err.message));

const sendEmail = async (data) => {
	const email = {
		...data,
		From: 'ikerking@meta.ua',
		MessageStream: 'broadcast',
	};

	await client.sendEmail(email);
	console.log('Email sent successful');
	return true;
};

module.exports = sendEmail;
