const { body, validationResult, check } = require('express-validator');

const validarToken = require('./utils/validarToken');
const iniciales = require('./utils/iniciales');
const bodyParser = require('body-parser');
const rutas = require('./routes/index');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
// app.use(validarToken);
app.use(cors());


iniciales();


for (let i = 0; i < rutas.length; i++) {
  app.use('/api', rutas[i]);
}


const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);

});
