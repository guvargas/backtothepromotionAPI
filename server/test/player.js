const crypto = require("crypto");
const axios = require("axios");
const playerService = require("../service/playerService");
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

test("Should save a player", async function () {
  const data = gerador.generatePlayer();
  const response = await request(process.env.url_default+"player", "post", data);

  expect(response.status).toBe(201);

  const player_salvo = response.data;
  expect(player_salvo.posicao).toBe(data.posicao);
  expect(player_salvo.volume_falas).toBe(data.volume_falas);
  expect(player_salvo.volume_ambiente).toBe(data.volume_ambiente);
  expect(player_salvo.cena_salva).toBe(data.cena_salva);

  //depois deletar
  //await postsService.deletePost(post.id);
});
