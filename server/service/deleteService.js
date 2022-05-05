const deleteData = require("../data/deleteData.js");

exports.delete = async function (data) {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");
  return deleteData.delete(data);
};