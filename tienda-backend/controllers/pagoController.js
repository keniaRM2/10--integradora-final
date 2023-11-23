const pagoDAO = require('../dao/pagoDAO');
const utileria = require('../utils/utileria.js')
const paypal = require('@paypal/checkout-server-sdk');

exports.listar = async (req, res) => {
  try {

    let lista = await pagoDAO.listar();
    return utileria.responseOk(lista, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.registrar = async (req, res) => {
  try {

    const clientId = process.env.CLIENT_ID_DE_SANDBOX
    const clientSecret = process.env.CLIENT_SECRET_DE_SANDBOX

    const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    const client = new paypal.core.PayPalHttpClient(environment);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');


    let parametros = req.body;

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'MXN',
          value: parametros.monto,
        },
      }],
    });

    const response = await client.execute(request);
    const clave = response.result.id;

    parametros = {...req.body, clave: clave};
    const respuesta = await pagoDAO.registrar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.actualizar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await pagoDAO.guardar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};


exports.eliminar = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await pagoDAO.eliminar(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};

exports.obtener = async (req, res) => {
  try {

    const parametros = req.body;
    const respuesta = await pagoDAO.obtener(parametros);

    return utileria.responseOk(respuesta, res);
  } catch (error) {
    return utileria.reponseError(error, res);
  }
};