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
app.use(cors());
app.use(validarToken);


iniciales();


for (let i = 0; i < rutas.length; i++) {
  app.use('/api', rutas[i]);
}


let port =  process.env.NODE_ENV === "production" ? process.env.PORT_PROD : process.env.PORT_DEV;
port = port || 3000;

app.listen(port, () => {

  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);

});
