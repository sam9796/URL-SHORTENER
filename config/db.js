const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
	try {mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected....');
	} catch (e) {
		console.log(e);
		console.log('Refused to Connect');
	}
};
