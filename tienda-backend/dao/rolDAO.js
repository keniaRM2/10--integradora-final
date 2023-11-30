const {rol} = require("./models/init-models"); 

module.exports = {
  listarRoles: async () => {
    try {
      return await rol.findAll({
        order: [['idRol', 'DESC']]
      });
    } catch (error) {
      throw error;
    }
  },
};