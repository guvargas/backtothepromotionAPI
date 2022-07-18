const {
  debug
} = require("console");
const {
  response
} = require("express");
const {
  isNumberObject
} = require("util/types");
const clickData = require("../data/clickData.js");

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

exports.filter = async function (data) {
  filterRaw(data);

  // format to string and return

}

exports.filterRaw = async function (data) {
  //if request is ok
  if (
    data.student != null &&
    data.initialDate != null &&
    data.finalDate != null &&
    data.filter != null
  ) {
    //regex anti sql injection
    let re = new RegExp("/w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/ix");
    if (re.test(data.student) || re.test(data.filter))
      throw new Error("Invalid input");
    else
      data.student.filter((value) => {
        if (typeof value != "number") throw new Error("Invalid input");
      });

    //pega a data, le, e cria o -> de caminhamento de um pro outro pra cada player

    let data_clicks = await clickData.filterRaw(data);
    let click_map = new Map();
    let timestamps = [];
    let path = [];


    // let clickMap = [{
    //     id_aluno,
    //     games: []
    //   },
    //   {
    //     id_aluno: 34,
    //     games: []
    //   }
    // ];

    data_clicks.forEach((element) => {
      let games = [];
      let playerExist = false;

      //foreach clickmap

      if (click_map.has(element.id_aluno)) {
        games = click_map.get(element.id_aluno);
        games.forEach((game) => {
          if (element.id_player == game.id_player) {
            timestamps = game.timestamps.push(element.horario.getTime());
            path = game.path.push(element.objeto);
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

    //for each
    // click_map.forEach((element, key) => {
    //   console.log("-----------COMECO--------------------");
    //   console.log(key + " : ");
    //   element.forEach((elemen) => {

    //     console.log(elemen);
    //     // elemen.forEach((eleme) => {
    //     //     console.log(eleme);
    //     //   });
    //   });
    //   console.log("-----------FIM--------------------");
    // });

    /*

    if (count == data_clicks.length) {
      let pathString = "";

      for (let j = 0; j < count; j++) {
        if (j == count - 1) pathString += data_clicks[j].objeto;
        else pathString += data_clicks[j].objeto + "=> ";
      }
      console.log("array: " + pathString);

      data_clicks = [
        {
          ...data_clicks[count],
          objeto: pathString,
        },
      ];

      count = 0;
    }*/

    // console.log(data_clicks);

    // just do id copilot
    return click_map;
  }
  //aqui ele trata a resposta
};