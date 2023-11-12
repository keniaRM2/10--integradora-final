const {
  usuario,
  status,
  persona
} = require("./models/init-models");
const utileria = require("../utils/utileria");
const constantes = require("../utils/constantes");

module.exports = {
  listarUsuario: async () => {
    try {
      return await usuario.findAll();
    } catch (error) {
      throw error;
    }
  },

  obtenerUsuarioPorId: async (parametros) => {
    try {
      const { idUsuario } = parametros;
      const user = await usuario.findOne({
        where: {
          idUsuario: idUsuario
        },
        include: [{
          model: persona,
          as: 'persona',
          required: false
        }]
      });
  
      if (!user) {
        throw new Error(`El usuario con ID ${idUsuario} no existe`);
      }
      
      return user;
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
        token: token, ... usuarioLogin.persona.dataValues
      }
    } catch (error) {
      throw error;
    }
  },
  actualizar: async (parametros) => {
    try {

      const usuarioObj = await usuario.findOne({
        where:{
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
  actualizarEstatus: async (parametros) => {
    try {
        const { idUsuario } = parametros;

        let actualizado = await usuario.findOne({
            where: {
                idUsuario: idUsuario
            }
        });

        if (!actualizado) {
            throw new Error(`El usuario con ID ${idUsuario} no existe.`);
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

        await actualizado.save();
        return actualizado;
    } catch (error) {
        throw error;
    }
  }
};
