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
