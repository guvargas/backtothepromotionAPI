const database = require("../infra/database");
exports.saveClick = function (data) {
  return database.one(
    "insert into tb_clicks (objeto) values ($1) returning *",
    [
      data.objeto,
    ]
  );
};

exports.getClicks = function () {
  return database.many(
    " select * from associacao_player_aluno apl INNER JOIN associacao_player_clicks apf ON apl.id_player = apf.id_player INNER JOIN tb_clicks tf ON tf.id_click = apf.id_click order by tf.horario;"
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
