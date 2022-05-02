const associacaoData = require("../data/associacaoData.js");

exports.associarPlayerAluno = async function (id_player, id_aluno) {
  return associacaoData.associarPlayerAluno(id_player,id_aluno);
};

/*
id_aluno serial not null PRIMARY KEY,
    matricula varchar(255) UNIQUE,
    nome varchar(255),
    senha varchar(255)
    */
