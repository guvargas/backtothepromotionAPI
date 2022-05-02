const database = require("../infra/database");
exports.associarPlayerAluno = function (id_player, id_aluno) {
  return database.one(
    "insert into associacao_player_aluno (id_player,id_aluno) values ($1, $2) returning *",
    [id_player, id_aluno]
  );
};
