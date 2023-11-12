const usuarioController = require('../controllers/usuarioController');
const utileria = require('../utils/utileria');
const {body} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();

router.get('/usuario/', usuarioController.listarUsuario);


router.post('/usuario/actualizar', [
    body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('primerApellido').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('fechaNacimiento').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('generoId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('direccion.numeroExterior').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('direccion.calle').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('direccion.colonia').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('direccion.municipio').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('direccion.entidadFederativa').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('contacto.correoElectronico').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('contacto.telefonoPrincipal').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('contacto.telefonoSecundario').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    utileria.validarCampos
], usuarioController.actualizar);

router.post('/usuario/actualizarEstatus',
    [
        body('idUsuario').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    usuarioController.actualizarEstatus)

module.exports = router;