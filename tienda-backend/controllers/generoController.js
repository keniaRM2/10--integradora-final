const generoDAO = require('../dao/generoDAO.js');
const utileria = require('../utils/utileria.js')

exports.listar = async (req, res) => {
  try {

    const generos =  await generoDAO.listar();
    return utileria.responseOk(generos, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};
