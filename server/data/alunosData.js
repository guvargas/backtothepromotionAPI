const database = require("../infra/database");
exports.saveAluno = function (aluno) {
  return database.one(
    "insert into tb_aluno (matricula,nome,senha) values ($1, $2, $3) returning *",
    [aluno.matricula, aluno.nome, aluno.senha]
  );
};
exports.getAlunoByMatricula = function (aluno) {
  return database.oneOrNone(
    "select * from tb_aluno where matricula = $1",
    [aluno]
  );
};