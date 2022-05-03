const clickData = require("../data/clickData.js");

exports.saveClick = async function (data) {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");
  return clickData.saveClick(data);
};

/*
id_aluno serial not null PRIMARY KEY,
matricula varchar(255) UNIQUE,
nome varchar(255),
senha varchar(255)
*/
