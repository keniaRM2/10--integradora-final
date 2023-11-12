const productoDAO = require('../dao/productoDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
  try {

    let lista = await productoDAO.listar();
    return utileria.responseOk(lista, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.registrar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await productoDAO.registrar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await productoDAO.actualizar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizarEstatus = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await productoDAO.actualizarEstatus(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.eliminar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await productoDAO.eliminar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.obtener = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await productoDAO.obtener(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};