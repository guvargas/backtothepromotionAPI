const crypto = require("crypto");
const axios = require("axios");
const alunosService = require("../service/alunosService");
const { log } = require("console");
const gerador = require('../helper/gerador');
require('dotenv').config();



const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};



test.only("Should get an aluno by its matricula", async function () {
  //const data=gerador.generateAluno();
  const response = await request(process.env.url_default+`alunos/${123}`, "get");
  expect(response.status).toBe(201);

 console.log(response.data);
  const fala_salva = response.data;
  expect(fala_salva.matricula).toBe("123");
  //expect(fala_salva.nome).toBe(data.nome);
 // expect(fala_salva.senha).toBe(data.senha);
  
 //depois deletar
  //await postsService.deletePost(post.id);
});


test("Should save an aluno", async function () {
  const data=gerador.generateAluno();
  const response = await request(process.env.url_default+"alunos", "post", data);
 
  expect(response.status).toBe(201);

 
  const fala_salva = response.data;
  expect(fala_salva.matricula).toBe(data.matricula);
  expect(fala_salva.nome).toBe(data.nome);
  expect(fala_salva.senha).toBe(data.senha);
  
 //depois deletar
  //await postsService.deletePost(post.id);
});
