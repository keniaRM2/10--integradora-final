const {
    status,
    producto,
    compra_producto,
    carrito_producto,
    subcategoria,
    categoria,
    imagen
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

module.exports = {
    listar: async () => {
        try {
            return await producto.findAll({
                include: [{
                    model: subcategoria,
                    as: 'subcategoria',
                    include: [{
                        model: categoria,
                        as: 'categoria',
                    }]
                }, {
                    model: status,
                    as: 'status',
                }]
            });
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {
        try {

            const statusActivo = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_ACTIVO
                }
            });

            const nombreProducto = parametros.nombre;

            const productoRepetido = await producto.findOne({
                where: {
                    nombre: nombreProducto
                }
            });

            if (productoRepetido) {
                throw new Error(`Nombre de la producto ${nombreProducto}, no disponible.`);
            }

            const nuevo = {
                nombre: nombreProducto,
                descripcion: parametros.descripcion,
                precio: parametros.precio,
                existencia: parametros.existencia,
                color: parametros.color,
                statusId: statusActivo.idStatus,
                subcategoriaId: parametros.subcategoriaId
            };

            const {
                idProducto
            } = await producto.create(nuevo);

            return {
                idProducto: idProducto
            };
        } catch (error) {
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {

            const productoRepetido = await producto.findOne({
                where: {
                    nombre: parametros.nombre
                }
            });

            if (productoRepetido && productoRepetido.idProducto !== parametros.idProducto) {
                throw new Error(`Nombre de la producto ${parametros.nombre}, no disponible.`);
            }
            
            const actualizado = {
                nombre: parametros.nombre,
                descripcion: parametros.descripcion,
                precio: parametros.precio,
                existencia: parametros.existencia,
                color: parametros.color,
                subcategoriaId: parametros.subcategoriaId
            };

            return await producto.update(actualizado, {where: { idProducto: parametros.idProducto}});

        } catch (error) {
            throw error;
        }
    },
    actualizarEstatus: async (parametros) => {
        try {

            const {
                idProducto
            } = parametros;

            let actualizado = await producto.findOne({
                where: {
                    idProducto: idProducto
                }
            });


            const statusActivo = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_ACTIVO
                }
            });

            const statusInactivo = await status.findOne({
                where: {
                    nombre: constantes.ESTATUS_INACTIVO
                }
            });

            if (actualizado.statusId === statusActivo.idStatus) {
                actualizado.statusId = statusInactivo.idStatus;
            } else if (actualizado.statusId === statusInactivo.idStatus) {
                actualizado.statusId = statusActivo.idStatus;

            }
            return await producto.update(actualizado);

        } catch (error) {
            throw error;
        }
    },
    eliminar: async (parametros) => {
        try {

            const {
                idProducto
            } = parametros;

            let dependencias = await carrito_producto.findAll({
                where: {
                    productoId: idProducto
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                throw new Error(`La producto cuenta con dependencias, en carrito de compras.`);
            }


            dependencias = await compra_producto.findAll({
                where: {
                    productoId: idProducto
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                throw new Error(`La producto cuenta con dependencias, en compras de producto.`);
            }


            dependencias = await imagen.findAll({
                where: {
                    productoId: idProducto
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                for (let i = 0; i < dependencias.length; i++) {
                    const element = await imagen.destroy({
                        where: {
                            idImagen: array[i].idImagen
                        }
                    });

                }
            }


            return await producto.destroy({
                where: {
                    idProducto: idProducto
                }
            });

        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idProducto
            } = parametros;


            return await producto.findOne({
                where: {
                    idProducto: idProducto
                }
            });

        } catch (error) {
            throw error;
        }
    },
};