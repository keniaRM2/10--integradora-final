const {rol} = require("./models/init-models"); 

module.exports = {
  listarRoles: async () => {
    try {
      return await rol.findAll();
    } catch (error) {
      throw error;
    }
  },
};