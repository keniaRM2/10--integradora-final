const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController.js');

router.get('/categoria/', categoriaController.listar);

router.put('/categoria/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    categoriaController.registrar);

router.post('/categoria/actualizar',
    [
        body('idCategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('descripcion').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    categoriaController.actualizar);

router.post('/categoria/obtener',
    [
        body('idCategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    categoriaController.obtener);

router.post('/categoria/actualizarEstatus',
    [
        body('idCategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    categoriaController.actualizarEstatus);


router.delete('/categoria/eliminar',
    [
        body('idCategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    categoriaController.eliminar);

module.exports = router;