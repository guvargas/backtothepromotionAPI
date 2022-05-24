const fluxoData = require("../data/fluxoData.js");
const associacaoData = require("../data/associacaoData.js");



exports.saveFluxo = async function (data) {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");

  return fluxoData.saveFluxo(data);
};


exports.getFluxos = async function () {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");

  return fluxoData.getFluxos();
};





/*
id_aluno serial not null PRIMARY KEY,
matricula varchar(255) UNIQUE,
nome varchar(255),
senha varchar(255)
*/
