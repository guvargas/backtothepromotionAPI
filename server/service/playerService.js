const playerData = require("../data/playerData.js");

exports.savePlayer = async function (aluno) {
 // const existingAluno = await alunosData.getPlayerBy(aluno.matricula);
 // if (existingAluno) throw new Error("Aluno already exists");
  return playerData.savePlayer(aluno);
};

/*
  id_player serial not null PRIMARY KEY,
    posicao varchar(255),
    volume_falas varchar(255),
    volume_ambiente varchar(255),
    cena_salva varchar(255)
    */
