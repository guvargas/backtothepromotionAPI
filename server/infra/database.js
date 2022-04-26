const pgp = require('pg-promise')();
const db = pgp({
	user: 'postgres',
	password: '1234',
	host: 'localhost',
	port: 5432,
	database: 'testevarguitas'
});

module.exports = db;
