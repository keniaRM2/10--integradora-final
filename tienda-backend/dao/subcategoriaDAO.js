const {
    producto,
    categoria,
    subcategoria,
    imagen
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const conexion = require('./config/conexionBD');

module.exports = {
    listar: async () => {
        try {
            return await subcategoria.findAll({
                order: [['idSubcategoria', 'DESC']],
                include: [{
                    model: categoria,
                    as: 'categoria'
                }]
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

            const elementoRepetido = await subcategoria.findOne({
                where: {
                    nombre: parametros.nombre,
                    categoriaId: parametros.categoriaId
                }
            });

            if (elementoRepetido) {
                throw new Error(`Nombre ${parametros.nombre}, no disponible.`);
            }

            const nuevo = {
                nombre: parametros.nombre,
                categoriaId: parametros.categoriaId
            };

            const {
                idSubcategoria
            } = await subcategoria.create(nuevo);


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
                        subcategoriaId: idSubcategoria
                    }
                });

                await Promise.all(imagenesNuevas.map((nuevaImagen) => imagen.create(nuevaImagen)));
                console.log('Imagenes creadas exitosamente.');
            }



             await transaction.commit();

            return {
                idSubcategoria: idSubcategoria
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
                idSubcategoria,
                nombre
            } = parametros;

            const elementoRepetido = await subcategoria.findOne({
                where: {
                    nombre: parametros.nombre,
                    categoriaId: parametros.categoriaId
                }
            });

            if (elementoRepetido && elementoRepetido.idSubcategoria !== idSubcategoria) {
                throw new Error(`Nombre ${nombre}, no disponible.`);
            }

            let actualizado = {
                nombre: parametros.nombre,
                categoriaId: parametros.categoriaId
            };
            
            let respuesta = await subcategoria.update(actualizado, {where: { idSubcategoria: idSubcategoria}});

            await imagen.destroy({
                where: {
                    subcategoriaId: idSubcategoria
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
                        subcategoriaId: idSubcategoria
                    }
                });

                await Promise.all(imagenesNuevas.map((nuevaImagen) => imagen.create(nuevaImagen)));
                console.log('Imagenes creadas exitosamente.');
            }


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
    eliminar: async (parametros) => {
        try {

            const {
                idSubcategoria
            } = parametros;

            const productos = await producto.findAll({
                where: {
                    subcategoriaId: idSubcategoria
                }
            });

            if (!utileria.arrayVacio(productos)) {
                throw new Error(`La subcategoría cuenta con dependencias.`);
            }


            return await subcategoria.destroy({
                where: {
                    idSubcategoria: idSubcategoria
                }
            });

        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idSubcategoria
            } = parametros;


            let respuesta = await subcategoria.findOne({
                where: {
                    idSubcategoria: idSubcategoria
                },
                include: [{
                    model: categoria,
                    as: 'categoria'
                }]
            });

            respuesta = respuesta.toJSON();

            let imagenes = await imagen.findAll({
                where: {
                    subcategoriaId: idSubcategoria
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