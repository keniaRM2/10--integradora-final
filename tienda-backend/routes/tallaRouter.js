const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const tallaController = require('../controllers/tallaController.js');

router.get('/talla/', tallaController.listar);

router.put('/talla/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tallaController.registrar);

router.post('/talla/actualizar',
    [
        body('idTalla').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tallaController.actualizar);

router.post('/talla/obtener',
    [
        body('idTalla').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tallaController.obtener);



router.delete('/talla/eliminar',
    [
        body('idTalla').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tallaController.eliminar);

module.exports = router;