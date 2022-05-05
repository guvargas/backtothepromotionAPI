const database = require("../infra/database");
exports.delete = function (data) {
  return database.none(
    "delete from associacao_player_clicks where id_player = $1; delete from associacao_player_falas_salvas where id_player = $1;  delete from associacao_player_escolha_minigame where id_player = $1; delete from associacao_player_aluno where id_player = $1; delete from associacao_player_fluxo where id_player = $1;  delete from associacao_player_escolha_minigame where id_player = $1; delete from associacao_player_aluno where id_player = $1; delete from tb_player where id_player = $1",
    [data]
  );
};
