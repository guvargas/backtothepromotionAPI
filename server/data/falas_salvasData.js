const database = require("../infra/database");
exports.saveFala = function (fala) {
  return database.one(
    "insert into tb_falas_salvas (identificador_original,texto, categoria) values ($1, $2, $3) returning *",
    [fala.identificador_original, fala.texto, fala.categoria]
  );
};
exports.getFalaByID = function (fala) {
  return database.oneOrNone(
    "select * from tb_falas_salvas where idSingleLine = $1",
    [fala]
  );
};
exports.getFalas = function () {
  return database.many(
    "SELECT  ta.matricula, ta.nome, apfs.id_player, tfs.categoria, tfs.identificador_original, tfs.horario      FROM tb_aluno ta    INNER JOIN associacao_player_aluno apl    ON ta.id_aluno = apl.id_aluno    INNER JOIN associacao_player_falas_salvas apfs    ON apl.id_player = apfs.id_player    INNER JOIN tb_falas_salvas tfs     ON tfs.id_fala = apfs.id_fala;"
  );
};
