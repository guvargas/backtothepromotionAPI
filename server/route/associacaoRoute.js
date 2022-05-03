const express = require('express');
const router = express.Router();
const associacaoService = require('../service/associacaoService');


router.post('/associar/player/:id_player/aluno/:id_aluno', async function (req, res, next) {
	try {
		const novaAssociacao = await associacaoService.associarPlayerAluno(req.params.id_player, req.params.id_aluno);
		res.status(201).json(novaAssociacao);
	} catch (e) {
		next(e);
	}
});

router.post('/associar/player/:id_player/click/:id_click', async function (req, res, next) {
	try {
		const novaAssociacao = await associacaoService.associarPlayerClick(req.params.id_player, req.params.id_click);
		res.status(201).json(novaAssociacao);
	} catch (e) {
		next(e);
	}
});


router.post('/associar/player/:id_player/fluxo/:id_fluxo', async function (req, res, next) {
	try {
		const novaAssociacao = await associacaoService.associarPlayerFluxo(req.params.id_player, req.params.id_fluxo);
		res.status(201).json(novaAssociacao);
	} catch (e) {
		next(e);
	}
});




module.exports = router;