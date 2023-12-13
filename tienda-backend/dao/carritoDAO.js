const {
    carrito,
    persona,
    carrito_producto,
    stock,
    talla,
    color
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const stockDAO = require('./stockDAO');

module.exports = {
    listar: async () => {
        try {

            let carritos = await carrito.findAll({
                attributes: [
                    'idCarrito',
                    'fechaActualizacion',
                    'total',
                    'personaId'
                ],
                include: [{
                    model: persona,
                    as: 'persona',
                }],
                order: [
                    ['fechaActualizacion', 'DESC']
                ]
            });

            return carritos;
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {

        try {

            // Iniciando la transacción
            // transaction = await conexion.transaction();

            let {
                idStock,
                idPersona,
                usuarioSesion
            } = parametros;

            idPersona = idPersona ? idPersona : usuarioSesion.idPersona;


            let carritoUsuario = await carrito.findOne({
                where: {
                    personaId: idPersona
                }
            });

            if (!carritoUsuario) {
                const nuevo = {
                    fechaActualizacion: new Date(),
                    total: 0,
                    personaId: idPersona
                };
                carritoUsuario = await carrito.create(nuevo);
            }


            let carritoProducto = await carrito_producto.findOne({
                where: {
                    carritoId: carritoUsuario.idCarrito,
                    stockId: idStock
                }
            });

            if (!carritoProducto) {
                const nuevo = {
                    fechaRegistro: new Date(),
                    carritoId: carritoUsuario.idCarrito,
                    stockId: idStock
                };
                carritoProducto = await carrito_producto.create(nuevo);

                const productosAgregados = await carrito_producto.findAll({
                    where: {
                        carritoId: carritoUsuario.idCarrito
                    },
                    include: [{
                        model: stock,
                        as: 'stock',
                    },],
                });


                let totalFinal = 0;

                for (const producto of productosAgregados) {
                    totalFinal += producto.stock.precio;
                }

                let actualizado = {
                    total: totalFinal,
                    fechaActualizacion: new Date()
                };

                return await carrito.update(actualizado, { where: { idCarrito: carritoUsuario.idCarrito } });

            }

            return {
                idCarritoProducto: carritoProducto.idCarritoProducto
            };
        } catch (error) {
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {


            let {
                idStock,
                idPersona,
                usuarioSesion,
                cantidad
            } = parametros;

            idPersona = idPersona ?? usuarioSesion.idPersona;



            let carritoUsuario = await carrito.findOne({
                where: {
                    personaId: idPersona
                }
            });


            let actualizado = {
                cantidad: cantidad
            };

            await carrito_producto.update(actualizado, {
                where: { stockId: idStock, carritoId: carritoUsuario.idCarrito }
            });

            const productosAgregados = await carrito_producto.findAll({
                where: {
                    carritoId: carritoUsuario.idCarrito
                },
                include: [{
                    model: stock,
                    as: 'stock',
                },],
            });


            let totalFinal = 0;
            for (let i = 0; i < productosAgregados.length; i++) {
                totalFinal = totalFinal + productosAgregados[i].stock.precio;
            }

            actualizado = {
                total: totalFinal,
                fechaActualizacion: new Date()
            };

            return await carrito.update(actualizado, { where: { idCarrito: carritoUsuario.idCarrito } });



        } catch (error) {
            throw error;
        }
    },
    eliminar: async (parametros) => {
        try {


            let {
                idStock,
                idPersona,
                usuarioSesion
            } = parametros;

            idPersona = idPersona ?? usuarioSesion.idPersona;



            let carritoUsuario = await carrito.findOne({
                where: {
                    personaId: idPersona
                }
            });


            await carrito_producto.destroy({
                where: { stockId: idStock, carritoId: carritoUsuario.idCarrito }

            });

            const productosAgregados = await carrito_producto.findAll({
                where: {
                    carritoId: carritoUsuario.idCarrito
                },
                include: [{
                    model: stock,
                    as: 'stock',
                },],
            });


            let totalFinal = 0;
            for (const productoAgregado of productosAgregados) {
                totalFinal += productoAgregado.stock.precio;
            }

            actualizado = {
                total: totalFinal,
                fechaActualizacion: new Date()
            };

            return await carrito.update(actualizado, { where: { idCarrito: carritoUsuario.idCarrito } });



        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {
            const {
                idCarrito
            } = parametros;

            // Obtener la información del carrito
            let respuesta = await carrito.findOne({
                where: {
                    idCarrito
                },
                include: [{
                    model: persona,
                    as: 'persona'
                }]
            });
            respuesta = respuesta.toJSON();

            // Obtener la lista de productos del carrito
            let productos = await carrito_producto.findAll({
                where: {
                    carritoId: idCarrito
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
                    fechaRegistro: element.fechaRegistro,
                    stockId: element.stockId,
                    carritoId: idCarrito,
                    stock: stockData
                };
            }));

            // Agregar la lista de productos al objeto de respuesta
            respuesta.carrito_producto = productos;

            return respuesta;
        } catch (error) {
            throw error;
        }

    },
    miCarrito: async (idPersona) => {
        try {

            // Obtener la información del carrito
            let respuesta = await carrito.findOne({
                where: {
                    personaId: idPersona
                },
                include: [{
                    model: persona,
                    as: 'persona'
                }]
            });
            if (!respuesta) {
                return {}
            }
            respuesta = respuesta.toJSON();

            let idCarrito = respuesta.idCarrito;

            // Obtener la lista de productos del carrito
            let productos = await carrito_producto.findAll({
                where: {
                    carritoId: idCarrito
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
                    fechaRegistro: element.fechaRegistro,
                    stockId: element.stockId,
                    carritoId: idCarrito,
                    stock: stockData
                };
            }));

            // Agregar la lista de productos al objeto de respuesta
            respuesta.carrito_producto = productos;

            return respuesta;
        } catch (error) {
            throw error;
        }

    },

};