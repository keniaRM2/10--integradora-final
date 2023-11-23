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

// router.post('/pago/actualizar',
//     [
//         body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
//         body('precio').isDecimal().withMessage(mensajes.validationErrors.isInt),
//         body('existencia').isInt().withMessage(mensajes.validationErrors.isInt),
//         body('productoId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
//         utileria.validarCampos
//     ],
//     pagoController.actualizar);



// router.delete('/pago/eliminar',
//     [
//         body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
//         utileria.validarCampos
//     ],
//     pagoController.eliminar);

// router.post('/pago/obtener',
//     [
//         body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
//         utileria.validarCampos
//     ],
//     pagoController.obtener);


module.exports = router;