const usuarioController = require('../controllers/usuarioController');
const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();

router.get('/usuario/', usuarioController.listarUsuario);

router.put('/usuario/registrar', [
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


router.post('/usuario/actualizarPersona', [
    body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('primerApellido').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('fechaNacimiento').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    utileria.validarCampos
], usuarioController.actualizarPersona);



router.post('/usuario/actualizarDireccion', [
    body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    body('numeroExterior').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('calle').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('colonia').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('municipio').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('entidadFederativa').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    utileria.validarCampos
], usuarioController.actualizarDireccion);



router.post('/usuario/actualizarContacto', [
    body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    body('correoElectronico').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    body('telefonoPrincipal').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
    utileria.validarCampos
], usuarioController.actualizarContacto);

router.post('/usuario/eliminar', [
    body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    utileria.validarCampos
], usuarioController.actualizar);


router.post('/usuario/obtener', [
    // body('idUsuario').isInt().withMessage(mensajes.validationErrors.isInt),
    utileria.validarCampos
], usuarioController.obtener);

module.exports = router;