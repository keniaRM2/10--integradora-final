const {rol} = require("./models/init-models"); 

module.exports = {
  listarRoles: async () => {
    try {
      return await rol.findAll({
        order: [['idRol', 'DESC']]
      });
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
};