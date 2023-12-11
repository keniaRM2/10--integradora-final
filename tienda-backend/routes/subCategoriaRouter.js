const utileria = require('../utils/utileria');
const {
    body
} = require('express-validator');
const mensajes = require('../json/mensajes.json');
const express = require('express');
const router = express.Router();
const subCategoriaController = require('../controllers/subCategoriaController.js');

router.get('/subCategoria/', subCategoriaController.listar);

router.put('/subCategoria/registrar',
    [
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('categoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    subCategoriaController.registrar);

router.post('/subCategoria/actualizar',
    [
        body('idSubcategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('nombre').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        body('categoriaId').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    subCategoriaController.actualizar);

router.post('/subCategoria/obtener',
    [
        body('idSubcategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    subCategoriaController.obtener);



router.delete('/subCategoria/eliminar',
    [
        body('idSubcategoria').notEmpty().withMessage(mensajes.validationErrors.isEmpty),
        utileria.validarCampos
    ],
    subCategoriaController.eliminar);

module.exports = router;