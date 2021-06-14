const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
// Import Routes
const postRoute = require('./routes/posts');

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 8000;

const DB_CONNECTION = process.env.DB_CONNECTION.replace(
	'<password>',
	process.env.DB_PASSWORD
);

// Connect to DB
mongoose.connect(
	DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log('ERROR OCCURED:' + err);
		} else {
			console.log('DB Connection Succesful');
		}
	}
);

app.use('/posts', postRoute);

app.use('/', (req, res) => {
	res.send('HOME');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
