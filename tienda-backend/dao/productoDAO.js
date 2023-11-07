const {
    status,
    producto,
    compra_producto,
    carrito_producto,
    imagen
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

module.exports = {
    listar: async () => {
        try {
            return await producto.findAll();
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


            const {
                idProducto,
                nombre,
            } = parametros;

            const productoRepetido = await producto.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (productoRepetido && productoRepetido.idProducto !== idProducto) {
                throw new Error(`Nombre de la producto ${nombre}, no disponible.`);
            }

            let actualizado = await producto.findOne({
                where: {
                    idProducto: idProducto
                }
            });

            for (const key in parametros) {
                if (parametros[key] !== undefined && actualizado[key] !== undefined) {
                    actualizado[key] = parametros[key];
                }
            }

            return await producto.update(actualizado);
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
                    const element = await imagen.delete({
                        where: {
                            idImagen: array[i].idImagen
                        }
                    });

                }
            }


            return await producto.delete({
                where: {
                    productoId: idProducto
                }
            });

        } catch (error) {
            throw error;
        }
    },
};