const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: '4d4EUUZMZY',
		database: 'smartbrain',
	},
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) =>
	register.handleRegister(req, res, db, bcrypt)
);

app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});

/*

/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
