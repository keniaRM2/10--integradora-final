const usuarioDAO = require('../dao/usuarioDAO');
const utileria = require('../utils/utileria.js')

exports.login = async (req, res) => {
    try {

        const parametros = req.body;
        const respuesta = await usuarioDAO.login(parametros);
        
        return utileria.responseOk(respuesta, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};

exports.registrarUsuario = async (req, res) => {
    try {

      
        const parametros = req.body;
        const usuario = await usuarioDAO.registrarUsuario(parametros);
        
        return utileria.responseOk(usuario, res);
    } catch (error) {
        return utileria.reponseError(error, res);
    }
};