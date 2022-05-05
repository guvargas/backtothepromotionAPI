const alunosData = require("../data/alunosData.js");

exports.saveAluno = async function (aluno) {
  const existingAluno = await alunosData.getAlunoByMatricula(aluno.matricula);
  if (existingAluno) throw new Error("Aluno already exists");
  return alunosData.saveAluno(aluno);
};

exports.getAluno = async function (aluno) {
  return alunosData.getAlunoByMatricula(aluno);
};



/*
id_aluno serial not null PRIMARY KEY,
    matricula varchar(255) UNIQUE,
    nome varchar(255),
    senha varchar(255)
    */
