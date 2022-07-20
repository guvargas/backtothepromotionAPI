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
exports.filter = function (data) {
  //console.log(data);
  return database.many("select apl.id_player,apl.id_aluno,tf.objeto,tf.horario from associacao_player_aluno apl INNER JOIN associacao_player_clicks apf ON apl.id_player = apf.id_player INNER JOIN tb_clicks tf ON tf.id_click = apf.id_click  where tf.horario between '2022/05/18 19:00' and '2022/05/18 22:00' and tf.objeto IN ('Porta', 'WhiteFoot') and apl.id_aluno IN (2,6,18,38,37,36,27,29,1,35,13) order by tf.horario;");
};
*/



exports.filterRaw = async function (data) {
  console.log(data);
  return database.many("select apl.id_player, " +
    "apl.id_aluno, " +
    "tf.objeto, " +
    "tf.horario " +
    "from associacao_player_aluno apl   " +
    "INNER JOIN associacao_player_clicks apf ON apl.id_player = apf.id_player " +
    "INNER JOIN tb_clicks tf ON tf.id_click = apf.id_click " +
    "where tf.horario between ($1) and ($2) " +
    "and tf.objeto IN ('" + data.filter.join("','") + "')" +
    "and apl.id_aluno IN (" + data.student.join(",") + ")" +
    "   group by apl.id_player,apl.id_aluno,tf.objeto,tf.horario  order by tf.horario",
    [
      data.initialDate, data.finalDate
    ]);
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
