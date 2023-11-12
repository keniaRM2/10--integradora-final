const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController.js');

router.get('/producto/', productoController.listar);

router.put('/producto/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('precio').isDecimal().withMessage(mensajes.validationErrors.isInt),
        body('existencia').isInt().withMessage(mensajes.validationErrors.isInt),
        body('color').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('subcategoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    productoController.registrar);

router.post('/producto/actualizar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('precio').isDecimal().withMessage(mensajes.validationErrors.isInt),
        body('existencia').isInt().withMessage(mensajes.validationErrors.isInt),
        body('color').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('subcategoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    productoController.actualizar);

router.post('/producto/actualizarEstatus',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    productoController.actualizarEstatus);


router.delete('/producto/eliminar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    productoController.eliminar);

router.post('/producto/obtener',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    productoController.obtener);


module.exports = router;