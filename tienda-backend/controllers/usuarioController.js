const usuarioDAO = require('../dao/usuarioDAO');
const utileria = require('../utils/utileria.js')

exports.listarUsuario = async (req, res) => {
    try {

        const usuarios = await usuarioDAO.listarUsuario();
        return utileria.responseOk(usuarios, res);

    } catch (error) {
        return utileria.reponseError(error, res);
    }
};
exports.actualizar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.actualizar(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.actualizarDireccion = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.actualizarDireccion(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};


exports.actualizarContacto = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.actualizarContacto(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};
exports.actualizarPersona = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.actualizarPersona(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.eliminar = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.eliminar(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.obtener = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.obtener(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

