const fala_salvaData = require("../data/falas_salvasData");


exports.saveFala = async function (fala) {
  const existingFala = await fala_salvaData.getFalaByID(fala.idFalaSalva);
  if (existingFala) throw new Error("Fala already exists");
  return fala_salvaData.saveFala(fala);
};
