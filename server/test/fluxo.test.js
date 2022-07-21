const crypto = require("crypto");
const axios = require("axios");
require('dotenv').config();
const deleteService = require("../service/deleteService");

const gerador = require("../helper/gerador");

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

test("Should save a player and a fluxo and associate the two", async function () {
  const player = gerador.generatePlayer();
  const responsePlayer = await request(`${process.env.URL_DEFAULT}/player`, "post", player);
  expect(responsePlayer.status).toBe(201);
  const data = gerador.generateFluxo();
  const respostaFluxo = await request(
    `${process.env.URL_DEFAULT}/fluxo/${responsePlayer.data.id_player}`,
    "post",
    data
  );
  expect(respostaFluxo.status).toBe(201);
  const response = respostaFluxo.data;
  expect(response.id_player).toBe(response.id_player);
  // const response = await request("http://localhost:8000/associa", "post", data);
  //depois deletar

  await deleteService.delete(responsePlayer.data.id_player);
});

