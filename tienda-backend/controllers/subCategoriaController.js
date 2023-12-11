const subcategoriaDAO = require('../dao/subcategoriaDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
  try {

    let lista = await subcategoriaDAO.listar();
    return utileria.responseOk(lista, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.registrar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await subcategoriaDAO.registrar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await subcategoriaDAO.actualizar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.obtener = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await subcategoriaDAO.obtener(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.eliminar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await subcategoriaDAO.eliminar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};