const {
    rol,
    status,
    genero,
    categoria,
    subcategoria
} = require("../dao/models/init-models");
const constantes = require("./constantes");


async function insertarCategorias() {
    let obj = undefined;
    const statusActivo = await status.findOne({
        where: {
            nombre: constantes.ESTATUS_ACTIVO
        }
    });


    for (const item of constantes.CATEGORIAS) {
        obj = await categoria.findOne({
            where: {
                nombre: item.nombre
            }
        });

        if (!obj) {
            obj = await categoria.create({
                nombre: item.nombre,
                descripcion: item.nombre,
                statusId: statusActivo.idStatus
            });
        }

        for (const subItem of item.subcategorias){
            let subobj = await subcategoria.findOne({
                where: {
                    nombre: subItem,
                    categoriaId: obj.idCategoria
                }
            });
    
            if (!subobj) {
                subobj = await subcategoria.create({
                    nombre: subItem,
                    categoriaId: obj.idCategoria
                });
            }
        }


    }
}
async function insertarGeneros() {
    let obj = undefined;

    for (const nombre of constantes.GENEROS) {
        obj = await genero.findOne({
            where: {
                nombre: nombre
            }
        });

        if (!obj) {
            await genero.create({
                nombre: nombre
            });
        }
    }
}
async function insertarRoles() {
    let obj = undefined;

    for (const nombre of constantes.ROLES) {
        obj = await rol.findOne({
            where: {
                nombre: nombre
            }
        });

        if (!obj) {
            await rol.create({
                nombre: nombre
            });
        }
    }
}

async function insertarStatus() {
    let obj = undefined;

    for (const nombre of constantes.ESTATUS) {
        obj = await status.findOne({
            where: {
                nombre: nombre
            }
        });

        if (!obj) {
            await status.create({
                nombre: nombre
            });
        }
    }
}



async function iniciales() {
    try {

        insertarStatus();

        insertarGeneros();

        insertarRoles()

        insertarCategorias();

        console.log('Datos registrados con éxito');
    } catch (error) {
        console.error('Error al registrar datos:', error);
    }
}

module.exports = iniciales;