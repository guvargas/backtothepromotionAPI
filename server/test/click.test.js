require('dotenv').config();
const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/escolha_minigameService");
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

test("Should save a player and a click and associate the two", async function () {
  const player = gerador.generatePlayer();
  const responsePlayer = await request(`${process.env.URL_DEFAULT}/player`, "post", player);
 // console.log(responsePlayer.data);
  expect(responsePlayer.status).toBe(201);

  const data = gerador.generateClick();
  const respostaClick = await request(
    `${process.env.URL_DEFAULT}/click/${responsePlayer.data.id_player}`,
    "post",
    data
  );
  //console.log(respostaClick.data);
  expect(respostaClick.status).toBe(201);
  expect(respostaClick.data.objeto).toBe(data.objeto);
  //depois deletar

  //await deleteService.delete(responsePlayer.data.id_player);
});
const deleteService = require("../service/deleteService");
