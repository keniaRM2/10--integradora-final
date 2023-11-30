const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const tipoMedidaController = require('../controllers/tipoMedidaController.js');

router.get('/tipoMedida/', tipoMedidaController.listar);

router.put('/tipoMedida/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tipoMedidaController.registrar);

router.post('/tipoMedida/actualizar',
    [
        body('idTipoMedida').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tipoMedidaController.actualizar);

router.post('/tipoMedida/obtener',
    [
        body('idTipoMedida').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tipoMedidaController.obtener);



router.delete('/tipoMedida/eliminar',
    [
        body('idTipoMedida').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    tipoMedidaController.eliminar);

module.exports = router;