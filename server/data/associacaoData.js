const database = require("../infra/database");
exports.associarPlayerAluno = function (id_player, id_aluno) {
  return database.one(
    "insert into associacao_player_aluno (id_player,id_aluno) values ($1, $2) returning *",
    [id_player, id_aluno]
  );
};

exports.associarPlayerClick = function (id_player, id_click) {
  return database.one(
    "insert into associacao_player_clicks (id_player,id_click) values ($1, $2) returning *",
    [id_player, id_click]
  );
};

exports.associarPlayerFluxo = function (id_player, id_fluxo) {
  return database.one(
    "insert into associacao_player_fluxo (id_player,id_fluxo) values ($1, $2) returning *",
    [id_player, id_fluxo]
  );
};