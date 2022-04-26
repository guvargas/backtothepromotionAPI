const database = require("../infra/database");
exports.saveFala = function (fala) {
  return database.one(
    "insert into jogo.tb_falas_salvas (idSingleLine,texto, categoria) values ($1, $2, $3) returning *",
    [fala.idSingleLine, fala.texto, fala.categoria]
  );
};
exports.getFalaByID = function (fala) {
  return database.oneOrNone(
    "select * from jogo.tb_falas_salvas where idSingleLine = $1",
    [fala]
  );
};
