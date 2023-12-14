const {
  usuario,
  status,
  persona,
  direccion,
  contacto,
  genero,
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");
const conexion = require("./config/conexionBD");

module.exports = {
  listarUsuario: async () => {
    try {
      return await usuario.findAll({
        order: [["idUsuario", "DESC"]],
      });
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  registrarUsuario: async (parametros) => {
    try {
      const statusActivo = await status.findOne({
        where: {
          nombre: constantes.ESTATUS_ACTIVO,
        },
      });

      const nombreUsuario = parametros.usuario;

      const usuarioRepetido = await usuario.findOne({
        where: {
          usuario: nombreUsuario,
        },
      });

      if (usuarioRepetido) {
        throw new Error(`Nombre de usuario ${nombreUsuario}, no disponible.`);
      }

      const nuevoUsuario = {
        usuario: nombreUsuario,
        contrasena: utileria.encriptarContrasena(parametros.contrasena),
        rolId: parametros.rolId,
        statusId: statusActivo.idStatus,
        fechaRegistro: new Date(),
      };

      if (parametros.persona) {
        let nuevaPersona = {
          nombre: parametros.persona.nombre,
          primerApellido: parametros.persona.primerApellido,
          segundoApellido: parametros.persona.segundoApellido || "",
          fechaNacimiento: parametros.persona.fechaNacimiento,
          generoId: parametros.persona.generoId,
        };

        let { idPersona } = await persona.create(nuevaPersona);
        nuevoUsuario["personaId"] = idPersona;

        if (parametros.persona.direccion) {
          let nuevaDireccion = {
            numeroInterior: parametros.persona.direccion.numeroInterior,
            numeroExterior: parametros.persona.direccion.numeroExterior,
            calle: parametros.persona.direccion.calle,
            colonia: parametros.persona.direccion.colonia,
            municipio: parametros.persona.direccion.municipio,
            entidadFederativa: parametros.persona.direccion.entidadFederativa,
            personaId: idPersona,
          };
          await direccion.create(nuevaDireccion);
        }
        if (parametros.persona.contacto) {
          let nuevoContacto = {
            correoElectronico:
              parametros.persona.contacto.correoElectronico || "",
            telefonoPrincipal:
              parametros.persona.contacto.telefonoPrincipal || "",
            telefonoSecundario:
              parametros.persona.contacto.telefonoSecundario || "",
            personaId: idPersona,
          };
          await contacto.create(nuevoContacto);
        }
      }

      const { idUsuario } = await usuario.create(nuevoUsuario);

      return {
        idUsuario: idUsuario,
      };
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  login: async (parametros) => {
    try {
      const nombreUsuario = parametros.usuario;

      const usuarioLogin = await usuario.findOne({
        where: {
          usuario: nombreUsuario,
        },
        include: {
          model: persona,
          as: "persona",
          required: false,
        },
      });

      if (!usuarioLogin) {
        throw new Error(`Usuario ${nombreUsuario} no registrado.`);
      }

      const statusActivo = await status.findOne({
        where: {
          nombre: constantes.ESTATUS_ACTIVO,
        },
      });

      if (usuarioLogin.statusId != statusActivo.idStatus) {
        throw new Error(`Usuario inactivo.`);
      }

      const contrasenaValida = utileria.validarContrasena(
        parametros.contrasena,
        usuarioLogin.contrasena
      );
      if (!contrasenaValida) {
        throw new Error(`Usuario o contraseña invalidas`);
      }

      const token = await utileria.generarJWT(usuarioLogin);

      const personaData = usuarioLogin?.persona?.toJSON();
      let nombreCompleto;
      if (personaData) {
        nombreCompleto = `${personaData.nombre} ${personaData.primerApellido} ${
          personaData.segundoApellido || ""
        }`;
      }
      return {
        idUsuario: usuarioLogin.idUsuario,
        idPersona: usuarioLogin.personaId,
        token: token,
        nombreCompleto: nombreCompleto || usuarioLogin.usuario,
        ...personaData,
      };
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  actualizar: async (parametros) => {
    let transaction;

    try {
      const { idUsuario } = parametros;

      // Iniciando la transacción
      transaction = await conexion.transaction();

      let usuarioEntity = await usuario.findOne({
        where: {
          idUsuario: idUsuario,
        },
        include: [
          {
            model: persona,
            as: "persona",
            required: false,
            include: [
              {
                model: direccion,
                as: "direccion",
                required: false,
              },
              {
                model: contacto,
                as: "contacto",
                required: false,
              },
            ],
          },
        ],
      });

      let { idGenero } = await genero.findOne({
        where: {
          nombre: constantes.GENERO_FEMENINO,
        },
      });

      let personaData = {
        nombre: parametros.nombre || "",
        primerApellido: parametros.primerApellido || "",
        segundoApellido: parametros.segundoApellido || "",
        fechaNacimiento: parametros.fechaNacimiento || new Date(),
        generoId: parametros.generoId || idGenero,
      };

      if (usuarioEntity.persona) {
        await persona.update(personaData, {
          where: { idPersona: usuarioEntity.personaId },
        });
        personaData.idPersona = usuarioEntity.personaId;
      } else {
        personaData = await persona.create(personaData, { transaction });
      }

      let direccionData = {
        numeroExterior: parametros.direccion.numeroExterior || "0",
        numeroInterior: parametros.direccion.numeroInterior || "N/D",
        calle: parametros.direccion.calle,
        colonia: parametros.direccion.colonia,
        municipio: parametros.direccion.municipio,
        entidadFederativa: parametros.direccion.entidadFederativa,
        personaId: personaData.idPersona,
      };

      if (usuarioEntity?.persona?.direccion) {
        direccionData = await direccion.update(direccionData, {
          where: { idDireccion: usuarioEntity?.persona?.direccion.idDireccion },
          transaction,
        });
      } else {
        direccionData = await direccion.create(direccionData, { transaction });
      }

      let contactoData = {
        correoElectronico: parametros.contacto.correoElectronico,
        telefonoPrincipal: parametros.contacto.telefonoPrincipal,
        telefonoSecundario: parametros.contacto.telefonoSecundario,
        personaId: personaData.idPersona,
      };

      if (usuarioEntity?.persona?.contacto) {
        contactoData = await contacto.update(contactoData, {
          where: { idContacto: usuarioEntity?.persona?.contacto.idContacto },
          transaction,
        });
      } else {
        contactoData = await contacto.create(contactoData, { transaction });
      }

      await transaction.commit();

      return {
        idUsuario: usuarioEntity.idUsuario,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  actualizarPersona: async (parametros) => {
    let transaction;

    try {
      const { idUsuario } = parametros;

      // Iniciando la transacción
      transaction = await conexion.transaction();

      let usuarioEntity = await usuario.findOne({
        where: {
          idUsuario: idUsuario,
        },
        include: [
          {
            model: persona,
            as: "persona",
            required: false,
            include: [
              {
                model: direccion,
                as: "direccion",
                required: false,
              },
              {
                model: contacto,
                as: "contacto",
                required: false,
              },
            ],
          },
        ],
      });

      let { idGenero } = await genero.findOne({
        where: {
          nombre: constantes.GENERO_FEMENINO,
        },
      });

      let personaData = {
        nombre: parametros.nombre || "",
        primerApellido: parametros.primerApellido || "",
        segundoApellido: parametros.segundoApellido || "",
        fechaNacimiento: parametros.fechaNacimiento || new Date(),
        generoId: parametros.generoId || idGenero,
      };

      if (usuarioEntity.persona) {
        personaData = await persona.update(personaData, {
          where: { idPersona: usuarioEntity.personaId },
          transaction,
        });
      } else {
        personaData = await persona.create(personaData, { transaction });
      }

      await transaction.commit();

      return {
        idUsuario: usuarioEntity.idUsuario,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  actualizarDireccion: async (parametros) => {
    let transaction;

    try {
      const { idUsuario } = parametros;

      // Iniciando la transacción
      transaction = await conexion.transaction();

      let usuarioEntity = await usuario.findOne({
        where: {
          idUsuario: idUsuario,
        },
        include: [
          {
            model: persona,
            as: "persona",
            required: false,
            include: [
              {
                model: direccion,
                as: "direccion",
                required: false,
              },
              {
                model: contacto,
                as: "contacto",
                required: false,
              },
            ],
          },
        ],
      });

      let personaData = usuarioEntity.persona;
      if (!personaData) {
        let { idGenero } = await genero.findOne({
          where: {
            nombre: constantes.GENERO_FEMENINO,
          },
        });

        personaData = {
          nombre: parametros.nombre || "",
          primerApellido: parametros.primerApellido || "",
          segundoApellido: parametros.segundoApellido || "",
          fechaNacimiento: parametros.fechaNacimiento || new Date(),
          generoId: parametros.generoId || idGenero,
        };
        personaData = await persona.create(personaData, { transaction });
      }

      let direccionData = {
        numeroExterior: parametros.numeroExterior || "0",
        numeroInterior: parametros.numeroInterior || "N/D",
        calle: parametros.calle,
        colonia: parametros.colonia,
        municipio: parametros.municipio,
        entidadFederativa: parametros.entidadFederativa,
        personaId: personaData.idPersona,
      };

      if (usuarioEntity?.persona?.direccion) {
        direccionData = await direccion.update(direccionData, {
          where: { idDireccion: usuarioEntity?.persona?.direccion.idDireccion },
          transaction,
        });
      } else {
        direccionData = await direccion.create(direccionData, { transaction });
      }

      await transaction.commit();

      return {
        idUsuario: usuarioEntity.idUsuario,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  actualizarContacto: async (parametros) => {
    let transaction;

    try {
      const { idUsuario } = parametros;

      // Iniciando la transacción
      transaction = await conexion.transaction();

      let usuarioEntity = await usuario.findOne({
        where: {
          idUsuario: idUsuario,
        },
        include: [
          {
            model: persona,
            as: "persona",
            required: false,
            include: [
              {
                model: direccion,
                as: "direccion",
                required: false,
              },
              {
                model: contacto,
                as: "contacto",
                required: false,
              },
            ],
          },
        ],
      });

      let { idGenero } = await genero.findOne({
        where: {
          nombre: constantes.GENERO_FEMENINO,
        },
      });

      let personaData = usuarioEntity.persona;
      if (!personaData) {
        personaData = {
          nombre: parametros.nombre || "",
          primerApellido: parametros.primerApellido || "",
          segundoApellido: parametros.segundoApellido || "",
          fechaNacimiento: parametros.fechaNacimiento || new Date(),
          generoId: parametros.generoId || idGenero,
        };
        personaData = await persona.create(personaData, { transaction });
      }

      let contactoData = {
        correoElectronico: parametros.correoElectronico,
        telefonoPrincipal: parametros.telefonoPrincipal,
        telefonoSecundario: parametros.telefonoSecundario || "",
        personaId: personaData.idPersona,
      };

      if (usuarioEntity?.persona?.contacto) {
        contactoData = await contacto.update(contactoData, {
          where: { idContacto: usuarioEntity?.persona?.contacto.idContacto },
          transaction,
        });
      } else {
        contactoData = await contacto.create(contactoData, { transaction });
      }

      await transaction.commit();

      return {
        idUsuario: usuarioEntity.idUsuario,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
  obtener: async (parametros) => {
    try {
      let { idUsuario } = parametros;

      if (!idUsuario) {
        idUsuario = parametros.usuarioSesion.idUsuario;
      }

      let usuarioDTO = await usuario.findOne({
        where: {
          idUsuario: idUsuario,
        },
        include: [
          {
            model: persona,
            as: "persona",
            required: false,
            include: [
              {
                model: direccion,
                as: "direccion",
                required: false,
              },
              {
                model: contacto,
                as: "contacto",
                required: false,
              },
            ],
          },
        ],
      });

      usuarioDTO = usuarioDTO.toJSON();
      usuarioDTO.password = undefined;

      return {
        ...usuarioDTO,
        ...usuarioDTO.persona,
        ...usuarioDTO.persona?.direccion,
        ...usuarioDTO.persona?.contacto,
      };
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
};
