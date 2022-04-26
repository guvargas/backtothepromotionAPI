const express = require('express');
const router = express.Router();
const falas_salvasService = require('../service/falas_salvasService');


router.post('/falas_salvas', async function (req, res, next) {
	const fala = req.body;
	try {
		const newFala = await falas_salvasService.saveFala(fala);
		res.status(201).json(newFala);
	} catch (e) {
		next(e);
	}
});


module.exports = router;