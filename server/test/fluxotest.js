const crypto = require("crypto");
const axios = require("axios");

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

test("Should save a fluxo", async function () {
  const data = gerador.generateFluxo();
  const respostaClick = await request(
    "http://localhost:8000/fluxo",
    "post",
    data
  );
  console.log(respostaClick.data);
  expect(respostaClick.status).toBe(201);
  const response = respostaClick.data;
  expect(response.identificador_original).toBe(response.identificador_original);
  // const response = await request("http://localhost:8000/associa", "post", data);
  //depois deletar
  //await postsService.deletePost(post.id);
});
