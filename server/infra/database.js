const pgp = require('pg-promise')();
const db = pgp({
	user: 'postgres',
	password: '1234',
	host: 'localhost',
	port: 5432,
	database: 'Back_to_the_promotion'
});

module.exports = db;
