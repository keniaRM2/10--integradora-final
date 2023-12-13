const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    response
} = require("express");
const {
    validationResult
} = require("express-validator");

const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0;

const responseOk = (objeto, res) => {
    return res.status(200).json(objeto);
};
const reponseError = (error, res, code = 400) => {
    const mensaje = error.message || error
    return res.status(code).json({
        mensaje: mensaje
    });
};

const encriptarContrasena = (contrasena) => {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(contrasena, salt);
};

const validarContrasena = (contrasena, contrasenaOriginal) => {
    return bcrypt.compareSync(contrasena, contrasenaOriginal);
};

const generarJWT = ({
    usuario,
    idUsuario,
    personaId
}) => {

    return new Promise((resolve, reject) => {
        jwt.sign({
            usuario,
            idUsuario,
            idPersona: personaId
        }, process.env.CLAVE_TOKEN, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

const camelCaseToSentence = (textoCamelCase) => {
    let palabras = textoCamelCase.match(/[A-Z]*[^A-Z]+/g);
  
    if (!palabras) {
      return textoCamelCase;
    }
  
    palabras[0] = palabras[0].toLowerCase();
  
    let oracion = palabras.join(' ');
  
    return oracion;
  }
  

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errores = errors.array().map(error => {
            let campo = error.param;
            if(campo.includes(".")){
                campo = campo.split(".");
                campo = campo[campo.length-1];
            }
            campo = camelCaseToSentence(campo);
            return error.msg.replace('{{param}}', campo.toLocaleLowerCase())
        });
        return res.status(400).json({
            errores: errores,
            mensaje: 'Campos no validos'
        });
    }

    next();
};


const nonEmpty = (data, valueDafault) => {
    if (valueDafault != null && valueDafault != undefined && valueDafault != "") {
        if (data != null && data != undefined && data != "") {
            return data;
        } else {
            return valueDafault;
        }
    }
    return data != null && data != undefined && data != "";
};

const isEmpty = (data) => {
    return !nonEmpty(data);
};

module.exports = {
    responseOk,
    reponseError,
    encriptarContrasena,
    validarContrasena,
    generarJWT,
    validarCampos,
    arrayVacio,
    isEmpty,
    nonEmpty
};