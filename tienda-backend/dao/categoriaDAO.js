const {
    status,
    categoria,
    subcategoria,
    imagen
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const conexion = require('./config/conexionBD');

module.exports = {
    listar: async () => {
        try {
            return await categoria.findAll({
                include: [{
                    model: subcategoria,
                    as: 'subcategoria'
                }],
                order: [['idCategoria', 'DESC']]
            });
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

            const nombreCategoria = parametros.nombre;

            const categoriaRepetida = await categoria.findOne({
                where: {
                    nombre: nombreCategoria
                }
            });

            if (categoriaRepetida) {
                throw new Error(`Nombre de la categoría ${nombreCategoria}, no disponible.`);
            }

            const nuevo = {
                nombre: nombreCategoria,
                descripcion: parametros.descripcion,
                statusId: statusActivo.idStatus
            };

            const {
                idCategoria
            } = await categoria.create(nuevo);


            if (!utileria.arrayVacio(parametros.imagenes)) {
                const imagenesNuevas = parametros.imagenes.map((imagen) => {

                    const base64String = imagen;

                    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64/);
                    let formato = 'jpeg';
                    if (matches && matches.length > 1) {
                        formato = matches[1];
                    }

                    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
                    const bufferData = Buffer.from(base64Data, 'base64');

                    return {
                        formato: formato,
                        imagen: bufferData,
                        categoriaId: idCategoria
                    }
                });

                await Promise.all(imagenesNuevas.map((nuevaImagen) => imagen.create(nuevaImagen)));
                console.log('Imagenes creadas exitosamente.');
            }

             // Commit si todo se realizó correctamente
             await transaction.commit();

            return {
                idCategoria: idCategoria
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

            const {
                idCategoria,
                descripcion,
                nombre
            } = parametros;

            const categoriaRepetida = await categoria.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (categoriaRepetida && categoriaRepetida.idCategoria !== idCategoria) {
                throw new Error(`Nombre de la categoría ${nombre}, no disponible.`);
            }

            let actualizado = {
                nombre: nombre,
                descripcion: descripcion
            };

            let respuesta = await categoria.update(actualizado, {where: { idCategoria: idCategoria}});


            await imagen.destroy({
                where: {
                    categoriaId: idCategoria
                }
            });

            if (!utileria.arrayVacio(parametros.imagenes)) {
                const imagenesNuevas = parametros.imagenes.map((imagen) => {

                    const base64String = imagen;

                    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64/);
                    let formato = 'jpeg';
                    if (matches && matches.length > 1) {
                        formato = matches[1];
                    }

                    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
                    const bufferData = Buffer.from(base64Data, 'base64');

                    return {
                        formato: formato,
                        imagen: bufferData,
                        categoriaId: idCategoria
                    }
                });

                await Promise.all(imagenesNuevas.map((nuevaImagen) => imagen.create(nuevaImagen)));
                console.log('Imagenes creadas exitosamente.');
            }



            // Commit si todo se realizó correctamente
            await transaction.commit();

            return respuesta;
        } catch (error) {
             // Rollback en caso de error
             if (transaction) {
                console.log("rollback");
                await transaction.rollback();
            }
            throw error;
        }
    },
    actualizarEstatus: async (parametros) => {
        try {
            const { idCategoria } = parametros;
    
            let actualizado = await categoria.findOne({
                where: {
                    idCategoria: idCategoria
                }
            });
    
            if (!actualizado) {
                throw new Error(`La categoría con ID ${idCategoria} no existe.`);
            }
    
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
            return await categoria.update(actualizado, {where: { idCategoria: idCategoria}});

        } catch (error) {
            throw error;
        }
    },
    eliminar: async (parametros) => {
        try {

            const {
                idCategoria
            } = parametros;

            const subcategorias = await subcategoria.findAll({
                where: {
                    categoriaId: idCategoria
                }
            });

            if (!utileria.arrayVacio(subcategorias)) {
                throw new Error(`La categoría cuenta con dependencias.`);
            }


            return await categoria.destroy({
                where: {
                    idCategoria: idCategoria
                }
            });

        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idCategoria
            } = parametros;

            let respuesta =  await categoria.findOne({
                where: {
                    idCategoria: idCategoria
                }
            });
            respuesta = respuesta.toJSON();


            let imagenes = await imagen.findAll({
                where: {
                    categoriaId: idCategoria
                }
            });

            let imagenesBase64 = imagenes.map(imagen => {
                return `data:image/${imagen.formato};base64,${imagen.imagen.toString('base64')}`;
            });

            respuesta.imagenes = imagenesBase64 || [];
            
            return respuesta;

        } catch (error) {
            throw error;
        }
    },
};