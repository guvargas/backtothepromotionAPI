const crypto = require("crypto");
const axios = require("axios");
const alunosService = require("../service/alunosService");
const { log } = require("console");
const gerador = require('../helper/gerador');



const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};



test("Should save an aluno", async function () {
  const data=gerador.generateAluno();
  const response = await request("http://localhost:8000/alunos", "post", data);
 
  expect(response.status).toBe(201);

 
  const fala_salva = response.data;
  expect(fala_salva.matricula).toBe(data.matricula);
  expect(fala_salva.nome).toBe(data.nome);
  expect(fala_salva.senha).toBe(data.senha);
  
 //depois deletar
  //await postsService.deletePost(post.id);
});
