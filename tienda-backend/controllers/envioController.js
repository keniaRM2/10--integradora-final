const envioDAO = require('../dao/envioDAO');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
    try {
        let lista = await envioDAO.listar();
        return utileria.responseOk(lista, res);

    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.registrar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.registrar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.actualizar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.actualizar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};



exports.eliminar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.eliminar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.obtener = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.obtener(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};
exports.enviar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.enviar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.entregar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await envioDAO.entregar(parametros);

        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};