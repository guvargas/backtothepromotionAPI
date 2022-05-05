const express = require("express");
const router = express.Router();
const escolha_minigameService = require("../service/escolha_minigameService");
const associacaoService = require("../service/associacaoService");

router.post("/escolha_minigame/:id_player", async function (req, res, next) {
  const data = req.body;
  try {
    const newData = await escolha_minigameService.saveEscolhaMinigame(data);
    const respostaFluxo = await associacaoService.associarPlayerEscolhaMinigame(
      req.params.id_player,
      newData.id_escolha_minigame
    );
    res.status(201).json(newData);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
