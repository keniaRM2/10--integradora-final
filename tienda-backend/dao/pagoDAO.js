const {
    pago, stock, persona,
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

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
        try {

            const nuevo = {
                fechaPago: new Date(),
                monto: parametros.monto,
                personaId: parametros.usuarioSesion.idPersona,
                compraId: parametros.compraId,
                clave: parametros.clave
           };

            const { idPago } = await pago.create(nuevo);
            return { idPago: idPago};   
        } catch (error) {
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
            return await pago.update(actualizado, {where: { idPago: idPago}});
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