const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/falas_salvasService");

const gerador = require('../helper/gerador');

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

test("Should save a fala", async function () {
  const data = gerador.generateFala_salva();
  const response = await request("http://localhost:8000/falas_salvas", "post", data);
  console.log(response.data);
  expect(response.status).toBe(201);
  const fala_salva = response.data;
  expect(fala_salva.texto).toBe(data.texto);
  expect(fala_salva.categoria).toBe(data.categoria);
  expect(fala_salva.identificador_original).toBe(data.identificador_original);
 //depois deletar
  //await postsService.deletePost(post.id);
});

