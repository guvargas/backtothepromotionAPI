const associacaoData = require("../data/associacaoData.js");

exports.associarPlayerAluno = async function (id_player, id_aluno) {
  return associacaoData.associarPlayerAluno(id_player,id_aluno);
};

exports.associarPlayerClick = async function (id_player, id_click) {
  return associacaoData.associarPlayerClick(id_player,id_click);
};

exports.associarPlayerFalaSalva = async function (id_player, id_fala) {
  return associacaoData.associarPlayerFalaSalva(id_player,id_fala);
};
exports.associarPlayerFluxo = async function (id_player, id_fluxo) {
  return associacaoData.associarPlayerFluxo(id_player,id_fluxo);
};

exports.associarPlayerEscolhaMinigame = async function (id_player, id_escolha_minigame) {
  return associacaoData.associarPlayerEscolhaMinigame(id_player,id_escolha_minigame);
};

/*
id_aluno serial not null PRIMARY KEY,
    matricula varchar(255) UNIQUE,
    nome varchar(255),
    senha varchar(255)
    */
