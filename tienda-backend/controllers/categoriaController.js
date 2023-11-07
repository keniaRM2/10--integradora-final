const categoriaDAO = require('../dao/categoriaDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
  try {

    let lista = await categoriaDAO.listar();
    return utileria.responseOk(lista, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.registrar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await categoriaDAO.registrar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await categoriaDAO.actualizar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizarEstatus = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await categoriaDAO.actualizarEstatus(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.eliminar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await categoriaDAO.eliminar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};