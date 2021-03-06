const crypto = require("crypto");
const axios = require("axios");
const deleteService = require("../service/deleteService");
require('dotenv').config();

const gerador = require("../helper/gerador");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
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

test("Should save a player and a fala and associate the two", async function () {
  const player = gerador.generatePlayer();
  const responsePlayer = await request(
   `${process.env.URL_DEFAULT}/player`,
    "post",
    player
  );
  expect(responsePlayer.status).toBe(201);
  const data = gerador.generateFala_salva();
  const response = await request(
    `${process.env.URL_DEFAULT}/falas_salvas/${responsePlayer.data.id_player}`,
    "post",
    data
  );
  expect(response.status).toBe(201);
  const fala_salva = response.data;
  expect(fala_salva.texto).toBe(data.texto);
  expect(fala_salva.categoria).toBe(data.categoria);
  expect(fala_salva.identificador_original).toBe(data.identificador_original);
  //depois deletar
  await deleteService.delete(responsePlayer.data.id_player);
});
