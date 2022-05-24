const express = require('express');
const router = express.Router();
const fluxoService = require('../service/fluxoService');
const associacaoService = require('../service/associacaoService');

router.post('/fluxo/:id_player', async function (req, res, next) {
	const data = req.body;
	try {
		const newData = await fluxoService.saveFluxo(data);
		const respostaFluxo = await associacaoService.associarPlayerFluxo(req.params.id_player,newData.id_fluxo);
		res.status(201).json(respostaFluxo);
	} catch (e) {
		next(e);
	}
});

router.get('/fluxos/showall', async function (req, res, next) {
	
	const data = req.body;
	try {
		const newData = await fluxoService.getFluxos();
		res.status(201).json(newData);
	} catch (e) {
		next(e);
	}
});


module.exports = router;