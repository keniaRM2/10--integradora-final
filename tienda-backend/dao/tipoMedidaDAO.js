const {
    tipomedida, stock, medida,
} = require("./models/init-models");
const utileria = require("../utils/utileria");

module.exports = {
    listar: async () => {
        try {
            return await tipomedida.findAll({
                order: [['idTipoMedida', 'DESC']]
            });
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    registrar: async (parametros) => {
        try {

            const nombreTipomedida = parametros.nombre;

            const tipomedidaRepetida = await tipomedida.findOne({
                where: {
                    nombre: nombreTipomedida
                }
            });

            if (tipomedidaRepetida) {
                throw new Error(`Nombre del tipo de medida ${nombreTipomedida}, no disponible.`);
            }

            const nuevo = { nombre: nombreTipomedida};

            const {
                idTipomedida
            } = await tipomedida.create(nuevo);

            return {
                idTipomedida: idTipomedida
            };
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    actualizar: async (parametros) => {
        try {


            const {
                idTipoMedida,
                nombre
            } = parametros;

            const tipomedidaRepetida = await tipomedida.findOne({
                where: {
                    nombre: nombre
                }
            });

            if (tipomedidaRepetida && tipomedidaRepetida.idTipoMedida !== idTipoMedida) {
                throw new Error(`Nombre del tipo de medida  ${nombre}, no disponible.`);
            }

            let actualizado = {
                nombre: nombre
            };
            return await tipomedida.update(actualizado, {where: { idTipoMedida: idTipoMedida}});
        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    eliminar: async (parametros) => {
        try {

            const {
                idTipoMedida
            } = parametros;

            const medidas = await medida.findAll({
                where: {
                    tipoMedidaId: idTipoMedida
                }
            });

            if (!utileria.arrayVacio(medidas)) {
                throw new Error(`El tipo de medida cuenta con dependencias de medidas de productos.`);
            }


            return await tipomedida.destroy({
                where: {
                    idTipoMedida: idTipoMedida
                }
            });

        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
    obtener: async (parametros) => {
        try {

            const {
                idTipoMedida
            } = parametros;

            return await tipomedida.findOne({
                where: {
                    idTipoMedida: idTipoMedida
                }
            });

        } catch (error) {
            console.error('Ocurrió un error:', error.message);
throw error;;
        }
    },
};