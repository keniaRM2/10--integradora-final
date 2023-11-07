const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth/login', authController.login);
router.put('/auth/registrarUsuario', authController.registrarUsuario);

module.exports = router;