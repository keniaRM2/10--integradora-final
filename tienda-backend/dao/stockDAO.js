const {
    status,
    stock,
    compra_producto,
    carrito_producto,
    subcategoria,
    categoria,
    imagen,
    color,
    medida,
    producto,
    talla
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const conexion = require('./config/conexionBD');
const productoDAO = require("./productoDAO");

module.exports = {
    listar: async () => {
        try {
            return await stock.findAll({
                order: [['idStock', 'DESC']],
                include: [
                    {
                        model: producto,
                        as: 'producto',
                        include: [{
                            model: subcategoria,
                            as: 'subcategoria',
                            include: [{
                                model: categoria,
                                as: 'categoria',
                            }]
                        }]
                    },
                    {
                        model: talla,
                        as: 'talla',
                        required: false, // Indica que es un left join
                    },
                    {
                        model: color,
                        as: 'color',
                        required: false, // Indica que es un left join
                    }]
            });
        } catch (error) {
            throw error;
        }
    },
    guardar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

            let filtrado = { productoId: parametros.productoId };
            if(parametros.idStock > 0){
                filtrado = { idStock: parametros.idStock };
            }else{
                filtrado = { productoId: parametros.productoId };
                if (parametros.tallaId) {
                    filtrado.tallaId = parametros.tallaId;
                }
    
                if (parametros.tallaId) {
                    filtrado.colorId = parametros.colorId;
                }
            }
            

            let stockBuscado = await stock.findOne({ where: filtrado });

            let response = undefined;

            if (!stockBuscado) {
                let stockNuevo = {
                    precio: parametros.precio,
                    existencia: parametros.existencia,
                    productoId: parametros.productoId,
                };
                if (parametros.tallaId) {
                    stockNuevo.tallaId = parametros.tallaId;
                }
                if (parametros.tallaId) {
                    stockNuevo.colorId = parametros.colorId;
                }
                response = await stock.create(stockNuevo);

            } else {
                const actualizado = {
                    precio: parametros.precio,
                    existencia: parametros.existencia,
                    productoId: parametros.productoId,
                };
                if (parametros.tallaId) {
                    actualizado.tallaId = parametros.tallaId;
                }
                if (parametros.tallaId) {
                    actualizado.colorId = parametros.colorId;
                }
                response = await stock.update(actualizado, { where: { idStock: stockBuscado.idStock } });
            }



            // Commit si todo se realizó correctamente
            await transaction.commit();

            return response;
        } catch (error) {
            // Rollback en caso de error
            if (transaction) await transaction.rollback();
            throw error;
        }
    },
    eliminar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

            const {
                idStock
            } = parametros;

            let dependencias = await carrito_producto.findAll({
                where: {
                    stockId: idStock
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                throw new Error(`La stock cuenta con dependencias, en carrito de compras.`);
            }


            dependencias = await compra_producto.findAll({
                where: {
                    stockId: idStock
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                throw new Error(`La stock cuenta con dependencias, en compras de producto.`);
            }


            let response = await stock.destroy({
                where: {
                    idStock: idStock
                }
            });
            // Commit si todo se realizó correctamente
            await transaction.commit();

            return response;

        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idStock
            } = parametros;

            let respuesta = await stock.findOne({
                where: {
                    idStock: idStock
                },
                include: [
                {
                    model: talla,
                    as: 'talla',
                    required: false, // Indica que es un left join
                },
                {
                    model: color,
                    as: 'color',
                    required: false, // Indica que es un left join
                }]
            });
            respuesta = respuesta.toJSON();

            respuesta.producto = await productoDAO.obtener({idProducto: respuesta.productoId});

            return respuesta;
        } catch (error) {
            throw error;
        }
    },
};