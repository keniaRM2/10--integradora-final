const {
    pago, stock, persona, comprobante
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const paypal = require('@paypal/checkout-server-sdk');
const conexion = require("./config/conexionBD");

module.exports = {
    listar: async () => {
        try {
            return await pago.findAll({
                order: [['idPago', 'DESC']],
                include: [
                    {
                        model: persona,
                        as: 'persona',
                        required: false,
                    },
                ]
            });
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {

        let transaction;

        try {

            transaction = await conexion.transaction();


            let clave = 'NO DEFINIDO';

            let nuevoPago = {
                fechaPago: new Date(),
                monto: parametros.monto,
                personaId: parametros.usuarioSesion.idPersona,
                compraId: parametros.compraId,
                clave
            };

            nuevoPago = await pago.create(nuevoPago, { transaction });


            const clientId = process.env.CLIENT_ID_DE_SANDBOX
            const clientSecret = process.env.CLIENT_SECRET_DE_SANDBOX

            const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
            const client = new paypal.core.PayPalHttpClient(environment);

            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer('return=representation');



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
            clave = response.result.id;


            let datosActualizados = { clave: clave };
            await pago.update(datosActualizados, {
                where: { idPago: nuevoPago.idPago },
                transaction
            });



            if (!utileria.arrayVacio(parametros.comprobante)) {


                const base64String = parametros.comprobante;


                // Verificar si el archivo es una imagen
                const imageRegex = /^data:image\/([A-Za-z-+\/]+);base64/;
                const imageMatches = base64String.match(imageRegex);

                // Verificar si el archivo es un PDF
                const pdfRegex = /^data:application\/pdf;base64/;
                const isPdf = pdfRegex.test(base64String);

                let formato = 'jpeg'; // Formato predeterminado para imágenes

                if (imageMatches && imageMatches.length > 1) {
                    formato = imageMatches[1]; 
                } else if (isPdf) {
                    formato = 'pdf'; 
                }



                let bufferData;

                if (isPdf) {
                    const base64Data = base64String.replace(/^data:application\/pdf;base64,/, '');
                    bufferData = Buffer.from(base64Data, 'base64');
                } else {
                    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
                    bufferData = Buffer.from(base64Data, 'base64');
                }

                let nuevoComprobante = {
                    formato: formato,
                    imagen: bufferData,
                    pagoId: nuevoPago.idPago
                };
                
                nuevoComprobante = await comprobante.create(nuevoComprobante, { transaction });

                console.log(`Comprobante ${formato} registrado exitosamente.`);
            }





            await transaction.commit();

            return { idPago: nuevoPago.idPago };
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {


            const {
                idPago,
                nombre
            } = parametros;

            const pagoRepetida = await pago.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (pagoRepetida && pagoRepetida.idPago !== idPago) {
                throw new Error(`Nombre de la pago ${nombre}, no disponible.`);
            }

            let actualizado = {
                nombre: nombre
            };
            return await pago.update(actualizado, { where: { idPago: idPago } });
        } catch (error) {
            throw error;
        }
    },
    eliminar: async (parametros) => {
        try {

            const {
                idPago
            } = parametros;

            const stocks = await stock.findAll({
                where: {
                    pagoId: idPago
                }
            });

            if (!utileria.arrayVacio(stocks)) {
                throw new Error(`La pago cuenta con dependencias de stocks.`);
            }


            return await pago.destroy({
                where: {
                    idPago: idPago
                }
            });

        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idPago
            } = parametros;

            return await pago.findOne({
                where: {
                    idPago: idPago
                }
            });

        } catch (error) {
            throw error;
        }
    },
};