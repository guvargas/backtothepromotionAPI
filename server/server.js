const express = require('express');
const app = express();require('dotenv').config();

require('dotenv').config();

app.use(express.json());

app.use('/', require('./route/postsRoute'));
app.use('/', require('./route/falas_salvasRoute'));
app.use('/', require('./route/alunosRoute'));
app.use('/', require('./route/playerRoute'));
app.use('/', require('./route/associacaoRoute'));
app.use('/', require('./route/clickRoute'));
app.use('/', require('./route/escolha_minigameRoute'));
app.use('/', require('./route/fluxoRoute'));

app.use(function (error, req, res, next) {
	if (error.message === 'Post already exists') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'Post not found') {
		return res.status(404).send(error.message);
	}
	res.status(500).send(error.message);
});

app.listen(process.env.PORTA);
