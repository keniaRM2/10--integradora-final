const tallaDAO = require('../dao/tallaDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
  try {

    let lista = await tallaDAO.listar();
    return utileria.responseOk(lista, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.registrar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await tallaDAO.registrar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await tallaDAO.actualizar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.obtener = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await tallaDAO.obtener(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.eliminar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await tallaDAO.eliminar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};