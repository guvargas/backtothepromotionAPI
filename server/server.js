const express = require('express');
const app = express();require('dotenv').config();

require('dotenv').config();

app.use(express.json());

app.use('/posts', require('./route/postsRoute'));
app.use('/falas_salvas', require('./route/falas_salvasRoute'));
app.use('/alunos', require('./route/alunosRoute'));
app.use('/players', require('./route/playerRoute'));
app.use('/associacao', require('./route/associacaoRoute'));
app.use('/clicks', require('./route/clickRoute'));
app.use('/escolhas_minigame', require('./route/escolha_minigameRoute'));
app.use('/fluxos', require('./route/fluxoRoute'));

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
