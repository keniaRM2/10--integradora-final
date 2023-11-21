const {
    talla, stock,
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

module.exports = {
    listar: async () => {
        try {
            return await talla.findAll({});
        } catch (error) {
            throw error;
        }
    },
    registrar: async (parametros) => {
        try {

            const nombreTalla = parametros.nombre;

            const tallaRepetida = await talla.findOne({
                where: {
                    nombre: nombreTalla
                }
            });

            if (tallaRepetida) {
                throw new Error(`Nombre de la talla ${nombreTalla}, no disponible.`);
            }

            const nuevo = { nombre: nombreTalla};

            const {
                idTalla
            } = await talla.create(nuevo);

            return {
                idTalla: idTalla
            };
        } catch (error) {
            throw error;
        }
    },
    actualizar: async (parametros) => {
        try {


            const {
                idTalla,
                nombre
            } = parametros;

            const tallaRepetida = await talla.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (tallaRepetida && tallaRepetida.idTalla !== idTalla) {
                throw new Error(`Nombre de la talla ${nombre}, no disponible.`);
            }

            let actualizado = {
                nombre: nombre
            };
            return await talla.update(actualizado, {where: { idTalla: idTalla}});
        } catch (error) {
            throw error;
        }
    },
    eliminar: async (parametros) => {
        try {

            const {
                idTalla
            } = parametros;

            const stocks = await stock.findAll({
                where: {
                    tallaId: idTalla
                }
            });

            if (!utileria.arrayVacio(stocks)) {
                throw new Error(`La talla cuenta con dependencias de stocks.`);
            }


            return await talla.destroy({
                where: {
                    idTalla: idTalla
                }
            });

        } catch (error) {
            throw error;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idTalla
            } = parametros;

            return await talla.findOne({
                where: {
                    idTalla: idTalla
                }
            });

        } catch (error) {
            throw error;
        }
    },
};