const {
  usuario,
  status,
  persona,
  direccion,
  contacto
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

module.exports = {
  listarUsuario: async () => {
    try {
      return await usuario.findAll({
        order: [
          ['idUsuario', 'DESC']
        ]
      });
    } catch (error) {
      throw error;
    }
  },
  registrarUsuario: async (parametros) => {
    try {

      const statusActivo = await status.findOne({
        where: {
          nombre: constantes.ESTATUS_ACTIVO
        }
      });

      const nombreUsuario = parametros.usuario;

      const usuarioRepetido = await usuario.findOne({
        where: {
          usuario: nombreUsuario
        }
      });

      if (usuarioRepetido) {
        throw new Error(`Nombre de usuario ${nombreUsuario}, no disponible.`);
      }

      const nuevoUsuario = {
        usuario: nombreUsuario,
        contrasena: utileria.encriptarContrasena(parametros.contrasena),
        rolId: parametros.rolId,
        statusId: statusActivo.idStatus,
        fechaRegistro: new Date()
      };

      if (parametros.persona) {
        let nuevaPersona = {
          nombre: parametros.persona.nombre,
          primerApellido: parametros.persona.primerApellido,
          segundoApellido: parametros.persona.segundoApellido || '',
          fechaNacimiento: parametros.persona.fechaNacimiento,
          generoId: parametros.persona.generoId,
        }

        let {
          idPersona
        } = await persona.create(nuevaPersona);
        nuevoUsuario["personaId"] = idPersona;

        if (parametros.persona.direccion) {
          let nuevaDireccion = {
            numeroInterior: parametros.persona.direccion.numeroInterior,
            numeroExterior: parametros.persona.direccion.numeroExterior,
            calle: parametros.persona.direccion.calle,
            colonia: parametros.persona.direccion.colonia,
            municipio: parametros.persona.direccion.municipio,
            entidadFederativa: parametros.persona.direccion.entidadFederativa,
            personaId: idPersona
          };
          await direccion.create(nuevaDireccion);
        }
        if (parametros.persona.contacto) {
          let nuevoContacto = {
            correoElectronico: parametros.persona.contacto.correoElectronico || '',
            telefonoPrincipal: parametros.persona.contacto.telefonoPrincipal || '',
            telefonoSecundario: parametros.persona.contacto.telefonoSecundario || '',
            personaId: idPersona
          };
          await contacto.create(nuevoContacto);
        }
      }



      const {
        idUsuario
      } = await usuario.create(nuevoUsuario);






      return {
        idUsuario: idUsuario
      };
    } catch (error) {
      throw error;
    }
  },
  login: async (parametros) => {
    try {

      const nombreUsuario = parametros.usuario;

      const usuarioLogin = await usuario.findOne({
        where: {
          usuario: nombreUsuario
        },
        include: {
          model: persona,
          as: 'persona',
          required: false
        }
      });

      if (!usuarioLogin) {
        throw new Error(`Usuario ${nombreUsuario} no registrado.`);
      }

      const statusActivo = await status.findOne({
        where: {
          nombre: constantes.ESTATUS_ACTIVO
        }
      });

      if (usuarioLogin.statusId != statusActivo.idStatus) {
        throw new Error(`Usuario inactivo.`);
      }

      const contrasenaValida = utileria.validarContrasena(parametros.contrasena, usuarioLogin.contrasena);
      if (!contrasenaValida) {
        throw new Error(`Usuario o contraseña invalidas`);
      }

      const token = await utileria.generarJWT(usuarioLogin);
      return {
        idUsuario: usuarioLogin.idUsuario,
        idPersona: usuarioLogin.personaId,
        token: token,
        ...usuarioLogin.persona.toJSON()
      }
    } catch (error) {
      throw error;
    }
  },
  actualizar: async (parametros) => {
    try {

      const usuarioObj = await usuario.findOne({
        where: {
          idUsuario: parametros.idUsuario
        }
      });

      if (!usuarioObj) {
        throw new Error(`Usuario no encontrado.`);
      }

      const nuevoUsuario = {
        usuario: nombreUsuario,
        contrasena: utileria.encriptarContrasena(parametros.contrasena),
        rolId: parametros.rolId,
        statusId: statusActivo.idStatus
      };

      const {
        idUsuario
      } = await usuario.create(nuevoUsuario);

      return {
        idUsuario: idUsuario
      };
    } catch (error) {
      throw error;
    }
  },
};