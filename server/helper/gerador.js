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

this.generateFala_salva = function () {
  return (data = {
    texto: generate(),
    categoria: generate(),
    idSingleLine: generate(),
  });
};
