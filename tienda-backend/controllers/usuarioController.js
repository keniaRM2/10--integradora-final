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

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario; // Obtén el ID de usuario desde los parámetros de la URL
        const usuario = await usuarioDAO.obtenerUsuarioPorId({ idUsuario });

        if (!usuario) {
           console.log("el usuario no existe");
        }

        return utileria.responseOk(usuario, res);
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

exports.actualizarEstatus = async (req, res) =>{
    try{
        const parametros = req.body;
        const respuesta = await usuarioDAO.actualizarEstatus(parametros);

        return utileria.responseOk(respuesta, res);
    }catch (error) {
        return utileria.reponseError(error, res);
    }
}


