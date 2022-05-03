const database = require("../infra/database");
exports.saveFala = function (fala) {
  return database.one(
    "insert into tb_falas_salvas (identificador_original,texto, categoria) values ($1, $2, $3) returning *",
    [fala.identificador_original, fala.texto, fala.categoria]
  );
};
exports.getFalaByID = function (fala) {
  return database.oneOrNone(
    "select * from tb_falas_salvas where idSingleLine = $1",
    [fala]
  );
};


function getHorario(){
// current timestamp in milliseconds
let ts = Date.now();
const d = new Date();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
const fnal = year + "-" + month + "-" + date;
// prints date & time in YYYY-MM-DD format
console.log(d);
console.log(fnal);
return d;
}