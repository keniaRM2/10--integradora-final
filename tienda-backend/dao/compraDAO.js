const {
    compra,
    persona,
    status,
    compra_producto,
    stock,
    talla,
    color,
    envio,
    producto,
    usuario,
    direccion,
    pago,
    comprobante,
    carrito_producto,
    carrito
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const stockDAO = require("./stockDAO");
const conexion = require("./config/conexionBD");

module.exports = {
    listarMisCompras: async (parametros) => {
        try {

            const { idUsuario } = parametros.usuarioSesion;
            const userData = await usuario.findOne({ where: { idUsuario } });
            const idPersona = userData.personaId;


            let compras = await compra.findAll({
                attributes: [
                    'idCompra',
                    'fechaCompra',
                    'total',
                    'montoPagado',
                    'personaId',
                    'statusId'
                ],
                where: {
                    personaId: idPersona
                },
                include: [{
                    model: persona,
                    as: 'persona',
                },
                {
                    model: status,
                    as: 'status',
                }
                ],
                order: [
                    ['fechaCompra', 'DESC']
                ]
            });

            return compras;
        } catch (error) {
            throw error;
        }
    },
    listar: async () => {
        try {

            let compras = await compra.findAll({
                attributes: [
                    'idCompra',
                    'fechaCompra',
                    'total',
                    'montoPagado',
                    'personaId',
                    'statusId'
                ],
                include: [{
                    model: persona,
                    as: 'persona',
                },
                {
                    model: status,
                    as: 'status',
                }
                ],
                order: [
                    ['fechaCompra', 'DESC']
                ]
            });

            return compras;
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {
        let transaction;

        try {
            const { productos, usuarioSesion } = parametros;

            if (utileria.arrayVacio(productos)) {
                throw new Error(`Ingrese productos, para continuar con la compra.`);
            }

            const { idUsuario } = usuarioSesion;

            const userData = await usuario.findOne({ where: { idUsuario } });
            const idPersona = userData.personaId;

            if (utileria.isEmpty(idPersona)) {
                throw new Error(`Deberá ingresar sus datos personales, para continuar con la compra.`);
            }

            const addressData = await direccion.findOne({ where: { personaId: idPersona } });

            if (utileria.isEmpty(addressData)) {
                throw new Error(`Deberá ingresar su dirección, para continuar con la compra.`);
            }

            transaction = await conexion.transaction();

            const stockIds = productos.map((producto) => producto.stockId);
            const stockDataList = await stock.findAll({
                where: { idStock: stockIds },
                include: [{ model: producto, as: 'producto' }],
                transaction
            });

            const productosCompra = stockDataList.map((stockData, index) => {
                const { cantidad, comentario } = productos[index];
                const nuevaExistencia = stockData.existencia - cantidad;

                if (nuevaExistencia < 0) {
                    throw new Error(`El producto ${stockData.producto.nombre}, no disponible.`);
                }

                const totalProducto = stockData.precio * cantidad;

                return {
                    cantidad,
                    precio: stockData.precio,
                    total: totalProducto,
                    comentario,
                    stockId: stockData.idStock
                };
            });

            const total = productosCompra.reduce((acc, producto) => acc + producto.total, 0);

            const statusEnProceso = await status.findOne({
                where: { nombre: constantes.ESTATUS_EN_PROCESO },
                transaction
            });

            const nuevaCompra = await compra.create({
                fechaCompra: new Date(),
                total,
                montoPagado: 0,
                personaId: userData.personaId,
                statusId: statusEnProceso.idStatus
            }, { transaction }); // Asignación de la transacción a la creación de la compra

            const productosCompraConCompraId = productosCompra.map((item) => ({
                ...item,
                compraId: nuevaCompra.idCompra
            }));

            await compra_producto.bulkCreate(productosCompraConCompraId, { transaction }); // Asignación de la transacción al bulkCreate


            let carritoData = await carrito.findOne({
                where: {
                    personaId: userData.personaId
                },
                transaction
            });

            if (carritoData) {


                await carrito_producto.destroy({
                    where: {
                        carritoId: carritoData.idCarrito,
                        stockId: stockIds
                    },
                    transaction
                });

                let productosAgregados = await carrito_producto.findAll({
                    where: {
                        carritoId: carritoData.idCarrito
                    },
                    include: [{
                        model: stock,
                        as: 'stock',
                    }],
                    transaction
                });


                let totalFinal = 0;
                for (const productoAgregado of productosAgregados) {
                    totalFinal += productoAgregado.stock.precio;
                }                

                let actualizado = {
                    total: totalFinal,
                    fechaActualizacion: new Date()
                };

                await carrito.update(actualizado, {
                    where: { idCarrito: carritoData.idCarrito }
                });


            }



            await transaction.commit();

            return { idCompra: nuevaCompra.idCompra };
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }

    },
    actualizar: async (parametros) => {

    },
    eliminar: async (parametros) => {

    },
    obtener: async (parametros) => {
        try {
            const {
                idCompra
            } = parametros;

            let respuesta = await compra.findOne({
                where: {
                    idCompra: idCompra
                },
                include: [{
                    model: persona,
                    as: 'persona'
                }, {
                    model: status,
                    as: 'status'
                }]
            });
            respuesta = respuesta.toJSON();

            let productos = await compra_producto.findAll({
                where: {
                    compraId: idCompra
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


            let pagos = await pago.findAll({
                where: {
                    compraId: idCompra
                },
                include: [{
                    model: comprobante,
                    as: 'comprobante',
                    required: false
                }]
            });

            pagos = pagos.map((item) => {

                let comprobantePago;
                if (item.comprobante) {
                    comprobantePago = {
                        formato: item.comprobante.formato,
                        imagen: `${item.comprobante.imagen.toString('base64')}`
                    };
                }

                return {
                    idPago: item.idPago,
                    fechaPago: item.fechaPago,
                    monto: item.monto,
                    clave: item.clave,
                    comprobante: comprobantePago
                }


            })

            respuesta.pagos = pagos;

            return respuesta;
        } catch (error) {
            throw error;
        }

    },
    aceptarCompra: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

            let productos = await compra_producto.findAll({
                where: {
                    compraId: parametros.idCompra
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
                    },
                    {
                        model: producto,
                        as: 'producto'
                    }]
                }]
            });

            for (const element of productos) {
                const nuevaExistencia = element.stock.existencia - element.cantidad;
                if (nuevaExistencia < 0) {
                    throw new Error(`El producto ${element.stock.producto.nombre}, no disponible.`);
                }
            }
            



            const statusAceptada = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_ACEPTADO
                }
            });

            let compraActualizacion = {
                statusId: statusAceptada.idStatus
            };

            await compra.update(compraActualizacion, {
                where: {
                    idCompra: parametros.idCompra
                }
            });


            const statusPendiente = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_PENDIENTE
                }
            });

            let nuevoEnvio = {
                fechaEnvio: new Date(),
                compraId: parametros.idCompra,
                personaResponsableId: parametros.usuarioSesion.idPersona,
                statusId: statusPendiente.idStatus
            };

            const {
                idEnvio
            } = await envio.create(nuevoEnvio);




            for (let i = 0; i < productos.length; i++) {
                const element = productos[i];
                const nuevaExistencia = element.stock.existencia - element.cantidad;
                let stockActualizado = {
                    existencia: nuevaExistencia
                };
                await stock.update(stockActualizado, {
                    where: {
                        idStock: element.stock.idStock
                    }
                });
            }




            // Commit si todo se realizó correctamente
            await transaction.commit();

            return { idEnvio: idEnvio };
        } catch (error) {
            // Rollback en caso de error
            if (transaction) await transaction.rollback();
            throw error;
        }
    },
    rechazarCompra: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();


            const statusRechazado = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_RECHAZADO
                }
            });

            let compraActualizacion = {
                statusId: statusRechazado.idStatus
            };

            await compra.update(compraActualizacion, {
                where: {
                    idCompra: parametros.idCompra
                }
            });


            // Commit si todo se realizó correctamente
            await transaction.commit();

            return { idCompra: parametros.idCompra };
        } catch (error) {
            // Rollback en caso de error
            if (transaction) await transaction.rollback();
            throw error;
        }
    }
};