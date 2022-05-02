const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/falas_salvasService");

const gerador = require('../helper/gerador');

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

/*
 idFalaSalva text primary key,
    texto text not null,
    categoria text not null,
    data timestamp default now()
*/

test("Should save a fala", async function () {
  const data = gerador.generateFala_salva();
  const response = await request("http://localhost:8000/falas_salvas", "post", data);
  console.log(response.data);
  expect(response.status).toBe(201);
  const fala_salva = response.data;
  expect(fala_salva.texto).toBe(data.texto);
  expect(fala_salva.categoria).toBe(data.categoria);
  expect(fala_salva.idSingleLine).toBe(data.idsingleline);
 //depois deletar
  //await postsService.deletePost(post.id);
});
