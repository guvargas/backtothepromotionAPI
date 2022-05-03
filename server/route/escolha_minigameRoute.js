const express = require('express');
const router = express.Router();
const escolha_minigameService = require('../service/escolha_minigameService');


router.post('/escolha_minigame', async function (req, res, next) {
	const data = req.body;
	try {
		const newAluno = await escolha_minigameService.saveEscolhaMinigame(data);
		res.status(201).json(newAluno);
	} catch (e) {
		next(e);
	}
});


module.exports = router;