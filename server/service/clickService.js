const { debug } = require("console");
const { response } = require("express");
const { getMaxListeners } = require("process");
const { isNumberObject } = require("util/types");
const clickData = require("../data/clickData.js");
const { map } = require("../infra/database.js");

exports.saveClick = async function (data) {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");
  return clickData.saveClick(data);
};

/*
id_aluno serial not null PRIMARY KEY,
matricula varchar(255) UNIQUE,
nome varchar(255),
senha varchar(255)
*/

exports.getClicks = async function () {
  // const existingAluno = await escolha_minigameData.getAlunoByMatricula(aluno.matricula);
  // if (existingAluno) throw new Error("Aluno already exists");

  return clickData.getClicks();
};

exports.filterRaw = async function (data) {
  //if request is ok
  if (
    data.student != null &&
    data.initialDate != null &&
    data.finalDate != null &&
    data.filter != null
  ) {
    //regex anti sql injection
    /*
    let re = new RegExp("/w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/ix");
    if (re.test(data.student) || re.test(data.filter))
      throw new Error("Invalid input");
    else
      data.student.filter((value) => {
        if (typeof value != "number") throw new Error("Invalid input");
      });
      */

    data.student.filter((value) => {
      if (typeof value != "number") throw new Error("Invalid input");
    });

    //pega a data, le, e cria o -> de caminhamento de um pro outro pra cada player
    let data_clicks = await clickData.filterRaw(data);
    let click_map = new Map();
    let timestamps = [];
    let path = [];

    data_clicks.forEach((element) => {
      let games = [];
      let playerExist = false;

      //
      if (click_map.has(element.id_aluno)) {
        games = click_map.get(element.id_aluno);
        games.forEach((game) => {
          if (element.id_player == game.id_player) {
            timestamps = game.timestamps.push(element.horario.getTime());
            if (data.repeat) {
              if (element.objeto != game.path[game.path.length - 1]) {
                path = game.path.push(element.objeto);
              }
            } else {
              path = game.path.push(element.objeto);
            }
            playerExist = true;
          }
        });

        if (!playerExist) {
          let tempObj = {
            id_player: element.id_player,
            timestamps: [],
            path: [],
          };

          tempObj.timestamps.push(element.horario.getTime());
          tempObj.path.push(element.objeto);
          games.push(tempObj);
        }
      } else {
        let tempObj = {
          id_player: element.id_player,
          timestamps: [],
          path: [],
        };

        tempObj.timestamps.push(element.horario.getTime());
        tempObj.path.push(element.objeto);
        games.push(tempObj);

        click_map.set(element.id_aluno, games);
      }
    });

    return click_map;
  }
  //aqui ele trata a resposta
};

exports.filter = async function (data) {
  let dataClickRaw = await this.filterRaw(data);

  let answer = [];

  dataClickRaw.forEach((element, key) => {
    let id_aluno; // id_aluno do aluno
    element.forEach((dataPlayer) => {
      let caminho = "";
      let count = 0;

      //transform the date to timestamp
      let length = dataPlayer.timestamps.length - 1;
      totalSeconds =
        (dataPlayer.timestamps[length] - dataPlayer.timestamps[0]) / 1000;
      hours = Math.floor(totalSeconds / 3600);
      minutes = Math.floor((totalSeconds % 3600) / 60);
      seconds = Math.floor((totalSeconds % 3600) % 60);
      //-----------------------------------------------------

      //gets the path of that player
      dataPlayer.path.forEach((ph) => {
        if (dataPlayer.path.length - 1 == count) {
          caminho += ph;
        } else {
          caminho += ph + " -> ";
        }
        count++;
      });

      // if don't have answer yet then create.
      if (answer.length == 0) {
        id_aluno = key; // update id_aluno to get new key value.

        answer.push({
          id_aluno: key,
          id_player: dataPlayer.id_player,
          elapsedTime: minutes + "m" + seconds + "s",
          route: caminho,
        });
      } // if have answer then check if it's the same player.
      else {
        // if it's NOT the same player then update the answer.
        if (id_aluno != key) {
          // verify if id_aluno is different from last answer element.
          // if different then create new answer element (new aluno play the game).
          answer.push({
            id_aluno: key,
            id_player: dataPlayer.id_player,
            elapsedTime: minutes + "m" + seconds + "s",
            route: caminho,
          });
        } else {
          for (let index = 0; index < answer.length; index++) {
            // search for id_aluno in answer array for change answer array to put new element content
            if (answer[index]["id_aluno"] == id_aluno) {
              /*
               * talvez esse if e else de para tirar, eu usei ele para n??o da pau se n??o tive nenhum elemento,
               * mas talvez de para inicia-lo antes de tudo.
               */

              // if others_games is empty then put new element in others_games.
              if (answer[index]["others_games"] == null) {
                answer[index] = {
                  ...answer[index],
                  others_games: [
                    {
                      id_player: dataPlayer.id_player,
                      elapsedTime: minutes + "m" + seconds + "s",
                      route: caminho,
                    },
                  ],
                };
              } else {
                // if others_games is not empty then put new element in others_games and persist data older.
                answer[index]["others_games"].push({
                  id_player: dataPlayer.id_player,
                  elapsedTime: minutes + "m" + seconds + "s",
                  route: caminho,
                });
              }
            }
          }
        }

        id_aluno = key;
      }
    });
  });

  let mapa_qtd_umprooutro = new Map();

  answer.forEach((element) => {
    let rose = element.route.split(" -> ");
    //for rose
    for (let i = 0; i < rose.length; i++) {
      if (i + 1 < rose.length) {
        let key = rose[i] + " -> " + rose[i + 1];
        let info;
        if (mapa_qtd_umprooutro.has(key)) {
          info = {
            vezes: mapa_qtd_umprooutro.get(key).vezes + 1,
            tempo: mapa_qtd_umprooutro.get(key).tempo,
          };
          info.tempo.push(element.elapsedTime);
        } else {
          info = {
            vezes: 1,
            tempo: [],
          };
          info.tempo.push(element.elapsedTime);
        }
        mapa_qtd_umprooutro.set(key, info);
      }
    }
  });

  return answer;
};
