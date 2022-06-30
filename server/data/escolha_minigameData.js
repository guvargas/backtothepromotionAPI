const database = require("../infra/database");
exports.saveEscolhaMinigame = function (data) {
  return database.one(
    "insert into tb_escolha_minigame (identificador_original,texto,esta_certo,botao_clicado) values ($1, $2, $3,$4) returning *",
    [
      data.identificador_original,
      data.texto,
      data.esta_certo,
      data.botao_clicado,
    ]
  );
};

exports.getEscolhas = function () {
  return database.manyOrNone(
    "SELECT tem.horario, tem.identificador_original, tem.esta_certo, tem.texto, tem.botao_clicado, (SELECT apl.id_aluno FROM associacao_player_aluno apl WHERE apl.id_player = apem.id_player ) FROM associacao_player_escolha_minigame apem INNER JOIN tb_escolha_minigame tem ON apem.id_escolha_minigame = tem.id_escolha_minigame;"
    );
};


/*
CREATE TABLE IF NOT EXISTS tb_escolha_minigame(
    id_escolha_minigame serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    texto varchar(255),
    esta_certo BIT,
    botao_clicado varchar(255),
    horario  TIMESTAMPTZ DEFAULT Now() 
);
    */
