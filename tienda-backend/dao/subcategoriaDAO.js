const {
    producto,
    categoria,
    subcategoria
} = require("./models/init-models");
const utileria = require("../utils/utileria");

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
        try {


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

            return {
                idSubcategoria: idSubcategoria
            };
        } catch (error) {
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {


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
            return await subcategoria.update(actualizado, {where: { idSubcategoria: idSubcategoria}});
        } catch (error) {
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

            return await subcategoria.findOne({
                where: {
                    idSubcategoria: idSubcategoria
                },
                include: [{
                    model: categoria,
                    as: 'categoria'
                }]
            });

        } catch (error) {
            throw error;
        }
    },
};