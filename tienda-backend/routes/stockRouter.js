const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');

router.get('/stock/', stockController.listar);

router.put('/stock/registrar',
    [
        body('precio').isDecimal().withMessage(mensajes.validationErrors.isInt),
        body('existencia').isInt().withMessage(mensajes.validationErrors.isInt),
        body('productoId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    stockController.registrar);

router.post('/stock/actualizar',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('precio').isDecimal().withMessage(mensajes.validationErrors.isInt),
        body('existencia').isInt().withMessage(mensajes.validationErrors.isInt),
        body('productoId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    stockController.actualizar);



router.delete('/stock/eliminar',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    stockController.eliminar);

router.post('/stock/obtener',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    stockController.obtener);


module.exports = router;