const express = require("express");
const router = express.Router();
const playerService = require("../service/playerService");
const associacaoService = require("../service/associacaoService");

router.post("/player/:id_aluno", async function (req, res, next) {
  const player = req.body;
  try {
    const newPlayer = await playerService.savePlayer(player);
    const response = await associacaoService.associarPlayerAluno(
		newData.id_player,
		req.params.id_aluno
    );
    res.status(201).json(newPlayer);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
