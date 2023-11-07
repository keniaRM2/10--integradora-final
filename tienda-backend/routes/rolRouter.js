const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/rol/', rolController.listarRoles);

module.exports = router;
