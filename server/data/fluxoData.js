const database = require("../infra/database");
exports.saveFluxo = function (data) {
  return database.one(
    "insert into tb_fluxo (identificador_original) values ($1) returning *",
    [
      data.identificador_original,
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
