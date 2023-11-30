const {
    status,
    categoria,
    subcategoria
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

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
        try {

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

            return {
                idCategoria: idCategoria
            };
        } catch (error) {
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {


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
            return await categoria.update(actualizado, {where: { idCategoria: idCategoria}});
        } catch (error) {
            throw error;
        }
    },
    actualizarEstatus: async (parametros) => {
        try {

            const {
                idCategoria
            } = parametros;

            let actualizado = await categoria.findOne({
                where: {
                    idCategoria: idCategoria
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

            return await categoria.findOne({
                where: {
                    idCategoria: idCategoria
                }
            });

        } catch (error) {
            throw error;
        }
    },
};