const {
    status,
    producto,
    talla,
    subcategoria,
    categoria,
    imagen,
    color,
    medida,
    stock,
    tipomedida
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const conexion = require('./config/conexionBD');
const Sequelize = require('sequelize');

module.exports = {
    listar: async () => {
        try {
            let productosConExistencia = await producto.findAll({
                attributes: [
                    'idProducto', // Incluir las columnas que necesitas
                    'nombre',
                    'descripcion',
                    'statusId',
                    'subcategoriaId',
                    [Sequelize.fn('SUM', Sequelize.col('stocks.existencia')), 'totalExistencia'] // Sumar la columna existencia
                ],
                include: [

                    {
                        model: stock,
                        as: 'stocks',
                        attributes: [], // No se necesitan atributos de la tabla stock en el resultado
                        required: false, // LEFT JOIN para incluir productos sin stock
                    },
                    {
                        model: subcategoria,
                        as: 'subcategoria',
                        include: [{
                            model: categoria,
                            as: 'categoria',
                        }]
                    }, {
                        model: status,
                        as: 'status',
                    }
                ],
                group: ['producto.idProducto'], // Agrupar por idProducto
                order: [
                    ['idProducto', 'DESC']
                ]
            });
      
            return productosConExistencia;
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

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
                statusId: statusActivo.idStatus,
                subcategoriaId: parametros.subcategoriaId
            };

            const {
                idProducto
            } = await producto.create(nuevo);



            if (!utileria.arrayVacio(parametros.colores)) {
                const coloresNuevos = parametros.colores.map(({
                    color
                }) => ({
                    color: color,
                    productoId: idProducto,
                }));

                await Promise.all(coloresNuevos.map((nuevoColor) => color.create(nuevoColor)));
                console.log('Colores creados exitosamente.');

            }


            if (!utileria.arrayVacio(parametros.medidas)) {
                const medidasNuevas = parametros.medidas.map((item) => ({
                    medida: item.medida,
                    tipoMedidaId: item.tipoMedidaId,
                    tallaId: item.tallaId,
                    productoId: idProducto,
                }));

                await Promise.all(medidasNuevas.map((nuevaMedida) => medida.create(nuevaMedida)));
                console.log('Medidas creadas exitosamente.');
            }


            // Commit si todo se realizó correctamente
            await transaction.commit();

            return {
                idProducto: idProducto
            };
        } catch (error) {
            // Rollback en caso de error
            if (transaction) {
                console.log("rollback");
                await transaction.rollback();
            }
            throw error;
        }
    },
    actualizar: async (parametros) => {
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

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
                subcategoriaId: parametros.subcategoriaId
            };

            let response = await producto.update(actualizado, {
                where: {
                    idProducto: parametros.idProducto
                }
            });


            // Eliminar todas las medidas relacionadas con un producto específico
            await medida.destroy({
                where: {
                    productoId: parametros.idProducto
                }
            });

            if (!utileria.arrayVacio(parametros.medidas)) {
                const medidasNuevas = parametros.medidas.map((item) => ({
                    medida: item.medida,
                    tipoMedidaId: item.tipoMedidaId,
                    tallaId: item.tallaId,
                    productoId: parametros.idProducto,
                }));

                await Promise.all(medidasNuevas.map((nuevaMedida) => medida.create(nuevaMedida)));
                console.log('Medidas creadas exitosamente.');
            }


            // Eliminar todos los colores relacionados con un producto específico

            let coloresEliminar = await color.findAll({
                where: {
                    productoId: parametros.idProducto
                }
            });

            if (!utileria.arrayVacio(parametros.colores)) {

                for (let i = 0; i < parametros.colores.length; i++) {
                    let indice = -1;

                    for (let j = 0; j < coloresEliminar.length; j++) {
                        if (parametros.colores[i].color === coloresEliminar[j].color) {
                            indice = j;
                        }
                    }

                    if (indice === -1) {

                        const colorNuevo = {
                            color: parametros.colores[i].color,
                            productoId: parametros.idProducto
                        };
                        await color.create(colorNuevo);

                    } else {

                        coloresEliminar.splice(indice, 1);

                    }
                }
            }

            for (let i = 0; i < coloresEliminar.length; i++) {
                let stocks = await stock.findAll({
                    where: {
                        colorId: coloresEliminar[i].idColor
                    }
                });

                if (!utileria.arrayVacio(stocks)) {
                    throw new Error(`El color ${coloresEliminar[i].color}, cuenta con registros de stock.`);
                }

                await color.destroy({
                    where: {
                        idColor: coloresEliminar[i].idColor
                    }
                });
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
        let transaction;

        try {

            // Iniciando la transacción
            transaction = await conexion.transaction();

            const {
                idProducto
            } = parametros;

            let dependencias = await stock.findAll({
                where: {
                    productoId: idProducto
                }
            });

            if (!utileria.arrayVacio(dependencias)) {
                throw new Error(`La producto cuenta con dependencias, en stocks de producto.`);
            }


            // Eliminar todas las medidas relacionadas con un producto específico
            await imagen.destroy({
                where: {
                    productoId: parametros.idProducto
                }
            });


            // Eliminar todas las medidas relacionadas con un producto específico
            await medida.destroy({
                where: {
                    productoId: parametros.idProducto
                }
            });


            // Eliminar todos los colores relacionados con un producto específico
            await color.destroy({
                where: {
                    productoId: parametros.idProducto
                }
            });



            let response = await producto.destroy({
                where: {
                    idProducto: idProducto
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
                idProducto
            } = parametros;

            let respuesta = await producto.findOne({
                where: {
                    idProducto: idProducto
                },
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
                    },
                    {
                        model: color,
                        as: 'colores',
                        required: false
                    },
                    {
                        model: medida,
                        as: 'medidas',
                        required: false,
                        include: [{
                            model: talla,
                            as: 'talla',
                            required: false
                        },{
                            model: tipomedida,
                            as: 'tipoMedida',
                            required: false
                        }]
                    }
                ]
            });

            let colores = await color.findAll({
                where: {
                    productoId: idProducto
                }
            });

            respuesta.colores = colores;


            let medidas = await medida.findAll({
                where: {
                    productoId: idProducto
                }
            });

            respuesta.medidas = medidas;


            return respuesta;
        } catch (error) {
            throw error;
        }
    },
};