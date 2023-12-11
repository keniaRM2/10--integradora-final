const carritoDAO = require('../dao/carritoDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
    try {
        let lista = await carritoDAO.listar();
        return utileria.responseOk(lista, res);

    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.registrar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await carritoDAO.registrar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.actualizar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await carritoDAO.actualizar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};



exports.eliminar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await carritoDAO.eliminar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.obtener = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await carritoDAO.obtener(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.miCarrito = async (req, res) => {
    try {
        const idPersona = req.body.usuarioSesion.idPersona;
        const respuesta = await carritoDAO.miCarrito(idPersona);
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};
