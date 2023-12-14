const {genero} = require("./models/init-models"); 

module.exports = {
  listar: async () => {
    try {
      return await genero.findAll({
        order: [['idGenero', 'ASC']]
      });
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
throw error;;
    }
  },
};