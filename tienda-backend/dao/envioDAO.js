const {
    envio,
    compra,
    persona,
    status,
    compra_producto,
    stock,
    talla,
    color
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const stockDAO = require("./stockDAO");
const conexion = require("./config/conexionBD");

module.exports = {
    listar: async () => {
        try {

            let envios = await envio.findAll({
                attributes: [
                    'idEnvio',
                    'fechaEnvio',
                    'fechaEntrega',
                    'compraId',
                    'personaResponsableId',
                    'statusId'
                ],
                include: [{
                        model: compra,
                        as: 'compra',
                        include: [{
                            model: persona,
                            as: 'persona',
                        }]
                    },
                    {
                        model: status,
                        as: 'status',
                    },
                    {
                        model: persona,
                        as: 'personaResponsable',
                        required: false
                    }
                ],
                order: [
                    ['fechaEnvio', 'DESC']
                ]
            });

            return envios;
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    registrar: async (parametros) => {

    },
    actualizar: async (parametros) => {

    },
    eliminar: async (parametros) => {

    },
    obtener: async (parametros) => {
        try {
            const {
                idEnvio
            } = parametros;

            let respuesta = await envio.findOne({
                where: {
                    idEnvio: idEnvio
                },
                include: [{
                        model: compra,
                        as: 'compra',
                        include: [{
                            model: persona,
                            as: 'persona',
                        },{
                            model: status,
                            as: 'status'
                        }]
                    },
                    {
                        model: status,
                        as: 'status',
                    },
                    {
                        model: persona,
                        as: 'personaResponsable',
                        required: false
                    }
                ]
            });

            respuesta = respuesta.toJSON();

            let productos = await compra_producto.findAll({
                where: {
                    compraId: respuesta.compraId
                },
                include: [{
                    model: stock,
                    as: 'stock',
                    include: [{
                        model: talla,
                        as: 'talla'
                    }, {
                        model: color,
                        as: 'color'
                    }]
                }]
            });

            // Transformar la lista de productos según la necesidad
            productos = await Promise.all(productos.map(async (element) => {
                const stockData = await stockDAO.obtener({
                    idStock: element.stockId
                });
                return {
                    cantidad: element.cantidad,
                    precio: element.precio,
                    total: element.total,
                    comentario: element.comentario,
                    compraId: element.compraId,
                    stockId: element.stockId,
                    stock: stockData
                };
            }));

            respuesta.compra_producto = productos;

            return respuesta;
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    enviar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();


            const nuevoStatus = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_EN_CAMINO
                }
            });
            let actualizacion = {
                fechaEnvio: new Date(),
                personaResponsableId: parametros.usuarioSesion.idPersona,
                statusId: nuevoStatus.idStatus
            };

            await envio.update(actualizacion, {
                where: {
                    idEnvio: parametros.idEnvio
                }
            });


            await transaction.commit();

            return {idEnvio: parametros.idEnvio};
        } catch (error) {
            // Rollback en caso de error
            if (transaction) await transaction.rollback();
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    entregar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();


            const nuevoStatus = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_ENTREGADO
                }
            });

            let actualizacion = {
                fechaEntrega: new Date(),
                personaResponsableId: parametros.usuarioSesion.idPersona,
                statusId: nuevoStatus.idStatus
            };

            await envio.update(actualizacion, {
                where: {
                    idEnvio: parametros.idEnvio
                }
            });


            await transaction.commit();

            return {idEnvio: parametros.idEnvio};
        } catch (error) {
            // Rollback en caso de error
            if (transaction) await transaction.rollback();
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    }
};