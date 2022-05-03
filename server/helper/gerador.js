const crypto = require("crypto");
const axios = require("axios");
const { func } = require("../infra/database");

const generate = function () {
  return crypto.randomBytes(6).toString("hex");
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

this.generateAluno = function () {
  return (data = {
    matricula: generate(),
    nome: generate(),
    senha: generate(),
  });
};

this.generatePlayer = function () {
  return (data = {
    posicao: generate(),
    volume_falas: generate(),
    volume_ambiente: generate(),
    cena_salva: generate(),
  });
};

this.generateClick = function () {
  return (data = {
    objeto: generate(),
  });
};


this.generateFluxo = function () {
  return (data = {
    identificador_original: generate(),
  });
};



this.generateFala_salva = function () {
  return (data = {
    texto: generate(),
    categoria: generate(),
    identificador_original: generate(),
  });
};

this.generateEscolhaMinigame = function () {
  let meudeus = true;
  if (Math.round(Math.random()) ==0 ) {
    meudeus = false;
  }

  return (data = {
    esta_certo: meudeus,
    texto: generate(),
    identificador_original: generate(),
    botao_clicado: generate(),
  });
};

/*
CREATE TABLE IF NOT EXISTS tb_falas_salvas(
    id_fala serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    texto varchar(255),
    categoria varchar(255),
    horario varchar(255)
);
*/
