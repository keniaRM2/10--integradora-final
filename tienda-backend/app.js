const { body, validationResult, check } = require('express-validator');
const validarToken = require('./utils/validarToken');
const iniciales = require('./utils/iniciales');
const bodyParser = require('body-parser');
const rutas = require('./routes/index');
const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const app = express();
app.disable('x-powered-by');

// Aumentar el límite de carga
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware personalizado para aumentar el límite de tamaño de respuesta JSON
const srv = http.createServer((req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': 'trustedwebsite.com' }); // Compliant
  res.end('ok');
});

let corsOptions = {
  origin: 'trustedwebsite.com' // Compliant
};


// Solo necesitas un uso de cors
app.use(cors(corsOptions));

// Asegúrate de que validarToken sea seguro aquí y no afecte a CORS
app.use(validarToken);

iniciales();

for (const ruta of rutas) {
  app.use('/api', ruta);
}

let port = process.env.NODE_ENV === "production" ? process.env.PORT_PROD : process.env.PORT_DEV;
port = port || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

srv.listen(8000, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:8000`);
});
