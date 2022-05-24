const database = require("../infra/database");
exports.saveFluxo = function (data) {
  return database.one(
    "insert into tb_fluxo (identificador_original) values ($1) returning *",
    [
      data.identificador_original,
    ]
  );
};

exports.getFluxos = function () {
  return database.many(
    " select id_aluno, identificador_original, horario from associacao_player_aluno apl"+
    " INNER JOIN associacao_player_fluxo apf"+
    " ON apl.id_player = apf.id_player"+
    " INNER JOIN tb_fluxo tf"+
    " ON tf.id_fluxo = apf.id_fluxo"+
    " where apl.id_aluno != 38"+
    " order by tf.horario;"
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
