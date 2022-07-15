const { response } = require("express");
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

exports.getClicks = async function () {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");

  return clickData.getClicks();
};



exports.filter = async function (data) {
  if (data.student != null && data.initialDate != null && data.finalDate != null && data.filter != null) {

    //regex anti sql injection
    
    //pega a data, le, e cria o -> de caminhamento de um pro outro pra cada player
    // just do id copilot
    return clickData.filter(data);
  }
  //aqui ele trata a resposta

};


