const express = require('express');
const router = express.Router();
const fluxoService = require('../service/fluxoService');


router.post('/fluxo', async function (req, res, next) {
	const data = req.body;
	try {
		const newData = await fluxoService.saveFluxo(data);
		res.status(201).json(newData);
	} catch (e) {
		next(e);
	}
});


module.exports = router;