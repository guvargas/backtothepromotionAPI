const escolha_minigameData = require("../data/escolha_minigameData.js");

exports.saveEscolhaMinigame = async function (data) {
 // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
 // if (existingAluno) throw new Error("Aluno already exists");
  return escolha_minigameData.saveEscolhaMinigame(data);
};

/*
id_aluno serial not null PRIMARY KEY,
    matricula varchar(255) UNIQUE,
    nome varchar(255),
    senha varchar(255)
    */
