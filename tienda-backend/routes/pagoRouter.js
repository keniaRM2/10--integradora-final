const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController.js');

router.get('/pago/', pagoController.listar);

router.put('/pago/registrar',
    [
        body('monto').isDecimal().withMessage(mensajes.validationErrors.isInt),
        body('compraId').isInt().withMessage(mensajes.validationErrors.isInt),
        utileria.validarCampos
    ],
    pagoController.registrar);


module.exports = router;