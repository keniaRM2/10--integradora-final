const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/genero/', generoController.listar);

module.exports = router;
