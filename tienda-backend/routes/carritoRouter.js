const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController.js');

router.get('/carrito/', carritoController.listar);
router.get('/carrito/miCarrito', carritoController.miCarrito);

router.put('/carrito/registrar',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    carritoController.registrar);

router.post('/carrito/actualizar',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('cantidad').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    carritoController.actualizar);


router.delete('/carrito/eliminar',
    [
        body('idStock').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    carritoController.eliminar);

router.post('/carrito/obtener',
    [
        body('idCarrito').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    carritoController.obtener);


module.exports = router;