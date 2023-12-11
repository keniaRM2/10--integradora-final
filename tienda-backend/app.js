const { body, validationResult, check } = require('express-validator');

const validarToken = require('./utils/validarToken');
const iniciales = require('./utils/iniciales');
const bodyParser = require('body-parser');
const rutas = require('./routes/index');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// app.use(bodyParser.json());

// Aumentar el límite de carga
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware personalizado para aumentar el límite de tamaño de respuesta JSON
app.use((req, res, next) => {
  // Configura el límite máximo de tamaño de respuesta en 50MB (en bytes)
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Si es necesario, ajusta el límite máximo de tamaño de respuesta según tu requisito
  res.setHeader('Content-Length', '50MB');

  next();
});

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
