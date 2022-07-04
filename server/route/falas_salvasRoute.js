const express = require('express');
const router = express.Router();
const falas_salvasService = require('../service/falas_salvasService');
const associacaoService = require("../service/associacaoService");


router.post('/:id_player', async function (req, res, next) {
	const fala = req.body;
	try {
		const newData = await falas_salvasService.saveFala(fala);
		const respostaFala = await associacaoService.associarPlayerFalaSalva(
			req.params.id_player,
			newData.id_fala
		  );
		res.status(201).json(newData);
	} catch (e) {
		console.log(e);
		next(e);
	}
});

router.get('/showall',async function(req, res,next){
	const data = req.body;
	try {
		const newData = await falas_salvasService.getFalas();
		res.status(201).json(newData);
	} catch (e) {
		next(e);
	}
});

module.exports = router;