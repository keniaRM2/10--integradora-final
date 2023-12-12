const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const envioController = require('../controllers/envioController.js');

router.get('/envio/', envioController.listar);

router.put('/envio/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('subcategoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.registrar);

router.post('/envio/actualizar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('subcategoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.actualizar);


router.delete('/envio/eliminar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.eliminar);

router.post('/envio/obtener',
    [
        body('idEnvio').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.obtener);

router.post('/envio/enviar',
    [
        body('idEnvio').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.enviar);

router.post('/envio/entregar',
    [
        body('idEnvio').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    envioController.entregar);

module.exports = router;