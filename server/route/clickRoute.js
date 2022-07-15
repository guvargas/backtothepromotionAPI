const express = require("express");
const router = express.Router();
const clickService = require("../service/clickService");
const associacaoService = require("../service/associacaoService");

router.post("/:id_player", async function (req, res, next) {
  const data = req.body;
  //	console.log(req.body);
  try {
    const newData = await clickService.saveClick(data);
    const response = await associacaoService.associarPlayerClick(
      req.params.id_player,
      newData.id_click
    );
    res.status(201).json(newData);
  } catch (e) {
    next(e);
  }
});


router.get('/showall', async function (req, res, next) {
	
	const data = req.body;
	try {
		const newData = await clickService.getClicks();
		res.status(201).json(newData);
	} catch (e) {
		next(e);
	}
});


router.get('/filter', async function (req, res, next) {
	const data = req.body;
	try {
		const newData = await clickService.filter(data);
		console.log(newData);
		res.status(200).json(newData);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
