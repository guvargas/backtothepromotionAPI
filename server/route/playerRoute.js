const express = require('express');
const router = express.Router();
const playerService = require('../service/playerService');


router.post('/player', async function (req, res, next) {
	const player = req.body;
	try {
		const newPlayer = await playerService.savePlayer(player);
		res.status(201).json(newPlayer);
	} catch (e) {
		next(e);
	}
});


module.exports = router;