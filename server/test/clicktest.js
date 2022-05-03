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

test("Should save a escolha minigame", async function () {
  const data = gerador.generateClick();
  const respostaClick = await request(
    "http://localhost:8000/click",
    "post",
    data
  );
  console.log(respostaClick.data);
  expect(respostaClick.status).toBe(201);
  const fala_salva = respostaClick.data;
  expect(fala_salva.objeto).toBe(data.objeto);
  // const response = await request("http://localhost:8000/associa", "post", data);
  //depois deletar
  //await postsService.deletePost(post.id);
});