const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/escolha_minigameService");
require('dotenv').config();

const gerador = require('../helper/gerador');

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

/*
CREATE TABLE IF NOT EXISTS tb_escolha_minigame(
    id_escolha_minigame serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    texto varchar(255),
    esta_certo BIT,
    botao_clicado varchar(255),
    horario  TIMESTAMPTZ DEFAULT Now() 
);
*/

test("Should save a player and a escolha minigame and associate the two", async function () {
  const player = gerador.generatePlayer();
  const responsePlayer = await request(`${process.env.URL_DEFAULT}/player`, "post", player);
  expect(responsePlayer.status).toBe(201);
  const data = gerador.generateEscolhaMinigame();
  const response = await request(`${process.env.URL_DEFAULT}/escolha_minigame/${responsePlayer.data.id_player}`, "post", data);
  
 // console.log(response.data);
  
  expect(response.status).toBe(201);
  const escolha_salva = response.data;
  expect(escolha_salva.texto).toBe(data.texto);
  expect(escolha_salva.botao_clicado).toBe(data.botao_clicado);
  expect(escolha_salva.identificador_original).toBe(data.identificador_original);
 //depois deletar

 await deleteService.delete(responsePlayer.data.id_player);
});
const deleteService = require("../service/deleteService");

