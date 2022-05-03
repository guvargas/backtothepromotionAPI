const database = require("../infra/database");
exports.saveClick = function (data) {
  return database.one(
    "insert into tb_clicks (objeto) values ($1) returning *",
    [
      data.objeto,
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
