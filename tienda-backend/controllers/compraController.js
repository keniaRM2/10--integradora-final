const compraDAO = require('../dao/compraDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
    try {
        let lista = await compraDAO.listar();
        return utileria.responseOk(lista, res);

    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.registrar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.registrar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.actualizar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.actualizar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};



exports.eliminar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.eliminar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.obtener = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.obtener(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.aceptarCompra = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.aceptarCompra(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.rechazarCompra = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await compraDAO.rechazarCompra(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.listarMisCompras = async (req, res) => {
    try {
        const parametros = req.body;
        let lista = await compraDAO.listarMisCompras(parametros);
        return utileria.responseOk(lista, res);

    } catch (error) {
        return utileria.reponseError(error, res);
    }
};