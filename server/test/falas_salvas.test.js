const crypto = require("crypto");
const axios = require("axios");
const postsService = require("../service/falas_salvasService");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

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
  const data = {
    texto: generate(),
    categoria: generate(),
    idSingleLine: generate(),
  };
  const response = await request("http://localhost:3000/falas_salvas", "post", data);
  expect(response.status).toBe(201);
  const fala_salva = response.data;
  expect(fala_salva.texto).toBe(data.texto);
  expect(fala_salva.categoria).toBe(data.categoria);
  expect(fala_salva.idSingleLine).toBe(data.idsingleline);
 //depois deletar
  //await postsService.deletePost(post.id);
});
