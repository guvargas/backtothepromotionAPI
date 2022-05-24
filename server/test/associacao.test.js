const crypto = require("crypto");
const axios = require("axios");
const associacaoService = require("../service/associacaoService");
const { log } = require("console");
const gerador = require("../helper/gerador");
require('dotenv').config();

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
    `${process.env.URL_DEFAULT}/player`,
    "post",
    player
  );
  expect(responsePlayer.status).toBe(201);
  const player_salvo = responsePlayer.data;

  const responseAluno = await request(
    `${process.env.URL_DEFAULT}/alunos`,
    "post",
    aluno
  );
  expect(responseAluno.status).toBe(201);
  const aluno_salvo = responseAluno.data;

  const response = await request(
    `${process.env.URL_DEFAULT}/associar/player/${player_salvo.id_player}/aluno/${aluno_salvo.id_aluno}`,
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

test("Should associate a player to a click", async function () {
  const player = gerador.generatePlayer();
  const click = gerador.generateClick();

  const responsePlayer = await request(
    process.env.URL_DEFAULT+"player",
    "post",
    player
  );
  expect(responsePlayer.status).toBe(201);
  const player_salvo = responsePlayer.data;

  const responseClick = await request(
    process.env.URL_DEFAULT+"click",
    "post",
    click
  );
  expect(responseClick.status).toBe(201);
  const clickResponse = responseClick.data;

  const response = await request(
    `${process.env.URL_DEFAULT}/associar/player/${player_salvo.id_player}/click/${clickResponse.id_click}`,
    "post"
  );
  //log(response.data);
  expect(response.status).toBe(201);
  const associacao = response.data;
  expect(associacao.id_click).toBe(clickResponse.id_click);
  expect(associacao.id_player).toBe(player_salvo.id_player);

  //depois deletar
  //await postsService.deletePost(post.id);
});


test("Should associate a player to a fluxo", async function () {
  const player = gerador.generatePlayer();
  const fluxo = gerador.generateFluxo();

  const responsePlayer = await request(
    `${process.env.URL_DEFAULT}/player`,
    "post",
    player
  );
  expect(responsePlayer.status).toBe(201);
  const player_salvo = responsePlayer.data;

  const responseFluxo = await request(
    `${process.env.URL_DEFAULT}/fluxo`,
    "post",
    fluxo
  );
  expect(responseFluxo.status).toBe(201);
  const FluxoResponse = responseFluxo.data;

  const response = await request(
    `${process.env.URL_DEFAULT}/associar/player/${player_salvo.id_player}/fluxo/${FluxoResponse.id_fluxo}`,
    "post"
  );
  //log(response.data);
  expect(response.status).toBe(201);
  const associacao = response.data;
  expect(associacao.id_fluxo).toBe(FluxoResponse.id_fluxo);
  expect(associacao.id_player).toBe(player_salvo.id_player);

  //depois deletar
  //await postsService.deletePost(post.id);
});
