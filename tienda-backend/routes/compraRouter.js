const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController.js');

router.get('/compra/', compraController.listar);

router.put('/compra/registrar',
    [
        body('productos').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.registrar);

router.post('/compra/actualizar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('subcategoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.actualizar);


router.delete('/compra/eliminar',
    [
        body('idProducto').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.eliminar);

router.post('/compra/obtener',
    [
        body('idCompra').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.obtener);



router.post('/compra/aceptar',
    [
        body('idCompra').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.aceptarCompra);



router.post('/compra/rechazar',
    [
        body('idCompra').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    compraController.rechazarCompra);


router.get('/compra/listarMisCompras', compraController.listarMisCompras);


module.exports = router;