const express = require('express');
const router = express.Router();
const clickService = require('../service/clickService');


router.post('/click', async function (req, res, next) {
	const data = req.body;
	try {
		const newData = await clickService.saveClick(data);
		res.status(201).json(newData);
	} catch (e) {
		next(e);
	}
});


module.exports = router;