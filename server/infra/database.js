require('dotenv').config();
const pgp = require('pg-promise')();
const db = pgp({
	user: process.env.POSTGRESS_USER,
	password: process.env.POSTGRESS_PASSWORD,
	host: process.env.POSTGRESS_HOST,
	port: process.env.POSTGRESS_PORT,
	database: process.env.POSTGRESS_DATABASE,
});

module.exports = db;

