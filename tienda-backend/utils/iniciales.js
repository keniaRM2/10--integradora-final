const {
    rol,
    status,
    genero,
    categoria,
    subcategoria,
    talla,
    tipomedida,
    usuario
} = require("../dao/models/init-models");
const usuarioDAO = require("../dao/usuarioDAO");
const constantes = require("./constantes");


async function insertarTipoMedidas() {
    let obj;

    for (const nombre of constantes.TIPOS_MEDIDAS) {
        obj = await tipomedida.findOne({
            where: {
                nombre: nombre
            }
        });

        if (!obj) {
            await tipomedida.create({
                nombre: nombre
            });
        }
    }
}
async function insertarTallas() {
    let obj;

    for (const nombre of constantes.TALLAS) {
        obj = await talla.findOne({
            where: {
                nombre: nombre
            }
        });

        if (!obj) {
            await talla.create({
                nombre: nombre
            });
        }
    }
}

async function insertarCategorias() {
    let obj;
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

        for (const subItem of item.subcategorias) {
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
    let obj;

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
    let obj;

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
    let obj;

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


async function insertarUsuarios() {

    const rolAdministrador = await rol.findOne({
        where: {
            nombre: constantes.ROL_ADMINISTRADOR
        }
    });

    const rolCliente = await rol.findOne({
        where: {
            nombre: constantes.ROL_CLIENTE
        }
    });
    const generoMujer = await genero.findOne({
        where: {
            nombre: constantes.GENERO_FEMENINO
        }
    });

    const usuarioAdmin = {
        usuario: 'admin@gmail.com',
        contrasena: 'admin@gmail.com',
        rolId: rolAdministrador.idRol,
        persona: {
            nombre: 'Kenia',
            primerApellido: 'Reyes',
            segundoApellido: 'Molina',
            fechaNacimiento: '1996-03-27',
            generoId: generoMujer.idGenero,
            direccion: {
                numeroInterior: '123',
                numeroExterior: '456',
                calle: 'Av. Principal',
                colonia: 'Centro',
                municipio: 'Cuernavaca',
                entidadFederativa: 'Morelos',
            },
            contacto: {
                correoElectronico: 'kenia@gmail.com',
                telefonoPrincipal: '7771234567',
                telefonoSecundario: '7771478596',
            },
        },
    };
    const usuarioCliente = {
        usuario: 'cliente@gmail.com',
        contrasena: 'cliente@gmail.com',
        rolId: rolCliente.idRol,
        persona: {
            nombre: 'Andrea',
            primerApellido: 'Reyes',
            segundoApellido: 'Molina',
            fechaNacimiento: '1996-03-27',
            generoId: generoMujer.idGenero,
            direccion: {
                numeroInterior: '123',
                numeroExterior: '456',
                calle: 'Av. Principal',
                colonia: 'Centro',
                municipio: 'Cuernavaca',
                entidadFederativa: 'Morelos',
            },
            contacto: {
                correoElectronico: 'cliente@gmail.com',
                telefonoPrincipal: '7771234567',
                telefonoSecundario: '7771478596',
            },
        },
    };

    const usuarios = [usuarioAdmin, usuarioCliente];


    for (const item of usuarios) {
        let usuarioExistente = await usuario.findOne({
            where: {
                usuario: item.usuario
            }
        });
        if (!usuarioExistente) {
            usuarioDAO.registrarUsuario(item);
        }
    }
}

async function iniciales() {
    try {

        await insertarStatus();

        await insertarGeneros();

        await insertarRoles()


        await insertarUsuarios();

        await insertarCategorias();

        await insertarTallas();

        await insertarTipoMedidas();


        console.log('Datos registrados con éxito');
    } catch (error) {
        console.error('Error al registrar datos:', error);
    }
}

module.exports = iniciales;