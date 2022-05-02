const database = require("../infra/database");
exports.savePlayer = function (player) {
  return database.one(
    "insert into tb_player (posicao,volume_falas,volume_ambiente,cena_salva) values ($1, $2, $3,$4) returning *",
    [player.posicao, player.volume_falas, player.volume_ambiente, player.cena_salva]
  );
};


/*
  id_player serial not null PRIMARY KEY,
    posicao varchar(255),
    volume_falas varchar(255),
    volume_ambiente varchar(255),
    cena_salva varchar(255)
    */