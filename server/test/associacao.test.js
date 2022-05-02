const crypto = require("crypto");
const axios = require("axios");
const associacaoService = require("../service/associacaoService");
const { log } = require("console");
const gerador = require("../helper/gerador");

/*
  id_player serial not null PRIMARY KEY,
    posicao varchar(255),
    volume_falas varchar(255),
    volume_ambiente varchar(255),
    cena_salva varchar(255)
    */

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should associate a player to an aluno", async function () {
  const player = gerador.generatePlayer();
  const aluno = gerador.generateAluno();

  const responsePlayer = await request(
    "http://localhost:8000/player",
    "post",
    player
  );
  expect(responsePlayer.status).toBe(201);
  const player_salvo = responsePlayer.data;

  const responseAluno = await request(
    "http://localhost:8000/alunos",
    "post",
    aluno
  );
  expect(responseAluno.status).toBe(201);
  const aluno_salvo = responseAluno.data;


  const response = await request(
    `http://localhost:8000/associar/player/${player_salvo.id_player}/aluno/${aluno_salvo.id_aluno}`,
    "post"
  );
log(response.data);
  expect(response.status).toBe(201);
  const associacao = response.data;
  expect(associacao.id_aluno).toBe(aluno_salvo.id_aluno);
  expect(associacao.id_player).toBe(player_salvo.id_player);

  //depois deletar
  //await postsService.deletePost(post.id);
});
